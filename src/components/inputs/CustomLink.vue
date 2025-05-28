<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  styles?: string;
  href: string;
  isExternal?: boolean;
  ariaLabel?: string;
}>();
</script>

<template>
  <a
    v-if="isExternal"
    :class="`custom-link custom-transition-default ${styles}`"
    :href="href"
    :target="isExternal ? '_blank' : '_self'"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </a>
  <RouterLink
    v-else
    :class="`custom-link custom-transition-default ${styles}`"
    :to="href"
    :aria-label="ariaLabel"
  >
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
