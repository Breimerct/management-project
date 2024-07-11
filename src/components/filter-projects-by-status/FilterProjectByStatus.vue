<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" color="primary" size="small">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-list class="pa-4 px-6">
      <Typography variant="body-1" bold class="mb-4"
        >Filter by Status</Typography
      >
      <v-radio-group v-model="projectStatus">
        <v-radio
          v-for="status in statusOptions"
          :key="status.value"
          :label="status.label"
          :value="status.value"
          color="primary"
        >
        </v-radio>
      </v-radio-group>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const emits = defineEmits<{
  (event: 'statusSelected', status: string): void;
}>();

const statusSelected = ref('all');
const projectStatus = computed<string>({
  get: () => statusSelected.value,
  set: (value: string) => {
    statusSelected.value = value;
    emits('statusSelected', value);
  },
});

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];
</script>
