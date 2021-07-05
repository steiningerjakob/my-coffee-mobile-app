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
  flavourProfile: number;
  price: number;
  kg: number;
  img: string;
  seller: string;
};

export type Machine = {
  id: number;
  machineName: string;
  manufacturer: string;
  price: number;
  img: string;
};

export type Grinder = {
  id: number;
  grinderName: string;
  manufacturer: string;
  price: number;
  img: string;
};

export type FlavourProfile = {
  id: number;
  body: number;
  fruit: number;
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
  rating: number;
  review: string;
};

export type Setup = {
  id: number;
  userId: number;
  machineId: number;
  grinderId: number;
};
