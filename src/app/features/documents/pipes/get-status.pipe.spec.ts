import { GetStatusPipe } from './get-status.pipe';

describe('GetStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new GetStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform status correctly', () => {
    const pipe = new GetStatusPipe();
    const input = 'PENDING_APPROVAL';
    const expectedOutput = 'Pending approval';
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });
});
