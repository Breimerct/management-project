<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.uid" class="task-list-item">
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
import { computed, onMounted } from 'vue';
import { Task } from '../../../types';
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { RootState } from '@/store';

const $store = useStore<RootState>();

const { statusId, projectId } = defineProps<{
  statusId: string;
  projectId: string;
}>();

const tasks = computed<Task[]>(() => $store.getters['task/getTasks']);

onMounted(async () => {
  $store.dispatch('task/searchTasks', { statusId, projectId });
});
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
