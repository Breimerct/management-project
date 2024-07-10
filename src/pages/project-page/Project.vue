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
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
      ></v-autocomplete>
    </v-col>
    <v-col cols="6" align="end">
      <v-btn color="primary">Create new project</v-btn>
    </v-col>
  </v-row>

  <ProjectHome v-if="!id" />

  <Board v-else />
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

// imports components
import ProjectHome from './components/ProjectHome.vue';
import Board from './components/Board.vue';

const route = useRoute();
const router = useRouter();

const id = computed({
  get: () => (route.params?.projectId || null) as string,
  set: (value: string) => {
    router.push(`/projects/${value}`);
  },
});

// const handleProjectChange = (id: string) => {
//   router.push(`/projects/${id}`);
// };
</script>
