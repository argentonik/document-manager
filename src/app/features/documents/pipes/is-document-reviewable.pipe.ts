import { inject, Pipe, PipeTransform } from '@angular/core';
import { Document } from '../store/document';
import { DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES } from '../views/documents/documents.providers';

@Pipe({
  name: 'isDocumentReviewable',
})
export class IsDocumentReviewablePipe implements PipeTransform {
  private DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES = inject(
    DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES,
  );

  transform(document: Document): unknown {
    return this.DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES.includes(
      document.status,
    );
  }
}
