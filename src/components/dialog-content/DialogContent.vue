<template>
  <v-dialog max-width="500" v-model="isActive">
    <template v-slot:activator>
      <slot name="dialog-button" :showDialog="handleShowDialog"></slot>
    </template>

    <template v-slot:default>
      <v-card :title="title" class="pa-4">
        <slot name="dialog-body" :hideDialog="hideDialog"></slot>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

defineProps({
  title: String,
  buttonText: String,
});

const isActive = ref(false);

const handleShowDialog = () => {
  isActive.value = true;
};

const hideDialog = () => {
  isActive.value = false;
};
</script>
