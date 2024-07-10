<template>
  <DialogContent buttonText="new project">
    <template #dialog-button="{ showDialog }">
      <v-btn color="primary" @click="showDialog">New Project</v-btn>
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
import { RootState } from '@/store';
import { Project } from '../../types';

// components imports
import DialogContent from '../dialog-content/DialogContent.vue';

const $store = useStore<RootState>();

const createProject = (project: Project, cb: () => void) => {
  $store.dispatch('project/createProject', project).then(() => {
    cb();
  });
};
</script>
