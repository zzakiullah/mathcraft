<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import AuthLayout from "@/layouts/AuthLayout.vue";
import CustomButton from "@/components/inputs/CustomButton.vue";
import CustomLink from "@/components/inputs/CustomLink.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import { signUpWithEmail } from "@/lib/db/auth";

const email = ref("");
const password = ref("");
const username = ref("");

const showPwConds = ref(false);
const pwHasUpper = ref(false);
const pwHasLower = ref(false);
const pwHasNum = ref(false);
const pwHasSpecialChar = ref(false);
const pwHasOver8Chars = ref(false);

function validatePassword() {
  pwHasUpper.value = /[A-Z]/.test(password.value);
  pwHasLower.value = /[a-z]/.test(password.value);
  pwHasNum.value = /[0-9]/.test(password.value);
  pwHasSpecialChar.value = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value);
  pwHasOver8Chars.value = password.value.length >= 8;
  return (
    pwHasUpper.value &&
    pwHasLower.value &&
    pwHasNum.value &&
    pwHasSpecialChar.value &&
    pwHasOver8Chars.value
  );
}

async function onSubmit() {
  const isPasswordValid = validatePassword();
  if (isPasswordValid) {
    const { data, error } = await signUpWithEmail(email.value, password.value, username.value);
    if (error) {
      console.log(error);
      switch (error.code) {
        case "email_address_invalid":
          break;
        case "email_exists":
          break;
        default:
          break;
      }
    } else {
      console.log(data.session);
    }
  } else {
  }
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
      <h1 class="heading text-3xl text-black text-center">Sign up</h1>
      <p class="text-sm text-neutral-500 text-center">
        Create, save, and publish custom math lessons for free
      </p>
    </div>
    <form
      class="w-full flex flex-col items-center justify-center gap-3 mt-2"
      @submit.prevent="onSubmit"
    >
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="username"> Username </label>
        <input
          v-model="username"
          id="username"
          class="text-sm text-black border border-neutral-300 rounded-lg px-4 py-2 placeholder:text-neutral-300"
          type="text"
          placeholder="themathcrafter"
        />
      </div>
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="email"> Email </label>
        <input
          v-model="email"
          id="email"
          class="text-sm text-black border border-neutral-300 rounded-lg px-4 py-2 placeholder:text-neutral-300"
          type="email"
          placeholder="themathcrafter@example.com"
        />
      </div>
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="password"> Password </label>
        <input
          v-model="password"
          id="password"
          class="text-sm text-black border border-neutral-300 rounded-lg px-4 py-2 placeholder:text-neutral-300"
          type="password"
          placeholder="••••••••"
          @focus="showPwConds = true"
          @input="validatePassword"
        />
      </div>
      <div v-if="showPwConds" class="w-full flex flex-col text-neutral-500">
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasUpper" icon="material-symbols:check-circle" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Uppercase letter</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasLower" icon="material-symbols:check-circle" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Lowercase letter</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasNum" icon="material-symbols:check-circle" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Number letter</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasSpecialChar" icon="material-symbols:check-circle" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Special character (e.g. !?&lt;&gt;@#$%)</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasOver8Chars" icon="material-symbols:check-circle" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">8 characters or more</p>
        </div>
      </div>
      <CustomButton
        styles="w-full bg-black text-white text-sm px-5 py-2 mt-2 rounded-lg hover:bg-neutral-700"
        type="submit"
      >
        Create Account
      </CustomButton>
    </form>
    <div class="w-full flex flex-row items-center justify-center gap-2 text-neutral-400 text-sm">
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
      Already have an account?&nbsp;
      <CustomLink styles="text-black hover:text-neutral-100 hover:underline" href="/login">
        Login here
      </CustomLink>
    </p>
  </AuthLayout>
</template>

<style scoped>
.heading {
  font-weight: 700;
}
</style>
