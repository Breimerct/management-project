import { type ActionTree } from 'vuex';
import { type ITaskState } from './state';
import { type RootState } from '..';
import { Task } from '../../types';
import { getDB, setDB, updateData } from '../../plugins/firebase';
import { FIREBASE_ERRORS } from '../../constanst/firebaseError';
import { FirebaseError } from 'firebase/app';
import { useToast } from 'vue-toast-notification';

export const $toast = useToast();

export const actions: ActionTree<ITaskState, RootState> = {
  createTask({ dispatch }, task: Task) {
    try {
      setDB(`task/${task.projectId}/${task.statusId}`, task).then(() => {
        $toast.success('Task created successfully');
      });
      dispatch('searchTask', task);
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  async updateTask(
    { dispatch },
    { oldTask, newTask }: { oldTask: Task; newTask: Task },
  ) {
    try {
      updateData(
        `task/${oldTask.projectId}/${newTask.statusId}/${oldTask.uid}`,
        {
          ...oldTask,
          ...newTask,
        },
      ).then(() => {
        $toast.success('Task updated successfully');
      });

      if (oldTask.statusId !== newTask.statusId) {
        updateData(
          `task/${oldTask.projectId}/${oldTask.statusId}/${oldTask.uid}`,
          null,
        );
      }

      dispatch('searchTask', { projectId: oldTask.projectId });
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  async deleteTask({ dispatch }, task: Task) {
    try {
      updateData(
        `task/${task.projectId}/${task.statusId}/${task.uid}`,
        null,
      ).then(() => {
        $toast.success('Task deleted successfully');
      });

      dispatch('searchTask', { projectId: task.projectId });
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code) {
        console.error(FIREBASE_ERRORS[code]);
        $toast.error(FIREBASE_ERRORS[code]);
      }

      throw new Error(FIREBASE_ERRORS[code]);
    }
  },

  async searchTask({ commit, rootGetters }, { projectId }) {
    try {
      const userId = rootGetters['auth/getCurrentUser'].uid;
      const response = await getDB(`task/${projectId}`, userId);

      commit('setTasks', response || {});
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
