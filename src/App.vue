<template>
  <v-app>
    <loading />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import Loading from './components/loading/Loading.vue';
</script>
