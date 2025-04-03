import { Pipe, PipeTransform } from '@angular/core';
import { Document, DOCUMENT_REVIEWING_STATUSES } from '../store/document';

@Pipe({
  name: 'isDocumentReviewable',
})
export class IsDocumentReviewablePipe implements PipeTransform {
  transform(document: Document): unknown {
    return DOCUMENT_REVIEWING_STATUSES.includes(document.status);
  }
}
