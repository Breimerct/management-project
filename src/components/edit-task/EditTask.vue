<template>
  <DialogContent>
    <template #dialog-button="{ showDialog }">
      <v-btn @click="showDialog" icon size="x-small" color="primary">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <template #dialog-body="{ hideDialog }">
      <TaskForm
        :task="task"
        @onCancel="hideDialog"
        @onSave="editTask($event, hideDialog)"
      />
    </template>
  </DialogContent>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { Task } from '../../types';
import { RootState } from '../../store';

// components imports
import DialogContent from '../../components/dialog-content/DialogContent.vue';
import TaskForm from '../../components/task-form/TaskForm.vue';

const $store = useStore<RootState>();

const { task } = defineProps<{
  task: Task;
}>();

const editTask = (updatedTask: Task, hideDialog: () => void) => {
  $store.dispatch('task/updateTask', { oldTask: task, newTask: updatedTask });
  hideDialog();
};
</script>
