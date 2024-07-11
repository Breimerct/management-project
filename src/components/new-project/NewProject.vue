<template>
  <DialogContent buttonText="new project">
    <template #dialog-button="{ showDialog }">
      <v-btn color="primary" @click="showDialog">
        New Project
        <template v-slot:prepend>
          <v-icon> mdi-plus-circle-outline </v-icon>
        </template>
      </v-btn>
    </template>

    <template #dialog-body="{ hideDialog }">
      <ProjectForm
        @onCancel="hideDialog"
        @onSave="createProject($event, hideDialog)"
      />
    </template>
  </DialogContent>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { RootState } from '../../store';
import { Project } from '../../types';

// components imports
import DialogContent from '../dialog-content/DialogContent.vue';
import ProjectForm from '../project-form/ProjectForm.vue';

const $store = useStore<RootState>();

const createProject = (project: Project, cb: () => void) => {
  $store.dispatch('project/createProject', project).then(() => {
    cb();
  });
};
</script>
