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
import { useStore } from 'vuex';
import { RootState } from '../../store';

// Components import
import DialogContent from '../../components/dialog-content/DialogContent.vue';
import ProjectForm from '../../components/project-form/ProjectForm.vue';

const $store = useStore<RootState>();

defineProps<{
  project: Project;
}>();

const saveEditProject = (project: Project, callback: () => void) => {
  $store.dispatch('project/updateProject', project).then(() => {
    callback();
  });
};
</script>
