import { inject, Pipe, PipeTransform } from '@angular/core';
import { Document } from '../store/document';
import { DOCUMENTS_CAN_BE_REVOKED_STATUSES } from '../views/documents/documents.providers';

@Pipe({
  name: 'isDocumentRevokable',
})
export class IsDocumentRevokablePipe implements PipeTransform {
  private DOCUMENTS_CAN_BE_REVOKED_STATUSES = inject(
    DOCUMENTS_CAN_BE_REVOKED_STATUSES,
  );

  transform(document: Document): unknown {
    return this.DOCUMENTS_CAN_BE_REVOKED_STATUSES.includes(document.status);
  }
}
