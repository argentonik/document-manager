import { MaxLengthErrorPipe } from './max-length-error.pipe';

describe('MaxLengthErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxLengthErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
