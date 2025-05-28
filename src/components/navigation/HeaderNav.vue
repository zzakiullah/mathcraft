<script setup lang="ts">
import { Icon } from "@iconify/vue";

import CustomButton from "@/components/inputs/CustomButton.vue";
import CustomLink from "@/components/inputs/CustomLink.vue";
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
          class="custom-transition-default text-2xl text-neutral-500 rounded-full hover:text-black"
        >
          <Icon icon="ion:logo-github" />
        </a>
        <CustomLink
          styles="text-neutral-500 text-sm px-2 py-1.5 rounded-full hover:text-black hover:underline"
          href="/login"
          ariaLabel="Go to login page"
        >
          Login
        </CustomLink>
        <CustomButton
          styles="border-2 rounded-full bg-blue-800 border-blue-800 text-white text-sm px-3.5 py-1.5 hover:bg-blue-700 hover:border-blue-700"
          href="/signup"
          ariaLabel="Go to sign-up page"
        >
          Sign up
        </CustomButton>
      </div>
    </nav>
  </header>
</template>
