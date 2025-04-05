import { Routes } from '@angular/router';
import { DocumentsComponent } from './views/documents/documents.component';
import { DocumentCreateComponent } from './views/document-create/document-create.component';
import { DocumentDetailComponent } from './views/document-detail/document-detail.component';
import { DocumentsRootComponent } from './views/documents-root/documents-root.component';

export const routes: Routes = [
  {
    path: '',
    // Provides feature wide dependencies
    component: DocumentsRootComponent,
    children: [
      {
        path: '',
        component: DocumentsComponent,
      },
      {
        path: `create`,
        component: DocumentCreateComponent,
      },
      {
        path: `edit/:id`,
        component: DocumentDetailComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
