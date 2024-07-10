import { type MutationTree } from 'vuex';
import { type ITaskState } from './state';
import { type Task } from '../../types';

export const mutations: MutationTree<ITaskState> = {
  setTasks(state, payload: Task[]) {
    state.tasks = payload;
  },
};
