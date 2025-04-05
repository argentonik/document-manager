import { MinLengthErrorPipe } from './min-length-error.pipe';

describe('MinLengthErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new MinLengthErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
