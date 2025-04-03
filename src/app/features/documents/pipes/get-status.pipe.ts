import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStatus',
})
export class GetStatusPipe implements PipeTransform {
  transform(status: string): unknown {
    const res = status.toLowerCase().replace(/_/g, ' ');
    return res.charAt(0).toUpperCase() + res.slice(1);
  }
}
