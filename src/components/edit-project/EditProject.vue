<template>
  <DialogContent buttonText="new project">
    <template #dialog-button="{ showDialog }">
      <v-btn color="secondary" @click="showDialog">
        Edit Project

        <template v-slot:prepend>
          <v-icon> mdi-pencil </v-icon>
        </template>
      </v-btn>
    </template>

    <template #dialog-body="{ hideDialog }">
      <ProjectForm
        :project="project"
        @onCancel="hideDialog"
        @onSave="saveEditProject($event, hideDialog)"
      />
    </template>
  </DialogContent>
</template>

<script lang="ts" setup>
import { Project } from '../../types';

// Components import
import DialogContent from '../../components/dialog-content/DialogContent.vue';
import ProjectForm from '../../components/project-form/ProjectForm.vue';

defineProps<{
  project: Project;
}>();

const saveEditProject = (project: Project, callback: () => void) => {
  console.log(project);
  callback();
};
</script>
