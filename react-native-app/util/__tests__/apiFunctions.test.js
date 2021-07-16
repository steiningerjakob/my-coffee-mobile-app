import { getFilteredBeans } from '../apiFunctions';

// 1. Test "get filtered beans fetch"
it('getFilteredBeans returns an array of beans', async () => {
  const testQuery = undefined;
  const result = await getFilteredBeans(testQuery);
  expect(result).toContain('100% Arabica');
});
