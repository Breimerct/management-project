import { StatusTask } from '../types';

export const UI_AVATAR_URL_BASE =
  'https://ui-avatars.com/api/?bold=true&uppercase=true';

export const STATUS_TASKS: StatusTask[] = [
  { name: 'To Do', id: 'to-do' },

  { name: 'In Progress', id: 'in-progress' },

  { name: 'Done', id: 'done' },
];

export const STATUS_RULES = [(v: string) => !!v || 'Status is required'];

export const EMAIL_RULES = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

export const PASSWORD_RULES = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
];

export const CONFIRM_PASSWORD_RULES = [
  (v: string) => !!v || 'Confirm password is required',
  (v: string) =>
    v.length >= 6 || 'Confirm password must be at least 6 characters',
  // pass match with ts
  (v: string, { password }: { password: string }) =>
    v === password || 'Password does not match',
];

export const FULL_NAME_RULES = [
  (v: string) => !!v || 'Full name is required',
  (v: string) => v.length >= 3 || 'Full name must be at least 3 characters',
];

export const NAME_RULES = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length >= 10 || 'Name must be at least 10 characters',
];

export const DESCRIPTION_RULES = [
  (v: string) => !!v || 'Description is required',
  (v: string) => v.length >= 10 || 'Description must be at least 10 characters',
];
