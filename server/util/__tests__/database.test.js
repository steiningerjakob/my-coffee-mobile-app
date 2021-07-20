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

test('insertUser creates correct DB entry', async () => {
  // insert user
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

  // add to favourites list
  const testUserId = newUser.id;
  const testBeanId = 2;
  const newFavourite = await insertFavourite(testUserId, testBeanId);
  expect(newFavourite.userId).toBe(testUserId);
  expect(newFavourite.beanId).toBe(testBeanId);
  const favouriteStatus = await checkFavouriteStatus(testUserId, testBeanId);
  expect(favouriteStatus).toBeTruthy();

  // add review and rating
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

  // delete review and rating
  const deletedReview = await deleteReview(testUserId, testBeanId);
  expect(deletedReview.userRating).toBe(testRating);
  expect(deletedReview.userReview).toBe(testReview);

  // remove from favourite list
  const deletedFavourite = await removeFavourite(testUserId, testBeanId);
  expect(deletedFavourite.userId).toBe(testUserId);
  expect(deletedFavourite.beanId).toBe(testBeanId);

  // delete user
  const deletedUser = await deleteUser(testEmail);
  expect(deletedUser.firstName).toBe(testFirstName);
  expect(deletedUser.lastName).toBe(testLastName);
  expect(deletedUser.email).toBe(testEmail);
});

afterAll(() => {
  const sql = connectOneTimeToDatabase();
  sql.end({ timeout: 0 });
});
