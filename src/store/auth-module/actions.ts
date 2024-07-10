import { type ActionTree } from 'vuex';
import { type IAuthState } from './state';
import { type RootState } from '..';
import { NewUser } from '../../types';
import {
  signInWithEmailAndPass,
  createAccount,
  resetPassword,
  logout,
} from '@/plugins/firebase';
import { FIREBASE_ERRORS } from '@/constanst/firebaseError';
import { FirebaseError } from 'firebase/app';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

export const actions: ActionTree<IAuthState, RootState> = {
  async register({ commit }, payload: NewUser) {
    try {
      const user = await createAccount(payload);
      sessionStorage.setItem('user', JSON.stringify(user));
      commit('setUser', user);
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  async login({ commit }, payload: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPass(
        payload.email,
        payload.password,
      );
      sessionStorage.setItem('user', JSON.stringify(user));
      commit('setUser', user);
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  resetPassword({}, email: string) {
    try {
      resetPassword(email);
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  async logout({ commit }) {
    try {
      await logout();
      sessionStorage.removeItem('user');
      commit('setUser', null);
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },
};
