<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const { theme = "primary", variant = "contained" } = defineProps<{
  theme?: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary";
  variant?: "contained" | "outlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  href?: string;
  isExternal?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}>();

const brandColors = {
  primary: "brand-darkest-blue",
  secondary: "brand-darker-blue",
  tertiary: "brand-blue",
  quaternary: "brand-darkest-green",
  quinary: "brand-green",
};

const neutralColors = {
  primary: "white",
  secondary: "white",
  tertiary: "white",
  quaternary: "neutral-800",
  quinary: "neutral-800",
};

const bgColor = ref<string>(variant === "contained" ? brandColors[theme] : "transparent");
const textColor = ref<string>(variant === "contained" ? neutralColors[theme] : brandColors[theme]);
const border = ref<string>(brandColors[theme]);
</script>

<template>
  <RouterLink
    v-if="href && !isExternal"
    :class="`custom-btn custom-transition-default border-2 rounded-full bg-${bgColor} text-${textColor} border-${border}`"
    :to="href"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </RouterLink>
  <a
    v-else-if="href"
    :class="`custom-btn custom-transition-default border-2 rounded-full bg-${bgColor} text-${textColor} border-${border}`"
    :href="href"
    :target="isExternal ? '_blank' : '_self'"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </a>
  <button
    v-else
    :class="`custom-btn custom-transition-default border-2 rounded-full bg-${bgColor} text-${textColor} border-${border}`"
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
