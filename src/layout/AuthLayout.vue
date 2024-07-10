import { RouterView } from 'vue-router';
<template>
  <v-layout>
    <v-row align="center">
      <v-col cols="12" align="center">
        <v-card class="text-left pa-4" variant="tonal" max-width="450">
          <RouterView />
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>
