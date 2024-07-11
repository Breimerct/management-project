import { type ActionTree } from 'vuex';
import { type IAuthState } from './state';
import { type RootState } from '..';
import { NewUser } from '../../types';
import {
  signInWithEmailAndPass,
  createAccount,
  resetPassword,
  logout,
} from '../../plugins/firebase';
import { FIREBASE_ERRORS } from '../../constanst/firebaseError';
import { FirebaseError } from 'firebase/app';
import { useToast } from 'vue-toast-notification';
import EventBus from '../../plugins/eventBus';

const $toast = useToast();

export const actions: ActionTree<IAuthState, RootState> = {
  async register({ commit }, payload: NewUser) {
    try {
      EventBus.emit('loading', true);
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
    } finally {
      EventBus.emit('loading', false);
    }
  },

  async login({ commit }, payload: { email: string; password: string }) {
    try {
      EventBus.emit('loading', true);
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
    } finally {
      EventBus.emit('loading', false);
    }
  },

  resetPassword({}, email: string) {
    try {
      EventBus.emit('loading', true);
      resetPassword(email).then(() => {
        $toast.success('Check your email to reset your password');
      });
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    } finally {
      EventBus.emit('loading', false);
    }
  },

  async logout({ commit }) {
    try {
      EventBus.emit('loading', true);
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
    } finally {
      EventBus.emit('loading', false);
    }
  },
};
