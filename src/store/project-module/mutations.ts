import { type MutationTree } from 'vuex';
import { type IProjectState } from './state';
import { type Project } from '../../types';

export const mutations: MutationTree<IProjectState> = {
  setProjects(state, payload: Project[]) {
    state.projects = payload;
  },
};
