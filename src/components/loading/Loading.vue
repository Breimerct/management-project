<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EventBus from '../../plugins/eventBus';

const overlay = ref(false);

onMounted(() => {
  EventBus.on('loading', (show: boolean) => {
    overlay.value = show;
  });
});
</script>
