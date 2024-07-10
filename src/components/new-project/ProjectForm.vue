<template>
  <v-form v-model="formValid" @submit.prevent="createProject">
    <v-card-text class="d-flex flex-column ga-4">
      <v-text-field
        v-model="project.name"
        label="Project Name"
        variant="outlined"
        color="primary"
        :rules="NAME_RULES"
        dense
        required
      ></v-text-field>

      <v-textarea
        v-model="project.description"
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
import { ref, defineEmits } from 'vue';
import { NAME_RULES, DESCRIPTION_RULES } from '../../constanst';
import { Project } from '../../types';

const emits = defineEmits<{
  (event: 'onSave', project: Project): void;
  (event: 'onCancel'): void;
}>();

const formValid = ref(false);
const project = ref({
  name: '',
  description: '',
});

const createProject = () => {
  if (!formValid.value) return;

  const newProject: Project = {
    name: project.value.name,
    description: project.value.description,
    createAt: new Date(),
  };

  emits('onSave', newProject);
};

const handleCancel = () => {
  emits('onCancel');
};
</script>
