import { User } from 'firebase/auth';

export interface IAuthState {
  currentUser: User | null;
}

const state: IAuthState = {
  currentUser: null,
};

export default state;
