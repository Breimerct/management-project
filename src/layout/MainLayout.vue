<template>
  <v-layout>
    <v-navigation-drawer permanent expand-on-hover rail>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          exact
          prepend-icon="mdi-home-city"
          color="primary"
          title="Home"
          value="home"
          to="/projects"
        />
      </v-list>

      <template v-slot:append>
        <v-list density="compact">
          <v-list-item prepend-icon="mdi-logout" title="logout" />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main class="h-screen pa-6 pl-16">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>
