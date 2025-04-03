import { IsDocumentRevokablePipe } from './is-document-revokable.pipe';

describe('IsDocumentRevokablePipe', () => {
  it('create an instance', () => {
    const pipe = new IsDocumentRevokablePipe();
    expect(pipe).toBeTruthy();
  });
});
