import { type GetterTree } from 'vuex';
import { type ITaskState } from './state';
import { type RootState } from '..';

export const getters: GetterTree<ITaskState, RootState> = {
  getTasks(state) {
    return state.tasks;
  },
};
