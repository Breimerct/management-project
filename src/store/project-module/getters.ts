import { type GetterTree } from 'vuex';
import { type IProjectState } from './state';
import { type RootState } from '..';

export const getters: GetterTree<IProjectState, RootState> = {
  getProjects(state) {
    return state.projects;
  },
};
