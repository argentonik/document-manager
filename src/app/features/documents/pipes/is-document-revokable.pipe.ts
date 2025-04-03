import { Pipe, PipeTransform } from '@angular/core';
import { Document, DOCUMENT_REVOKING_STATUSES } from '../store/document';

@Pipe({
  name: 'isDocumentRevokable',
})
export class IsDocumentRevokablePipe implements PipeTransform {
  transform(document: Document): unknown {
    return DOCUMENT_REVOKING_STATUSES.includes(document.status);
  }
}
