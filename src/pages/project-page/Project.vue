<template>
  <v-row align="center" class="mb-2">
    <v-col cols="6" class="d-flex ga-2">
      <v-autocomplete
        hide-details
        variant="outlined"
        color="primary"
        density="compact"
        label="Projects"
        placeholder="Select your project"
        v-model="projectSelected"
        :items="projects"
        item-title="name"
        :disabled="disableFilters"
        return-object
      ></v-autocomplete>

      <FilterProjectByStatus
        :disabled="disableFilters"
        @statusSelected="statusProjectFilter = $event"
      />
    </v-col>
    <v-col cols="6" align="end">
      <div class="d-flex ga-2 justify-end">
        <NewProject />
        <EditProject v-if="projectSelected?.uid" :project="project" />
      </div>
    </v-col>
  </v-row>

  <RouterView />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';
import { Project } from '../../types';
import { RootState } from '../../store';
import { useStore } from 'vuex';

// imports components
import FilterProjectByStatus from '../../components/filter-projects-by-status/FilterProjectByStatus.vue';
import NewProject from '../../components/new-project/NewProject.vue';
import EditProject from '../../components/edit-project/EditProject.vue';

const route = useRoute();
const router = useRouter();
const $store = useStore<RootState>();

const statusProjectFilter = ref('all');
const projectSelected = computed<Project>({
  get: () => {
    const projectId = route.params.projectId;
    return projects.value.find(
      (project) => project.uid === projectId,
    ) as Project;
  },
  set: (value: Project) => {
    const routeName = route.name === 'project' ? 'projectBoard' : route?.name;
    router.push({ name: routeName || '', params: { projectId: value.uid } });
    $store.dispatch('task/searchTask', { projectId: value.uid });
  },
});

const disableFilters = computed<boolean>(() => route.name === 'projectStats');

const projects = computed<Project[]>(
  () =>
    $store.getters['project/getProjects'].filter((project: Project) => {
      if (statusProjectFilter.value === 'all') return true;
      return project.status === statusProjectFilter.value;
    }) as Project[],
);

const project = computed<Project>(() => {
  if (!projectSelected.value || !projects.value.length) return {} as Project;

  return (
    projects.value.find(
      (project) => project.uid === projectSelected.value.uid,
    ) || ({} as Project)
  );
});

onMounted(async () => {
  $store.dispatch('project/searchProjects');
});
</script>
