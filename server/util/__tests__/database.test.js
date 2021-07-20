import {
  checkFavouriteStatus,
  checkReviewStatus,
  connectOneTimeToDatabase,
  deleteReview,
  deleteUser,
  getAllBeans,
  getFilteredBeans,
  insertFavourite,
  insertReview,
  insertUser,
  removeFavourite,
} from '../database';

beforeAll(() => {
  connectOneTimeToDatabase();
});

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
  const newFavourite = await insertFavourite(testUserId, testBeanId);
  expect(newFavourite.userId).toBe(testUserId);
  expect(newFavourite.beanId).toBe(testBeanId);
  const favouriteStatus = await checkFavouriteStatus(testUserId, testBeanId);
  expect(favouriteStatus).toBeTruthy();
  const deletedFavourite = await removeFavourite(testUserId, testBeanId);
  expect(deletedFavourite.userId).toBe(testUserId);
  expect(deletedFavourite.beanId).toBe(testBeanId);
});

test('insertReview creates DB entry with specified rating and review', async () => {
  const testUserId = 1;
  const testBeanId = 2;
  const testRating = '4';
  const testReview = 'Pretty good';
  const newReview = await insertReview(
    testUserId,
    testBeanId,
    testRating,
    testReview,
  );
  expect(newReview.userRating).toBe(testRating);
  expect(newReview.userReview).toBe(testReview);
  const reviewStatus = await checkReviewStatus(testUserId, testBeanId);
  expect(reviewStatus.userRating).toBe(testRating);
  expect(reviewStatus.userReview).toBe(testReview);
  const deletedReview = await deleteReview(testUserId, testBeanId);
  expect(deletedReview.userRating).toBe(testRating);
  expect(deletedReview.userReview).toBe(testReview);
});

test('insertUser creates correct DB entry', async () => {
  const testFirstName = 'FirstName';
  const testLastName = 'LastName';
  const testEmail = 'Email';
  const testPasswordHash = '1234abcd';
  const newUser = await insertUser(
    testFirstName,
    testLastName,
    testEmail,
    testPasswordHash,
  );
  expect(newUser.firstName).toBe(testFirstName);
  expect(newUser.lastName).toBe(testLastName);
  expect(newUser.email).toBe(testEmail);
  const deletedUser = await deleteUser(testEmail);
  expect(deletedUser.firstName).toBe(testFirstName);
  expect(deletedUser.lastName).toBe(testLastName);
  expect(deletedUser.email).toBe(testEmail);
});

afterAll(() => {
  const sql = connectOneTimeToDatabase();
  sql.end({ timeout: 0 });
});
