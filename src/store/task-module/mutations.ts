import { type MutationTree } from 'vuex';
import { type IProjectState } from './state';
import { type Task } from '../../types';

export const mutations: MutationTree<IProjectState> = {
  setTasks(state, payload: Task[]) {
    state.tasks = payload;
  },
};
