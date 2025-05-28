<script setup lang="ts">
import { Icon } from "@iconify/vue";

import AuthLayout from "@/layouts/AuthLayout.vue";
import CustomButton from "@/components/inputs/CustomButton.vue";
import CustomLink from "@/components/inputs/CustomLink.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
</script>

<template>
  <AuthLayout>
    <div class="w-full flex flex-row items-center justify-start">
      <CustomLink styles="text-sm text-neutral-400 hover:underline" href="/">
        <Icon icon="ion:arrow-back" /> Back to home
      </CustomLink>
    </div>
    <div class="flex flex-col items-center justify-center gap-1">
      <h1 class="heading text-3xl text-black text-center">Login</h1>
      <p class="text-sm text-neutral-400 text-center">Welcome back</p>
    </div>
    <form class="w-full flex flex-col items-center justify-center gap-3 mt-2">
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="email">
          Email <span class="text-red-600">*</span></label
        >
        <input
          id="email"
          class="text-sm text-black border border-neutral-300 rounded-lg px-4 py-2 placeholder:text-neutral-300"
          type="email"
          placeholder="themathcrafter@example.com"
        />
      </div>
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="password">
          Password <span class="text-red-600">*</span>
        </label>
        <input
          id="password"
          class="text-sm text-black border border-neutral-300 rounded-lg px-4 py-2 placeholder:text-neutral-300"
          type="password"
          placeholder="••••••••"
        />
      </div>
      <CustomButton
        styles="w-full bg-black text-white text-sm px-5 py-2 mt-2 rounded-lg hover:bg-neutral-700"
        type="submit"
      >
        Login
      </CustomButton>
    </form>
    <div class="w-full flex flex-row items-center justify-center gap-2 text-neutral-300 text-sm">
      <div class="grow border-t border-neutral-300 h-0"></div>
      or
      <div class="grow border-t border-neutral-300 h-0"></div>
    </div>
    <CustomButton
      styles="w-full text-black text-sm px-5 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100"
    >
      <IconGoogle styles="w-auto h-4" /> Continue with Google
    </CustomButton>
    <p class="inline-flex text-neutral-500 text-sm">
      Don&apos;t have an account?&nbsp;
      <CustomLink styles="text-black hover:underline" href="/signup"> Sign up here </CustomLink>
    </p>
  </AuthLayout>
</template>

<style scoped>
.heading {
  font-weight: 700;
}
</style>
