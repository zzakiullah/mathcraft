<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  href: string;
  isExternal?: boolean;
}>();
</script>

<template>
  <a v-if="isExternal" class="custom-link" :href="href" :target="isExternal ? '_blank' : '_self'">
    <slot></slot>
  </a>
  <RouterLink v-else class="custom-link" :to="href">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
.custom-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
