import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
})
export class IncludesPipe implements PipeTransform {
  transform<T>(arr: T[], val: T) {
    return arr.includes(val);
  }
}
