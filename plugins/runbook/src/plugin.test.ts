import { runbookPlugin } from './plugin';

describe('runbook', () => {
  it('should export plugin', () => {
    expect(runbookPlugin).toBeDefined();
  });
});
