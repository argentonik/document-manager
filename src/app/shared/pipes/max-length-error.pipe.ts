import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'maxLengthError',
})
export class MaxLengthErrorPipe implements PipeTransform {
  transform(field: string, control: FormControl): unknown {
    return `${field} must be at most ${control.errors?.['maxlength'].requiredLength} characters long`;
  }
}
