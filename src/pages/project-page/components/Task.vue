<template>
  <ul class="task-list">
    <li
      v-for="task in convertObjectToArray(tasks[statusId])"
      :key="task.id"
      class="task-list-item"
    >
      {{ task.name }}
    </li>

    <li
      class="task-list-item new-task-button"
      @click="console.log('Create new task')"
    >
      <v-icon size="x-large"> mdi-plus </v-icon>
      <span>Create new task</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Task } from '../../../types';
import { defineProps } from 'vue';

const { statusId, projectId } = defineProps<{
  statusId: string;
  projectId: string;
}>();

console.log(statusId, projectId);

const tasks = ref<Record<string, Record<string, Task>>>({
  'to-do': {
    '1': { id: '1', name: 'Task 1', statusId: 'to-do' },
    '2': { id: '2', name: 'Task 2', statusId: 'to-do' },
    '3': { id: '3', name: 'Task 3', statusId: 'to-do' },
    '10': { id: '10', name: 'Task 10', statusId: 'to-do' },
    '11': { id: '11', name: 'Task 11', statusId: 'to-do' },
    '12': { id: '12', name: 'Task 12', statusId: 'to-do' },
    '13': { id: '13', name: 'Task 13', statusId: 'to-do' },
    '14': { id: '14', name: 'Task 14', statusId: 'to-do' },
    '15': { id: '15', name: 'Task 15', statusId: 'to-do' },
  },
  'in-progress': {
    '4': { id: '4', name: 'Task 4', statusId: 'in-progress' },
    '5': { id: '5', name: 'Task 5', statusId: 'in-progress' },
    '6': { id: '6', name: 'Task 6', statusId: 'in-progress' },
  },
  done: {
    '7': { id: '7', name: 'Task 7', statusId: 'done' },
    '8': { id: '8', name: 'Task 8', statusId: 'done' },
    '9': { id: '9', name: 'Task 9', statusId: 'done' },
  },
});

const convertObjectToArray = (obj: Record<string, Task>) => Object.values(obj);
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin-scroll.scss';

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto;
  @include custom-scrollbar(#d4d4d4, #ffffff, #9a9a9a, 0.9rem);

  &-item {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    margin-bottom: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }
}

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
../../../types/types ../../../types/type.
