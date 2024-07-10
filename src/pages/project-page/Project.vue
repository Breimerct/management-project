<template>
  <v-row align="center" class="mb-2">
    <v-col cols="6">
      <v-autocomplete
        hide-details
        variant="outlined"
        color="primary"
        density="compact"
        label="Projects"
        placeholder="Select your project"
        v-model="id"
        :items="projects"
        item-title="name"
        return-object
      ></v-autocomplete>
    </v-col>
    <v-col cols="6" align="end">
      <NewProject />
    </v-col>
  </v-row>

  <ProjectHome v-if="!id" />

  <Board v-else />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { RootState } from '@/store';
import { Project } from '../../types';

// imports components
import ProjectHome from './components/ProjectHome.vue';
import Board from './components/Board.vue';
import NewProject from '../../components/new-project/NewProject.vue';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const $store = useStore<RootState>();

const id = computed<Project>({
  get: () => {
    const projectId = route.params.projectId;
    return projects.value.find(
      (project) => project.uid === projectId,
    ) as Project;
  },
  set: (value: Project) => {
    router.push(`/projects/${value.uid}`);
  },
});

const projects = computed<Project[]>(
  () => $store.getters['project/getProjects'],
);

onMounted(async () => {
  $store.dispatch('project/searchProjects');
});
</script>
