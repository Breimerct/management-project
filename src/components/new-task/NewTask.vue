<template>
  <DialogContent buttonText="new project">
    <template #dialog-button="{ showDialog }">
      <li class="task-list-item new-task-button" @click="showDialog">
        <v-icon size="x-large"> mdi-plus </v-icon>
        <span>Create new task</span>
      </li>
    </template>

    <template #dialog-body="{ hideDialog }">
      <TaskForm
        @onCancel="hideDialog"
        @onSave="createTask($event, hideDialog)"
      />
    </template>
  </DialogContent>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { RootState } from '../../store';
import { Task } from '../../types';

// components imports
import DialogContent from '../dialog-content/DialogContent.vue';
import TaskForm from '../new-task/TaskForm.vue';

const props = defineProps<{
  projectId?: string;
  statusId?: string;
}>();

const $store = useStore<RootState>();

const createTask = (task: Task, cb: () => void) => {
  $store
    .dispatch('task/createTask', {
      ...task,
      projectId: props.projectId,
    })
    .then(() => {
      cb();
    });
};
</script>

<style lang="scss" scoped>
.new-task-button {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  margin-bottom: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e5e5e5;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
