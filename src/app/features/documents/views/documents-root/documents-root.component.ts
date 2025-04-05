import { Component } from '@angular/core';
import { DocumentsStore } from '../../store/documents.state';
import {
  documentColumnsFactory,
  DOCUMENTS_COLUMNS,
} from '../documents/documents.providers';
import { AuthService } from '../../../../core/auth/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-documents-root',
  imports: [RouterOutlet],
  providers: [
    DocumentsStore,
    {
      provide: DOCUMENTS_COLUMNS,
      useFactory: documentColumnsFactory,
      deps: [AuthService],
    },
  ],
  templateUrl: './documents-root.component.html',
  styleUrl: './documents-root.component.scss',
})
export class DocumentsRootComponent {}
