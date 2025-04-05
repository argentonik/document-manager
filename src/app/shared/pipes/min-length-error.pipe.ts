import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'minLengthError',
})
export class MinLengthErrorPipe implements PipeTransform {
  transform(field: string, control: FormControl): unknown {
    return `${field} must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
  }
}
