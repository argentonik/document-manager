import { Pipe, PipeTransform } from '@angular/core';
import { Document, DOCUMENT_DELETING_STATUSES } from '../store/document';

@Pipe({
  name: 'isDocumentRemovable',
})
export class IsDocumentRemovablePipe implements PipeTransform {
  transform(document: Document): unknown {
    return DOCUMENT_DELETING_STATUSES.includes(document.status);
  }
}
