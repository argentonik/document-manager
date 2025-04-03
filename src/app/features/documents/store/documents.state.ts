import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Document } from '../../../shared/models/document';
import { computed, inject } from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { asapScheduler, map, scheduled, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CreateDocumentReq } from '../models/create-document-req.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

const initialState = {
  items: <Document[]>[],
  loading: false,
  updating: false,
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

    const getDocumentsMethod = () => {
      patchState(store, { loading: true });
      return service.getDocuments().pipe(
        tapResponse({
          next: (res) => {
            patchState(store, { items: res.results });
          },
          error: errorHandler,
          finalize: () => patchState(store, { loading: false }),
        }),
      );
    };

    return {
      getDocuments: rxMethod<void>(switchMap(getDocumentsMethod)),

      createDocument: rxMethod<CreateDocumentReq>(
        switchMap((data) => {
          patchState(store, { updating: true });

          return service.createDocument(data).pipe(
            tapResponse({
              next: () => {
                patchState(store, { updating: false });
                snackBar.open(
                  `Document ${data.name} has been created`,
                  'Close',
                );
              },
              error: errorHandler,
            }),
            switchMap(() => getDocumentsMethod()),
          );
        }),
      ),

      updateDocument: rxMethod<{ id: string; data: Partial<Document> }>(
        switchMap(({ id, data }) => {
          patchState(store, { updating: true });

          return service.updateDocument(id, data).pipe(
            tapResponse({
              next: () => {
                patchState(store, { updating: false });
                snackBar.open(
                  `Document ${data.name} has been updated`,
                  'Close',
                );
              },
              error: errorHandler,
            }),
            switchMap(() => getDocumentsMethod()),
          );
        }),
      ),

      deleteDocument: rxMethod<string>(
        switchMap((id) => {
          const fileName = store.items().find((item) => item.id === id)?.name;
          return dialog
            .open(ConfirmationModalComponent, {
              data: fileName,
            })
            .afterClosed()
            .pipe(
              map((confirmation) => (confirmation ? id : null)),
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
            );
        }),
      ),
    };
  }),

  withComputed(({ items }) => ({
    count: computed(() => items.length),
  })),

  withHooks({
    onInit({ getDocuments }) {
      getDocuments();
    },
  }),
);
