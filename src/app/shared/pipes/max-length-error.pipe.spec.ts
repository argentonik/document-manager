import { MaxLengthErrorPipe } from './max-length-error.pipe';
import { FormControl, Validators } from '@angular/forms';

describe('MaxLengthErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxLengthErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct error message', () => {
    const pipe = new MaxLengthErrorPipe();
    const field = 'Test Field';
    const control = new FormControl('', [Validators.maxLength(10)]);
    control.setErrors({ maxlength: { requiredLength: 10 } });
    expect(pipe.transform(field, control)).toEqual(
      'Test Field must be at most 10 characters long',
    );
  });
});
