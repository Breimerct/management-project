import { type ActionTree } from 'vuex';
import { type IProjectState } from './state';
import { type RootState } from '..';
import { Project } from '../../types';
import { getDB, setDB } from '@/plugins/firebase';

export const actions: ActionTree<IProjectState, RootState> = {
  createProject({ rootGetters, dispatch }, project: Project) {
    const userId = rootGetters['auth/getCurrentUser'].uid;
    const newProject = { ...project, userId };

    setDB('projects', newProject);
    dispatch('searchProjects');
  },

  async searchProjects({ commit, rootGetters }) {
    const userId = rootGetters['auth/getCurrentUser'].uid;
    const response = await getDB('projects', userId);
    const projects = Object.values(response);

    commit('setProjects', projects);
  },
};
