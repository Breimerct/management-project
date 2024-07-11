<template>
  <v-form v-model="formValid" @submit.prevent="createTask">
    <v-card-text class="d-flex flex-column ga-4">
      <v-text-field
        v-model="taskForm.name"
        label="Task Name"
        variant="outlined"
        color="primary"
        :rules="NAME_RULES"
        dense
        required
      ></v-text-field>

      <v-select
        v-model="taskForm.status"
        :items="STATUS_TASKS"
        label="Status"
        variant="outlined"
        color="primary"
        item-title="name"
        item-value="id"
        :rules="STATUS_RULES"
        dense
        required
      ></v-select>

      <v-textarea
        v-model="taskForm.description"
        label="Description"
        variant="outlined"
        color="primary"
        :rules="DESCRIPTION_RULES"
        dense
        required
      ></v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-btn variant="outlined" color="primary" type="submit"> save </v-btn>
      <v-btn @click="handleCancel" variant="tonal" color="error">Cancel</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import {
  NAME_RULES,
  DESCRIPTION_RULES,
  STATUS_TASKS,
  STATUS_RULES,
} from '../../constanst';
import { Task } from '../../types';

const { task } = defineProps<{
  task?: Task;
}>();

const emits = defineEmits<{
  (event: 'onSave', task: Task): void;
  (event: 'onCancel'): void;
}>();

const formValid = ref(false);

const taskForm = ref({
  name: task?.name || '',
  description: task?.description || '',
  status: task?.statusId || '',
});

const createTask = () => {
  if (!formValid.value) return;

  const newTask: Task = {
    name: taskForm.value.name,
    description: taskForm.value.description,
    statusId: taskForm.value.status,
    createAt: new Date().toString(),
  };

  emits('onSave', newTask);
};

const handleCancel = () => {
  emits('onCancel');
};
</script>
