import { type ActionTree } from 'vuex';
import { type IProjectState } from './state';
import { type RootState } from '..';
import { Project } from '../../types';
import { getDB, setDB } from '../../plugins/firebase';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERRORS } from '../../constanst/firebaseError';
import { useToast } from 'vue-toast-notification';

export const $toast = useToast();

export const actions: ActionTree<IProjectState, RootState> = {
  createProject({ rootGetters, dispatch }, project: Project) {
    try {
      const userId = rootGetters['auth/getCurrentUser'].uid;
      const newProject = { ...project, userId };

      setDB('projects', newProject).then(() => {
        $toast.success('Project created successfully');
      });
      dispatch('searchProjects');
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  async searchProjects({ commit, rootGetters }) {
    try {
      const userId = rootGetters['auth/getCurrentUser'].uid;
      const response = await getDB('projects', userId);
      const projects = Object.values(response || {});

      commit('setProjects', projects);
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
