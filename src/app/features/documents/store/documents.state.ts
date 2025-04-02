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
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CreateDocumentReq } from '../models/create-document-req.interface';

const initialState = {
  items: <Document[]>[],
  loading: false,
};

export const DocumentsStore = signalStore(
  withState(initialState),

  withMethods((store) => {
    const service = inject(DocumentsService);

    return {
      getDocuments: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true });

          return service.getDocuments().pipe(
            tapResponse({
              next: (res) => {
                patchState(store, { items: res.results });
              },
              error: console.error,
              finalize: () => patchState(store, { loading: false }),
            }),
          );
        }),
      ),

      createDocument: rxMethod<CreateDocumentReq>(
        switchMap((data) => {
          patchState(store, { loading: true });

          return service.createDocument(data).pipe(
            tapResponse({
              next: (item) => {
                patchState(store, { items: [...store.items(), item] });
              },
              error: console.error,
              finalize: () => patchState(store, { loading: false }),
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
