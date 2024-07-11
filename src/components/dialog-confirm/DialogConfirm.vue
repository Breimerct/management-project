<template>
  <DialogContent>
    <template #dialog-button="{ showDialog }">
      <v-btn @click="showDialog" icon size="x-small" :color="buttonColor">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>

    <template #dialog-body="{ hideDialog }">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>

      <v-card-actions>
        <v-btn @click="handleConfirm(hideDialog)" :color="buttonConfirmColor">
          {{ buttonConfirmText }}
        </v-btn>
        <v-btn @click="handleCancel(hideDialog)" :color="buttonCancelColor">
          {{ buttonCancelText }}
        </v-btn>
      </v-card-actions>
    </template>
  </DialogContent>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';

// Components imports
import DialogContent from '../dialog-content/DialogContent.vue';

withDefaults(
  defineProps<{
    title: string;
    message: string;
    icon: string;
    buttonColor: string;
    buttonConfirmText: string;
    buttonConfirmColor: string;
    buttonCancelText: string;
    buttonCancelColor: string;
  }>(),
  {
    buttonColor: 'primary',
    buttonConfirmText: 'Confirm',
    buttonConfirmColor: 'success',
    buttonCancelText: 'Cancel',
    buttonCancelColor: 'error',
  },
);

const emits = defineEmits(['onConfirm', 'onCancel']);

const handleConfirm = (callback: () => void) => {
  emits('onConfirm');
  callback();
};

const handleCancel = (callback: () => void) => {
  callback();
  emits('onCancel');
};
</script>
