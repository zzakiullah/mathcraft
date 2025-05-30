<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import AuthLayout from "@/layouts/AuthLayout.vue";
import CustomButton from "@/components/inputs/CustomButton.vue";
import CustomLink from "@/components/inputs/CustomLink.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import { signInWithEmail } from "@/lib/db/auth";

const loading = ref(false);
const generalErrorMsg = ref("");
const showPassword = ref(false);

const email = ref("");
const password = ref("");

const emailErrorMsg = ref("");
const passwordErrorMsg = ref("");

async function onSubmit() {
  loading.value = true;
  generalErrorMsg.value = "";

  if (email.value === "") {
    emailErrorMsg.value = "Email is required.";
    loading.value = false;
    return;
  } else {
    emailErrorMsg.value = "";
  }
  if (password.value === "") {
    passwordErrorMsg.value = "Password is required.";
    loading.value = false;
    return;
  } else {
    passwordErrorMsg.value = "";
  }

  const { error } = await signInWithEmail(email.value, password.value);
  if (error) {
    switch (error.code) {
      case "invalid_credentials":
        generalErrorMsg.value = "Incorrect email or password. Please try again.";
        break;
      case "email_address_invalid":
        emailErrorMsg.value = "Please enter a valid email address.";
        break;
      case "email_not_confirmed":
        emailErrorMsg.value = "Email address must be confirmed before signing in.";
        break;
      default:
        generalErrorMsg.value =
          "An unexpected error occurred. Please try again later. Apologies for the inconvenience.";
        break;
    }
  }
  loading.value = false;
}
</script>

<template>
  <AuthLayout>
    <div class="w-full flex flex-row items-center justify-start">
      <CustomLink styles="text-sm text-neutral-400 hover:underline" href="/">
        <Icon icon="ion:arrow-back" /> Back to home
      </CustomLink>
    </div>
    <div class="flex flex-col items-center justify-center gap-1">
      <h1 class="font-bold text-3xl text-black text-center">Login</h1>
      <p class="text-sm text-neutral-500 text-center">Welcome back</p>
    </div>
    <div
      v-if="generalErrorMsg"
      class="flex flex-row gap-3 px-5 py-3 bg-red-100 border border-red-400 rounded-lg"
    >
      <div class="text-xl">
        <Icon icon="material-symbols:error-rounded" />
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-black text-sm font-medium">Whoops! Something went wrong</p>
        <p class="text-neutral-500 text-xs">
          {{ generalErrorMsg }}
        </p>
      </div>
    </div>
    <form
      class="w-full flex flex-col items-center justify-center gap-3 mt-2"
      @submit.prevent="onSubmit"
    >
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="email"> Email </label>
        <input
          v-model="email"
          id="email"
          class="text-sm text-black border rounded-lg px-4 py-2 placeholder:text-neutral-300"
          :class="emailErrorMsg === '' ? 'border-neutral-300' : 'border-red-600'"
          type="email"
          placeholder="themathcrafter@example.com"
        />
        <div v-if="emailErrorMsg" class="flex flex-row items-start gap-1 mt-0.5 text-red-600">
          <Icon icon="material-symbols:error-rounded" />
          <p class="text-xs">{{ emailErrorMsg }}</p>
        </div>
      </div>
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="password"> Password </label>
        <div class="w-full relative">
          <input
            v-model="password"
            id="password"
            class="w-full text-sm text-black border rounded-lg pl-4 pr-10 py-2 placeholder:text-neutral-300"
            :class="passwordErrorMsg === '' ? 'border-neutral-300' : 'border-red-600'"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
          />
          <CustomButton
            styles="absolute top-0 bottom-0 right-0 flex flex-row items-center justify-center px-3 py-2 text-neutral-500"
            ariaLabel="Toggle show/hide password"
            :onClick="() => (showPassword = !showPassword)"
          >
            <Icon v-show="showPassword" icon="ion:eye-off" />
            <Icon v-show="!showPassword" icon="ion:eye" />
          </CustomButton>
        </div>
        <div v-if="passwordErrorMsg" class="flex flex-row items-start gap-1 mt-0.5 text-red-600">
          <Icon icon="material-symbols:error-rounded" />
          <p class="text-xs">{{ passwordErrorMsg }}</p>
        </div>
      </div>
      <CustomButton
        :styles="`w-full bg-black text-white text-sm px-5 py-2 mt-2 rounded-lg hover:bg-neutral-700 ${loading ? 'opacity-50' : 'opacity-100'}`"
        type="submit"
        :disabled="loading"
      >
        <Icon v-if="loading" icon="svg-spinners:ring-resize" class="mr-0.5" />
        Login
      </CustomButton>
    </form>
    <div class="w-full flex flex-row items-center justify-center gap-2 text-neutral-300 text-sm">
      <div class="grow border-t border-neutral-300 h-0"></div>
      or
      <div class="grow border-t border-neutral-300 h-0"></div>
    </div>
    <CustomButton
      :styles="`w-full text-black text-sm px-5 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 ${loading ? 'opacity-50' : 'opacity-100'}`"
      :disabled="loading"
    >
      <IconGoogle styles="w-auto h-4" /> Continue with Google
    </CustomButton>
    <p class="inline-flex text-neutral-500 text-sm">
      Don&apos;t have an account?&nbsp;
      <CustomLink styles="text-black hover:underline" href="/signup"> Sign up here </CustomLink>
    </p>
  </AuthLayout>
</template>
