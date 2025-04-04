import { inject, Pipe, PipeTransform } from '@angular/core';
import { Document } from '../store/document';
import { DOCUMENTS_USER_STATUSES } from '../views/documents/documents.providers';

@Pipe({
  name: 'isDocumentRemovable',
})
export class IsDocumentRemovablePipe implements PipeTransform {
  private DOCUMENT_USER_STATUSES = inject(DOCUMENTS_USER_STATUSES);

  transform(document: Document): unknown {
    return this.DOCUMENT_USER_STATUSES.includes(document.status);
  }
}
