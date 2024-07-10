import { type ActionTree } from 'vuex';
import { type ITaskState } from './state';
import { type RootState } from '..';
import { Task } from '../../types';
import { getDB, setDB } from '@/plugins/firebase';

export const actions: ActionTree<ITaskState, RootState> = {
  createTask({ dispatch }, task: Task) {
    setDB(`task/${task.projectId}/${task.statusId}`, task);
    dispatch('searchTask', task);
  },

  async searchTask({ commit, rootGetters }, { projectId }) {
    const userId = rootGetters['auth/getCurrentUser'].uid;
    const response = await getDB(`task/${projectId}`, userId);

    commit('setTasks', response || {});
  },
};
