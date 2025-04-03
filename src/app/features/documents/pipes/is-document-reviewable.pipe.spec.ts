import { IsDocumentReviewablePipe } from './is-document-reviewable.pipe';

describe('IsDocumentReviewablePipe', () => {
  it('create an instance', () => {
    const pipe = new IsDocumentReviewablePipe();
    expect(pipe).toBeTruthy();
  });
});
