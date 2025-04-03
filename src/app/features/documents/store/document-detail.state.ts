import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { DocumentDetailService } from '../services/document-detail.service';
import { Document } from '../../../shared/models/document';

const initialState: { document: Document | null; loading: boolean } = {
  document: null,
  loading: false,
};

export const DocumentStore = signalStore(
  withState(initialState),

  withMethods((store) => {
    const service = inject(DocumentDetailService);

    return {
      getDocument: rxMethod<string>(
        switchMap((id) => {
          patchState(store, { loading: true });

          return service.getDocument(id).pipe(
            tapResponse({
              next: (document) => {
                patchState(store, { document: document });
              },
              error: console.error,
              finalize: () => patchState(store, { loading: false }),
            }),
          );
        }),
      ),
    };
  }),
);
