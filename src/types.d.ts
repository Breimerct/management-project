import { DataSnapshot, Unsubscribe } from 'firebase/database';

export enum TypographyVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  'subtitle-1' = 'subtitle-1',
  'subtitle-2' = 'subtitle-2',
  'body-1' = 'body-1',
  'body-2' = 'body-2',
  caption = 'caption',
  overline = 'overline',
}

export type StatusTask = {
  name: string;
  id: string;
};

export type Task = {
  id: string | number;
  name: string;
  description?: string;
  statusId: string;
};

export type NewUser = {
  fullName: string;
  email: string;
  password: string;
};

export type GetDB = (
  path: string,
  userId: string,
  snapshot: (snapshot: DataSnapshot) => void,
  error?: (error: Error) => void,
) => Unsubscribe;

export type SetDB = <T>(path: string, data: T) => Promise<T | null>;

export type UpdateData = (
  path: string | Record<string, unknown>,
  data?: unknown,
) => void;

export type VFormType = {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
};
