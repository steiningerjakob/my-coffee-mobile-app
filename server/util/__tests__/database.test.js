import {
  checkFavouriteStatus,
  getAllBeans,
  getFilteredBeans,
  insertFavourite,
  removeFavourite,
} from '../database';

test('getAllBeans returns an array with bean objects', async () => {
  const beans = await getAllBeans();
  expect(beans.length).toBeGreaterThan(0);
});

test('getFilteredBeans returns queried beans', async () => {
  const query = '100% Arabica';
  const filteredBeans = await getFilteredBeans(query);
  expect(filteredBeans[0].beanType).toBe('100% Arabica');
});

test('insertFavourite creates DB entry with specified IDs', async () => {
  const testUserId = 1;
  const testBeanId = 2;
  const entry = { userId: 1, beanId: 2 };
  const newFavourite = await insertFavourite(testUserId, testBeanId);
  expect(newFavourite.userId).toBe(testUserId);
  expect(newFavourite.beanId).toBe(testBeanId);
  const favouriteStatus = await checkFavouriteStatus(testUserId, testBeanId);
  expect(favouriteStatus).toBeTruthy();
});
