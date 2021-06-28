export type User = {
  id: number;
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
