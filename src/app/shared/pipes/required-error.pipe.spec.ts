import { RequiredErrorPipe } from './required-error.pipe';

describe('RequiredErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new RequiredErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
