<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  styles?: string;
  href?: string;
  isExternal?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}>();
</script>

<template>
  <RouterLink
    v-if="href && !isExternal"
    :class="`custom-btn custom-transition-default border-2 rounded-full ${styles}`"
    :to="href"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </RouterLink>
  <a
    v-else-if="href"
    :class="`custom-btn custom-transition-default border-2 rounded-full ${styles}`"
    :href="href"
    :target="isExternal ? '_blank' : '_self'"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </a>
  <button
    v-else
    :class="`custom-btn custom-transition-default border-2 rounded-full ${styles}`"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.custom-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
}
</style>
