import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Document, DocumentStatus } from './document';
import { computed, inject } from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { asapScheduler, map, pipe, scheduled, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CreateDocumentReq } from '../models/create-document-req.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentFilters } from '../models/document-filters.interface';

const initialState = {
  items: <Document[]>[],
  loading: false,
  updating: false,
  count: 0,

  filters: {
    page: 1,
    size: 10,
    sort: 'updatedAt,desc',
    status: <DocumentStatus | null>null,
    creatorId: <string | null>null,
    creatorEmail: <string | null>null,
  },
};

export const DocumentsStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((store) => {
    const service = inject(DocumentsService);
    const dialog = inject(MatDialog);
    const snackBar = inject(MatSnackBar);

    const errorHandler = (error: HttpErrorResponse) => {
      console.error(error);
      snackBar.open('Something went wrong', 'Close');
    };

    const getDocumentsMethod = (filters: Partial<DocumentFilters> = {}) => {
      patchState(store, {
        loading: true,
        filters: { ...store.filters(), ...filters },
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
      getDocuments: rxMethod<Partial<DocumentFilters> | undefined>(
        switchMap(getDocumentsMethod),
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
              snackBar.open('Document has been created', 'Close');
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
              snackBar.open(`Document has been updated`, 'Close');
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
              snackBar.open(`Document has been sent to review`, 'Close');
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
              snackBar.open(`Document has been revoked`, 'Close');
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
            patchState(store, { loading: true });
            return service.removeDocument(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { updating: false });
                  snackBar.open(`Document has been deleted`, 'Close');
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

  withComputed(({ items }) => ({
    count: computed(() => items.length),
  })),

  withHooks({
    onInit({ getDocuments }) {
      getDocuments(undefined);
    },
  }),
);
