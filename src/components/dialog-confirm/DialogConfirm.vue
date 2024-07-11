<template>
  <DialogContent>
    <template #dialog-button="{ showDialog }">
      <v-btn
        @click="showDialog"
        :icon="!!icon"
        :size="buttonSize"
        :color="buttonColor"
        :variant="buttonVariant"
      >
        <v-icon v-if="!!icon">{{ icon }}</v-icon>
        {{ buttonText }}
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
    title?: string;
    message?: string;
    icon?: string;
    buttonColor?: string;
    buttonText?: string;
    buttonSize?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
    buttonVariant?:
      | 'flat'
      | 'text'
      | 'elevated'
      | 'tonal'
      | 'outlined'
      | 'plain';
    buttonConfirmText?: string;
    buttonConfirmColor?: string;
    buttonCancelText?: string;
    buttonCancelColor?: string;
  }>(),
  {
    buttonColor: 'primary',
    buttonSize: 'x-small',
    buttonVariant: 'text',
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
