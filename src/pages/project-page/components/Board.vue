<template>
  <section class="w-100 h-100 pb-12">
    <ol class="status-list">
      <li
        v-for="status in statusTasks"
        :key="status.id"
        class="status-list-item"
      >
        <Typography tag="h6" variant="h6" class="mb-2" bold>
          {{ status.name }}
        </Typography>

        <Task :statusId="status.id" :projectId="projectId" />
      </li>
    </ol>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { STATUS_TASKS } from '../../../constanst';
import { StatusTask } from '../../../types';
import { useRoute } from 'vue-router';

// imports components
import Task from './Task.vue';
import Typography from '../../../components/Typography.vue';

const route = useRoute();

const statusTasks = ref<StatusTask[]>(STATUS_TASKS);
const projectId = computed(() => route.params?.projectId as string);
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin-scroll.scss';

.status-list {
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  padding-bottom: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  @include custom-scrollbar(#d4d4d4, #ffffff, #9a9a9a, 0.5rem, 0.9rem);

  &-item {
    padding: 1rem;
    padding-bottom: 1.5rem;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    height: 100%;
    min-width: 350px;
  }
}
</style>
