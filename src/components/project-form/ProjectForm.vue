<template>
  <v-form v-model="formValid" @submit.prevent="createProject">
    <v-card-text class="d-flex flex-column ga-4">
      <v-text-field
        v-model="projectForm.name"
        label="Project Name"
        variant="outlined"
        color="primary"
        :rules="NAME_RULES"
        dense
        required
      ></v-text-field>

      <v-textarea
        v-model="projectForm.description"
        label="Description"
        variant="outlined"
        color="primary"
        :rules="DESCRIPTION_RULES"
        dense
        required
      ></v-textarea>

      <v-switch
        v-model="projectForm.status"
        hide-details
        label="Active Project"
        color="primary"
        false-value="inactive"
        true-value="active"
      ></v-switch>
    </v-card-text>

    <v-card-actions>
      <v-btn variant="outlined" color="primary" type="submit"> save </v-btn>
      <v-btn @click="handleCancel" variant="tonal" color="error">Cancel</v-btn>

      <v-spacer></v-spacer>

      <DialogConfirm
        v-if="!!project && project?.uid"
        title="Delete Project"
        message="Are you sure you want to delete the project? if you delete it the tasks assigned to it will also be deleted."
        buttonColor="error"
        buttonText="Delete"
        buttonSize="default"
        buttonVariant="tonal"
        @onConfirm="handleDeleteProject"
      />
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { NAME_RULES, DESCRIPTION_RULES } from '../../constanst';
import { Project } from '../../types';
import { RootState } from '../../store';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// components imports
import DialogConfirm from '../dialog-confirm/DialogConfirm.vue';

const $store = useStore<RootState>();
const router = useRouter();

const { project } = defineProps<{
  project?: Project;
}>();

const emits = defineEmits<{
  (event: 'onSave', project: Project): void;
  (event: 'onCancel'): void;
}>();

const formValid = ref(false);
const projectForm = ref({
  name: project?.name || '',
  description: project?.description || '',
  status: project?.status || 'inactive',
});

const createProject = () => {
  if (!formValid.value) return;

  const newProject: Project = {
    name: projectForm.value.name,
    description: projectForm.value.description,
    status: projectForm.value.status,
    createAt: new Date(),
  };

  emits('onSave', { ...project, ...newProject });
};

const handleDeleteProject = () => {
  $store.dispatch('project/deleteProject', project?.uid).then(() => {
    router.push({ name: 'project' });
    emits('onCancel');
  });
};

const handleCancel = () => {
  emits('onCancel');
};
</script>
