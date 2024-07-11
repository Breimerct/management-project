<template>
  <ul class="task-list">
    <NewTask :projectId="projectId" :statusId="statusId" />

    <li
      v-for="task in convertObjectToArray(tasks[statusId])"
      :key="task.uid"
      class="task-list-item"
    >
      <div class="d-flex justify-space-between">
        <Typography tag="h6" variant="h6" bold class="text-truncate">
          {{ task.name }}
          <v-tooltip activator="parent" location="bottom" style="width: 200px">
            {{ task.name }}
          </v-tooltip>
        </Typography>

        <div class="d-flex flex-nowrap ga-2 ml-2">
          <EditTask :task="task" />
          <DialogConfirm
            title="Delete Task"
            message="Are you sure you want to delete this task?"
            icon="mdi-delete-outline"
            buttonSize="x-small"
            buttonVariant="elevated"
            buttonColor="error"
            buttonConfirmText="Delete"
            buttonConfirmColor="error"
            buttonCancelColor="primary"
            @onConfirm="deleteTask(task)"
          />
        </div>
      </div>

      <Typography tag="p" variant="body-1" class="text-truncate">
        {{ task.description }}
        <v-tooltip
          activator="parent"
          location="bottom"
          style="width: 200px !important"
        >
          {{ task.description }}
        </v-tooltip>
      </Typography>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Task } from '../../types';
import { useStore } from 'vuex';
import { RootState } from '../../store';

// Components imports
import Typography from '../../components/Typography.vue';
import NewTask from '../../components/new-task/NewTask.vue';
import EditTask from '../../components/edit-task/EditTask.vue';
import DialogConfirm from '../../components/dialog-confirm/DialogConfirm.vue';

const $store = useStore<RootState>();

const { statusId } = defineProps<{
  statusId: string;
  projectId: string;
}>();

const tasks = computed<Record<string, any>>(
  () => $store.getters['task/getTasks'],
);

const convertObjectToArray = (data: Record<string, Task>) =>
  Object.values(data || {});

const deleteTask = (task: Task) => {
  $store.dispatch('task/deleteTask', task);
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixin-scroll.scss';

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
    background-color: #cccccc;
    margin-bottom: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    cursor: grab;
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
