import { type GetterTree } from 'vuex';
import { type IAuthState } from './state';
import { type RootState } from '..';

export const getters: GetterTree<IAuthState, RootState> = {
  getCurrentUser: (state) =>
    JSON.parse(sessionStorage.getItem('user') || 'null') || state.currentUser,
};
