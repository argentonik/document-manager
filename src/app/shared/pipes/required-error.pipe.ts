import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requiredError',
})
export class RequiredErrorPipe implements PipeTransform {
  transform(field: string): unknown {
    return `${field} is required`;
  }
}
