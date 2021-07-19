export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

export type AuthData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  userId: number;
};

export type ApplicationError = { message: string };

export type LoginResponse = { user: User } | { errors: ApplicationError[] };

export type SingleUserResponseType =
  | { user: User | null }
  | { errors: ApplicationError[] };

export type Bean = {
  id: number;
  productName: string;
  roaster: string;
  roasterCountry: string;
  origin: string;
  beanType: string;
  flavourProfile: string;
  price: string;
  kg: string;
  seller: string;
  barcodeEan13: string;
  uri: string;
};

export type BeanWithRating = Bean & {
  rating: number;
  reviewCount: number;
};

export type BeanType = {
  id: number;
  beanType: string;
};

export type Machine = {
  id: number;
  machineName: string;
  manufacturer: string;
  price: number;
  img: string;
  uri: string;
};

export type Grinder = {
  id: number;
  grinderName: string;
  manufacturer: string;
  price: number;
  img: string;
  uri: string;
};

export type FlavourProfile = {
  id: number;
  body: number;
  intensity: number;
  acidity: number;
};

export type Favourite = {
  id: number;
  userId: number;
  beanId: number;
};

export type Rating = {
  id: number;
  userId: number;
  beanId: number;
  rating: string;
  review: string;
};

export type UserRating = Rating & {
  firstName: string;
  lastName: string;
  profileImage: string;
  machineName: string;
  grinderName: string;
};

export type Setup = {
  id: number;
  userId: number;
  machineId: number;
  machineName: string;
  machineUri: string;
  grinderId: number;
  grinderName: string;
  grinderUri: string;
};

export type Preference = {
  id: number;
  userId: number;
  beanType: string;
  body: number;
  intensity: number;
  acidity: number;
};

export type Seller = {
  id: number;
  sellerName: string;
  sellerDescription: string;
  sellerAddress: string;
  latitude: number;
  longitude: number;
  website: string;
  uri: string;
  rating: number;
  reviews: number;
};
