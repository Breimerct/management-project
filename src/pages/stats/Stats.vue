<template>
  <v-container class="mb-16">
    <BarChart :data="data" />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { RootState } from '../../store';
import { useRoute } from 'vue-router';
import { STATUS_TASKS } from '../../constanst';

// components import
import BarChart from '../../components/bar-chart/BarChart.vue';

const $store = useStore<RootState>();
const route = useRoute();

const projectId = computed(() => route.params?.projectId);

const countTasksByStatus = (data: Record<string, Record<string, any>>) => {
  const result: { name: string; quantity: number }[] = [];

  STATUS_TASKS.forEach((status) => {
    result.push({ name: status.name, quantity: 0 });
  });

  for (const status in data) {
    const tasks = data[status];
    const quantity = Object.keys(tasks).length;

    const statusIndex = result.findIndex(
      (item) => item.name.toLowerCase().replace(/ /g, '-') === status,
    );
    if (statusIndex !== -1) {
      result[statusIndex].quantity = quantity;
    }
  }

  return result;
};

const data = computed(() => {
  const tasks = $store.getters['task/getTasks'];
  return countTasksByStatus(tasks);
});

onMounted(() => {
  $store.dispatch('task/searchTask', { projectId: projectId.value });
});
</script>
