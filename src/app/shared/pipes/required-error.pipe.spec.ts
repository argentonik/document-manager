import { RequiredErrorPipe } from './required-error.pipe';

describe('RequiredErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new RequiredErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct error message', () => {
    const pipe = new RequiredErrorPipe();
    const field = 'Test Field';
    expect(pipe.transform(field)).toEqual('Test Field is required');
  });
});
