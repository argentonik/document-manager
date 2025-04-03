import { IsDocumentRemovablePipe } from './is-document-removable.pipe';

describe('IsDocumentRemovablePipe', () => {
  it('create an instance', () => {
    const pipe = new IsDocumentRemovablePipe();
    expect(pipe).toBeTruthy();
  });
});
