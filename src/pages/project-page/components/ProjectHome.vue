<template>
  <section class="project-home">
    <article>
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        src="@/assets/home-image.svg"
        width="100%"
        height="300"
        contain
      >
      </v-img>
      <Typography tag="h1" variant="h3" bold> Project Management </Typography>
    </article>
  </section>
</template>

<script lang="ts" setup>
import Typography from '@/components/Typography.vue';
</script>

<style lang="scss" scoped>
.project-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
