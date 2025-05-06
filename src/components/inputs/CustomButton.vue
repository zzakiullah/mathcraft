<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  href?: string;
  isExternal?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}>();
</script>

<template>
  <RouterLink v-if="href && !isExternal" class="custom-btn" :to="href" :aria-label="ariaLabel">
    <slot></slot>
  </RouterLink>
  <a
    v-else-if="href"
    class="custom-btn"
    :href="href"
    :target="isExternal ? '_blank' : '_self'"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </a>
  <button v-else class="custom-btn" :aria-label="ariaLabel" @click="onClick">
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
