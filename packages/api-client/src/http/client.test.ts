import { CandidatesApi } from '..';

describe('CandidatesApi', () => {
  it('returns a paged candidate list from mocks', async () => {
    const api = new CandidatesApi();
    const { data } = await api.listCandidates({ page: 1, size: 10 });
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.total).toBeGreaterThan(0);
  });
});
