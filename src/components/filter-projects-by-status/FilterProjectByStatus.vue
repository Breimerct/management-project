<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        color="primary"
        size="small"
        :disabled="disabled"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-list class="pa-4 px-6">
      <Typography tag="p" variant="body-1" bold class="mb-4"
        >Filter by Status</Typography
      >
      <v-radio-group v-model="projectStatus">
        <v-radio
          v-for="status in STATUS_OPTIONS"
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
import { defineEmits } from 'vue';
import { STATUS_OPTIONS } from '../../constanst';

// components imports
import Typography from '../Typography.vue';

defineProps<{
  disabled: boolean;
}>();

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
</script>
