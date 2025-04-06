import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Document, DocumentStatus } from './document';
import { inject } from '@angular/core';
import { DocumentsService } from '../views/documents/documents.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { asapScheduler, map, pipe, scheduled, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CreateDocumentReq } from '../models/create-document-req.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentFilters } from '../models/document-filters.interface';
import { SnackBarService } from '../../../core/services/snack-bar.service';

const initialState = {
  items: <Document[]>[],
  loading: false,
  updating: false,
  count: 0,

  filters: {
    page: 1,
    size: 5,
    sort: 'updatedAt,desc',
    status: <DocumentStatus | null>null,
    creatorId: <string | null>null,
    creatorEmail: <string | null>null,
  },
};

export const DocumentsStore = signalStore(
  withState(initialState),

  withMethods((store) => {
    const service = inject(DocumentsService);
    const dialog = inject(MatDialog);
    const snackBar = inject(SnackBarService);

    const errorHandler = (err: HttpErrorResponse) => {
      console.error(err);
      patchState(store, { updating: false, loading: false });
      snackBar.error(err.error?.message?.[0] ?? 'Something went wrong');
    };

    const getDocumentsMethod = () => {
      patchState(store, {
        loading: true,
      });

      return service.getDocuments(store.filters()).pipe(
        tapResponse({
          next: (res) => {
            patchState(store, { items: res.results, count: res.count });
          },
          error: errorHandler,
          finalize: () => patchState(store, { loading: false }),
        }),
      );
    };

    const fileRemoveConfirmation = (id: string) => {
      const fileName = store.items().find((item) => item.id === id)?.name;
      return dialog
        .open(ConfirmationModalComponent, {
          data: fileName,
        })
        .afterClosed();
    };

    return {
      getDocuments: rxMethod<void>(switchMap(getDocumentsMethod)),

      filterDocuments: rxMethod<Partial<DocumentFilters>>(
        pipe(
          tap((filters) =>
            patchState(store, { filters: { ...store.filters(), ...filters } }),
          ),
          switchMap((filters) => {
            return getDocumentsMethod();
          }),
        ),
      ),

      createDocument: rxMethod<CreateDocumentReq>(
        pipe(
          switchMap((data) => {
            patchState(store, { updating: true });
            return service.createDocument(data);
          }),
          tapResponse({
            next: () => {
              patchState(store, { updating: false });
              snackBar.success('Document has been created');
            },
            error: errorHandler,
          }),
          switchMap(() => getDocumentsMethod()),
        ),
      ),

      updateDocument: rxMethod<{ id: string; data: Partial<Document> }>(
        pipe(
          switchMap(({ id, data }) => {
            patchState(store, { updating: true });
            return service.updateDocument(id, data);
          }),
          tapResponse({
            next: () => {
              patchState(store, { updating: false });
              snackBar.success(`Document has been updated`);
            },
            error: errorHandler,
          }),
          switchMap(() => getDocumentsMethod()),
        ),
      ),

      sendDocumentOnReview: rxMethod<string>(
        pipe(
          switchMap((id) => {
            patchState(store, { updating: true });
            return service.sendToReview(id);
          }),
          tapResponse({
            next: () => {
              patchState(store, { updating: false });
              snackBar.success(`Document has been sent to review`);
            },
            error: errorHandler,
          }),
          switchMap(() => getDocumentsMethod()),
        ),
      ),

      revokeDocument: rxMethod<string>(
        pipe(
          switchMap((id) => {
            patchState(store, { updating: true });
            return service.revokeReview(id);
          }),
          tapResponse({
            next: () => {
              patchState(store, { updating: false });
              snackBar.success(`Document has been revoked`);
            },
            error: errorHandler,
          }),
          switchMap(() => getDocumentsMethod()),
        ),
      ),

      changeDocumentStatus: rxMethod<{ id: string; status: DocumentStatus }>(
        pipe(
          switchMap(({ id, status }) => {
            patchState(store, { updating: true });
            return service.changeStatus(id, status);
          }),
          tapResponse({
            next: () => {
              patchState(store, { updating: false });
              snackBar.success(`Document status has been changed`);
            },
            error: errorHandler,
          }),
          switchMap(() => getDocumentsMethod()),
        ),
      ),

      deleteDocument: rxMethod<string>(
        pipe(
          switchMap((id) => {
            return fileRemoveConfirmation(id).pipe(
              map((confirmation) => (confirmation ? id : null)),
            );
          }),
          switchMap((id) => {
            if (!id) {
              return scheduled([undefined], asapScheduler);
            }
            patchState(store, { updating: true });
            return service.removeDocument(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { updating: false });
                  snackBar.success(`Document has been deleted`);
                },
                error: errorHandler,
              }),
              switchMap(() => getDocumentsMethod()),
            );
          }),
        ),
      ),
    };
  }),

  withHooks({
    onInit({ getDocuments }) {
      getDocuments();
    },
  }),
);
