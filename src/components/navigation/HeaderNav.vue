<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-14 px-24 py-4 border-b border-neutral-200">
    <nav class="w-full h-full flex flex-row items-center justify-between">
      <a href="/" aria-label="Go to home page"> Mathcraft </a>
      <div class="flex flex-row items-center gap-2">
        <a
          href="https://github.com/zzakiullah/mathcraft"
          target="_blank"
          aria-label="View GitHub repository"
          class="custom-transition-default text-2xl text-neutral-500 hover:text-black"
        >
          <Icon icon="ion:logo-github" />
        </a>
      </div>
    </nav>
  </header>
</template>
