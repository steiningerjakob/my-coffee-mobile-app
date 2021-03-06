import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';
import {
  ApplicationError,
  Bean,
  BeanType,
  BeanWithRating,
  Favourite,
  FlavourProfile,
  Grinder,
  Machine,
  Preference,
  Rating,
  Seller,
  Session,
  Setup,
  User,
  UserRating,
  UserWithPasswordHash,
} from './types';

setPostgresDefaultsOnHeroku();

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
export function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// 1. User-related queries:

export async function getAllUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      email,
      profile_image
    FROM
      users
  `;
  return users.map((user) => camelcaseKeys(user));
}

// Secure version of getUsers which
// allows ANY authenticated user
// to view ALL users
export async function getUsersIfValidSessionToken(token?: string) {
  // Security: Return "Access denied" error if falsy token passed
  if (!token) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  const session = await getValidSessionByToken(token);

  // Security: Return "Access denied" if token does not
  // match valid session
  if (!session) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  // Security: Now this query has been protected
  // and it will only run in case the user has a
  // token corresponding to a valid session
  const users = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      email,
      profile_image
    FROM
      users
  `;

  return users.map((user) => camelcaseKeys(user));
}

export async function getUserByEmailAndToken(email?: string, token?: string) {
  // Security: If the user is not logged in, we do not allow
  // access and return an error from the database function
  if (!token) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }
  // Return undefined if email is falsy
  if (!email) return undefined;

  // Security: Retrieve user via the session token
  const userFromSession = await getUserByValidSessionToken(token);

  // If there is either:
  // - no valid session matching the token
  // - no user matching the valid session
  // ...return undefined
  if (!userFromSession) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      first_name,
      last_name,
      email,
      profile_image
    FROM
      users
    WHERE
      email = ${email}
  `;

  // If we have no user, then return undefined
  const user = users[0];
  // eslint-disable-next-line
  if (!user) return undefined;

  // Security: Match ids of session user with user
  // corresponding to requested username
  if (user.id !== userFromSession.id) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserById(id?: number) {
  // Return undefined if userId is not parseable
  // to an integer
  if (!id) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      first_name,
      last_name,
      email,
      profile_image
    FROM
      users
    WHERE
      id = ${id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserWithPasswordHashByEmail(email?: string) {
  // Return undefined if email is falsy
  if (!email) return undefined;

  const users = await sql<[UserWithPasswordHash]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function insertUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
) {
  const newUser = await sql<User[]>`
    INSERT INTO users
      (first_name, last_name, email, password_hash)
    VALUES
      (${firstName}, ${lastName}, ${email}, ${passwordHash})
    RETURNING
      id,
      first_name,
      last_name,
      email,
      profile_image
  `;
  return newUser.map((user) => camelcaseKeys(user))[0];
}

export async function updateUser(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
) {
  const updatedUser = await sql<User[]>`
    UPDATE users
    SET
      first_name = ${firstName},
      last_name = ${lastName},
      email = ${email},
      password_hash = ${passwordHash}
    WHERE
      id = ${id}
    RETURNING
      *
  `;
  return updatedUser.map((user) => camelcaseKeys(user))[0];
}

export async function deleteUser(email: string) {
  const deletedUser = await sql<User[]>`
    DELETE FROM users
    WHERE
      email = ${email}
    RETURNING
      *
  `;
  return deletedUser.map((user) => camelcaseKeys(user))[0];
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const sessions = await sql<Session[]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry > NOW()
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const session = await getValidSessionByToken(token);

  if (!session) return undefined;

  return await getUserById(session.userId);
}

// 2. Product-related queries:

export async function getAllBeans() {
  const beans = await sql<Bean[]>`
    SELECT
      *
    FROM
      beans
    ORDER by
      product_name
  `;
  return beans.map((bean) => camelcaseKeys(bean));
}

export async function getBeansById(id: number) {
  const singleBean = await sql<Bean[]>`
    SELECT
      *
    FROM
      beans
    WHERE
      id = ${id}
  `;
  return singleBean.map((bean) => camelcaseKeys(bean))[0];
}

export async function getFilteredBeans(query?: string) {
  const beans = await sql<BeanWithRating[]>`
    SELECT
      product_name,
      beans.id as id,
      avg(user_rating) as rating,
      count(user_review) as review_count,
      uri,
      roaster,
      roaster_country,
      bean_type,
      origin,
      flavour_profile
    FROM
      beans
    LEFT JOIN
      ratings ON ratings.bean_id = beans.id
    GROUP BY beans.id
    ORDER BY review_count DESC
  `;
  if (!query) {
    return beans.map((bean) => camelcaseKeys(bean));
  } else {
    return beans
      .filter((bean) => {
        return Object.values(bean).some((str) => String(str).includes(query));
      })
      .map((filteredBean) => camelcaseKeys(filteredBean));
  }
}

export async function getBeanTypes() {
  const beanTypes = await sql<BeanType[]>`
    SELECT
      DISTINCT bean_type
    FROM
      beans
  `;
  return beanTypes.map((types) => camelcaseKeys(types));
}

export async function insertBean(
  productName: string,
  roaster: string,
  roasterCountry: string,
  origin: string,
  beanType: string,
  flavourProfile: string,
  price: number,
  amount: number,
  barcodeEan13: string,
  uri: string,
  pricePerKg: number,
  img: string,
  seller: string,
) {
  const newBean = await sql<[Bean]>`
    INSERT INTO beans
      (product_name, roaster, roaster_country, origin, bean_type, flavour_profile, price, kg, barcode_ean13, uri, price_per_kg, img, seller)
    VALUES
      (${productName}, ${roaster}, ${roasterCountry}, ${origin}, ${beanType}, ${flavourProfile}, ${price}, ${amount}, ${barcodeEan13}, ${uri}, ${pricePerKg}, ${img}, ${seller})
    RETURNING
      *
  `;
  return newBean.map((bean) => camelcaseKeys(bean))[0];
}

export async function getUserFavourites(userId: number) {
  const userFavourites = await sql<Bean[]>`
    SELECT
      beans.id as id,
      beans.product_name as product_name,
      beans.uri as uri,
      beans.roaster as roaster,
      beans.roaster_country as roaster_country,
      beans.bean_type as bean_type,
      beans.origin as origin,
      beans.flavour_profile as flavour_profile,
      flavour_profiles.body as body,
      flavour_profiles.intensity as intensity,
      flavour_profiles.acidity as acidity,
      ratings.user_rating as rating,
      ratings.user_review as review,
      favourites.user_id as user_id
    FROM
      favourites
    LEFT JOIN ratings
      ON ratings.bean_id = favourites.bean_id AND ratings.user_id = ${userId}
    LEFT JOIN beans
      ON beans.id = favourites.bean_id
    LEFT JOIN flavour_profiles
      ON flavour_profiles.id = beans.flavour_profile
    WHERE
      favourites.user_id = ${userId}
    ORDER BY
      ratings.user_rating DESC
  `;
  return userFavourites.map((favourite) => camelcaseKeys(favourite));
}

export async function getRecommendations(
  body: number,
  acidity: number,
  intensity: number,
) {
  const recommendations = await sql<Bean[]>`
    SELECT
      DISTINCT beans.id as id,
      beans.product_name as product_name,
      beans.uri as uri,
      beans.roaster as roaster,
      beans.roaster_country as roaster_country,
      beans.bean_type as bean_type,
      beans.origin as origin,
      beans.flavour_profile as flavour_profile,
      flavour_profiles.body as body,
      flavour_profiles.intensity as intensity,
      flavour_profiles.acidity as acidity
    FROM
      users,
      beans,
      favourites,
      flavour_profiles,
      ratings
    WHERE
      flavour_profiles.id = beans.flavour_profile AND
      flavour_profiles.body BETWEEN ${body - 1} AND ${body + 1} AND
      flavour_profiles.acidity BETWEEN ${acidity - 1} AND ${acidity + 1} AND
      flavour_profiles.intensity BETWEEN ${intensity - 1} AND ${intensity + 1}
    ORDER BY
      beans.product_name
  `;
  return recommendations.map((r) => camelcaseKeys(r));
}

export async function getAllMachines() {
  const machines = await sql<Machine[]>`
    SELECT
      *
    FROM
      machines
    ORDER by
      machine_name
  `;
  return machines.map((machine) => camelcaseKeys(machine));
}

export async function getAllGrinders() {
  const grinders = await sql<Grinder[]>`
    SELECT
      *
    FROM
      grinders
    ORDER by
      grinder_name
  `;
  return grinders.map((grinder) => camelcaseKeys(grinder));
}

export async function getAllSellers() {
  const sellers = await sql<Seller[]>`
    SELECT
      *
    FROM
      sellers
    ORDER by
      seller_name
  `;
  return sellers.map((seller) => camelcaseKeys(seller));
}

export async function getBeansBySeller(sellerName: string) {
  const beans = await sql<Bean[]>`
    SELECT
      DISTINCT beans.id as id,
      beans.product_name as product_name,
      beans.roaster as roaster,
      beans.bean_type as bean_type,
      beans.roaster_country as roaster_country,
      beans.origin as origin,
      beans.seller as seller,
      beans.flavour_profile as flavour_profile,
      beans.price as price,
      beans.kg as amount,
      beans.uri as uri,
      flavour_profiles.body as body,
      flavour_profiles.intensity as intensity,
      flavour_profiles.acidity as acidity
    FROM
      sellers,
      flavour_profiles,
      beans
    WHERE
      beans.seller = ${sellerName} AND
      flavour_profiles.id = beans.flavour_profile
    ORDER by
      product_name
  `;
  return beans.map((bean) => camelcaseKeys(bean));
}

export async function getFlavourProfileById(id: number) {
  const flavourProfile = await sql<FlavourProfile[]>`
    SELECT
      *
    FROM
      flavour_profiles
    WHERE
      id = ${id}
  `;
  return flavourProfile.map((flavour) => camelcaseKeys(flavour))[0];
}

// 3. Actions-related queries:

export async function insertFavourite(userId: number, beanId: number) {
  const newFavourite = await sql<Favourite[]>`
    INSERT INTO favourites
      (user_id, bean_id)
    VALUES
      (${userId}, ${beanId})
    RETURNING
      id,
      user_id,
      bean_id
  `;
  return newFavourite.map((favourite) => camelcaseKeys(favourite))[0];
}

export async function removeFavourite(userId: number, beanId: number) {
  const removedFavourite = await sql<Favourite[]>`
    DELETE FROM
      favourites
    WHERE
      user_id = ${userId} AND
      bean_id = ${beanId}
    RETURNING *
  `;
  return removedFavourite.map((favourite) => camelcaseKeys(favourite))[0];
}

export async function checkFavouriteStatus(userId: number, beanId: number) {
  const favourite = await sql<number[]>`
    SELECT
      id
    FROM
      favourites
    WHERE
      user_id = ${userId} AND
      bean_id = ${beanId}
  `;
  // eslint-disable-next-line
  if (favourite) {
    return favourite.map((fav) => camelcaseKeys(fav))[0];
  } else {
    return undefined;
  }
}

export async function getFavouritesByUserId(userId: number) {
  const favouriteBeansIds = await sql<number[]>`
    SELECT
      bean_id
    FROM
      favourites
    WHERE
      user_id = ${userId}
  `;
  return favouriteBeansIds.map((favourite) => camelcaseKeys(favourite));
}

export async function insertReview(
  userId: number,
  beanId: number,
  rating: string,
  review: string,
) {
  const newReview = await sql<Rating[]>`
    INSERT INTO ratings
      (user_id, bean_id, user_rating, user_review)
    VALUES
      (${userId}, ${beanId}, ${rating}, ${review})
    RETURNING
      id,
      user_id,
      bean_id,
      user_rating,
      user_review
  `;
  return newReview.map((r) => camelcaseKeys(r))[0];
}

export async function getReviewsByBeanId(beanId: number) {
  const userReviews = await sql<UserRating[]>`
    SELECT
      user_rating,
      user_review,
      to_char(rating_date, 'dd.mm.yy') as rating_date,
      first_name,
      last_name,
      profile_image as uri
    FROM
      ratings,
      users
    WHERE
      ratings.bean_id = ${beanId} AND
      ratings.user_id = users.id
    ORDER BY rating_date DESC
  `;
  return userReviews.map((review) => camelcaseKeys(review));
}

export async function checkReviewStatus(userId: number, beanId: number) {
  const userEntry = await sql<Rating[]>`
    SELECT
      id,
      user_rating,
      user_review
    FROM
      ratings
    WHERE
      user_id = ${userId} AND
      bean_id = ${beanId}
  `;
  // eslint-disable-next-line
  if (userEntry) {
    return userEntry.map((r) => camelcaseKeys(r))[0];
  } else {
    return undefined;
  }
}

export async function updateReview(
  userId: number,
  beanId: number,
  rating: string,
  review: string,
) {
  const updatedReview = await sql<Rating[]>`
    UPDATE ratings
    SET
      user_rating = ${rating},
      user_review = ${review}
    WHERE
      user_id = ${userId} AND
      bean_id = ${beanId}
    RETURNING
      id,
      user_id,
      bean_id,
      user_rating,
      user_review
  `;
  return updatedReview.map((update) => camelcaseKeys(update))[0];
}

export async function deleteReview(userId: number, beanId: number) {
  const deletedReview = await sql<Rating[]>`
    DELETE FROM
      ratings
    WHERE
      user_id = ${userId} AND
      bean_id = ${beanId}
    RETURNING
      *
  `;
  return deletedReview.map((review) => camelcaseKeys(review))[0];
}

export async function getBeansWithRatings() {
  const beans = await sql<BeanWithRating[]>`
    SELECT
      product_name,
      beans.id as bean_id,
      avg(user_rating) as average_rating,
      count(user_review) as review_count,
      uri,
      roaster,
      roaster_country,
      bean_type,
      origin,
      flavour_profile
    FROM
      beans
      LEFT JOIN ratings ON ratings.bean_id = beans.id
    GROUP BY beans.id
    ORDER BY review.count DESC
  `;
  return beans.map((bean) => camelcaseKeys(bean));
}

export async function updateProfileImage(id: number, profileImage: string) {
  const updatedProfileImage = await sql`
    UPDATE
      users
    SET
      profile_image = ${profileImage}
    WHERE
      id = ${id}
    RETURNING
      id,
      profile_image
  `;
  return updatedProfileImage.map((img) => camelcaseKeys(img))[0];
}

export async function checkProfileImageStatus(userId: number) {
  const profileImage = await sql<string[]>`
    SELECT
      profile_image
    FROM
      users
    WHERE
      users.id = ${userId}
  `;
  // eslint-disable-next-line
  if (profileImage) {
    return profileImage.map((image) => camelcaseKeys(image))[0];
  } else {
    return undefined;
  }
}

export async function insertSetup(
  userId: number,
  machineId: number,
  grinderId: number,
) {
  const newSetup = await sql<Setup[]>`
    INSERT INTO setups
      (user_id, machine_id, grinder_id)
    VALUES
      (${userId}, ${machineId}, ${grinderId})
    RETURNING
      id,
      user_id,
      machine_id
  `;
  return newSetup.map((setup) => camelcaseKeys(setup))[0];
}

export async function updateSetup(
  userId: number,
  machineId: number,
  grinderId: number,
) {
  const updatedSetup = await sql<Rating[]>`
    UPDATE setups
    SET
      machine_id = ${machineId},
      grinder_id = ${grinderId}
    WHERE
      user_id = ${userId}
    RETURNING
      *
  `;
  return updatedSetup.map((update) => camelcaseKeys(update))[0];
}

export async function removeSetup(setupId: number) {
  const removedSetup = await sql<Setup[]>`
    DELETE FROM
      setups
    WHERE
      id = ${setupId}
    RETURNING *
  `;
  return removedSetup.map((setup) => camelcaseKeys(setup))[0];
}

export async function getUserSetups(userId: number) {
  const userSetup = await sql<Setup[]>`
    SELECT
      setups.id as id,
      machines.id as machine_id,
      machines.machine_name as machine_name,
      machines.uri as machine_uri,
      grinders.id as grinder_id,
      grinders.grinder_name as grinder_name,
      grinders.uri as grinder_uri
    FROM
      setups,
      machines,
      grinders
    WHERE
      ${userId} = setups.user_id AND
      setups.machine_id = machines.id AND
      setups.grinder_id = grinders.id
  `;
  return userSetup.map((setup) => camelcaseKeys(setup));
}

export async function insertPreference(
  userId: number,
  beanType: string,
  body: number,
  intensity: number,
  acidity: number,
) {
  const newPreference = await sql<Preference[]>`
    INSERT INTO preferences
      (user_id, bean_type, body, intensity, acidity)
    VALUES
      (${userId}, ${beanType}, ${body}, ${intensity}, ${acidity})
    RETURNING
      *
  `;
  return newPreference.map((preference) => camelcaseKeys(preference))[0];
}

export async function checkPreferences(userId: number) {
  const existingPreference = await sql<Preference[]>`
    SELECT
      bean_type,
      body,
      intensity,
      acidity
    FROM
      preferences
    WHERE
      ${userId} = preferences.user_id
  `;
  // eslint-disable-next-line
  if (existingPreference) {
    return existingPreference.map((preference) => camelcaseKeys(preference))[0];
  } else {
    return undefined;
  }
}

export async function clearPreferences(userId: number) {
  const clearedPreference = await sql<Preference[]>`
    DELETE FROM
      preferences
    WHERE
      user_id = ${userId}
    RETURNING
      *
  `;
  return clearedPreference.map((preference) => camelcaseKeys(preference))[0];
}

export async function updatePreference(
  userId: number,
  beanType: string,
  body: number,
  intensity: number,
  acidity: number,
) {
  const updatedPreference = await sql<Preference[]>`
    UPDATE preferences
    SET
      bean_type = ${beanType},
      body = ${body},
      intensity = ${intensity},
      acidity = ${acidity}
    WHERE
      user_id = ${userId}
    RETURNING
      *
  `;
  return updatedPreference.map((preference) => camelcaseKeys(preference))[0];
}
