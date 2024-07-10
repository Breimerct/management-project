<!-- src/components/Typography.vue -->
<template>
  <component
    :is="props.tag"
    :class="[`text-${props.variant}`, { 'font-weight-bold': props.bold }]"
    v-bind="attrs"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue';
import { TypographyVariant } from '../types';

interface Props {
  tag: string;
  variant: keyof typeof TypographyVariant;
  bold?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  variant: 'body-1',
  bold: false,
});

const attrs = computed(() => ({
  class: {
    [`text-${props.variant}`]: true,
    'font-weight-bold': props.bold,
  },
}));
</script>
../types/types ../types/type.
