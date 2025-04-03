import { Pipe, PipeTransform } from '@angular/core';
import { Document } from '../store/document';

@Pipe({
  name: 'getStatus',
})
export class GetStatusPipe implements PipeTransform {
  transform(document: Document): unknown {
    const status = document.status.toLowerCase().replace(/_/g, ' ');
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
