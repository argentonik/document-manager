import { MinLengthErrorPipe } from './min-length-error.pipe';
import { FormControl, Validators } from '@angular/forms';

describe('MinLengthErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new MinLengthErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct error message', () => {
    const pipe = new MinLengthErrorPipe();
    const field = 'Test Field';
    const control = new FormControl('', [Validators.minLength(10)]);
    control.setErrors({ minlength: { requiredLength: 10 } });
    expect(pipe.transform(field, control)).toEqual(
      'Test Field must be at least 10 characters long',
    );
  });
});
