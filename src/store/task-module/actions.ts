import { type ActionTree } from 'vuex';
import { type IProjectState } from './state';
import { type RootState } from '..';
import { Task } from '../../types';
import { getDB, setDB } from '@/plugins/firebase';

export const actions: ActionTree<IProjectState, RootState> = {
  createTask({ dispatch }, task: Task) {
    setDB(`task/${task.projectId}/${task.statusId}`, task);
    dispatch('searchTask', task);
  },

  async searchTask({ commit, rootGetters }, { projectId, statusId }) {
    const userId = rootGetters['auth/getCurrentUser'].uid;
    const response = await getDB(`task/${projectId}/${statusId}`, userId);
    const tasks = Object.values(response);

    commit('setTasks', tasks);
  },
};
