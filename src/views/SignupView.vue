<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import AuthLayout from "@/layouts/AuthLayout.vue";
import CustomButton from "@/components/inputs/CustomButton.vue";
import CustomLink from "@/components/inputs/CustomLink.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import { signUpWithEmail, isUsernameUnique } from "@/lib/db/auth";

const username = ref("");
const email = ref("");
const password = ref("");

const usernameErrorMsg = ref("");
const emailErrorMsg = ref("");
const passwordErrorMsg = ref("");

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
  if (username.value === "") {
    usernameErrorMsg.value = "Username is required.";
    return;
  } else {
    usernameErrorMsg.value = "";
  }
  if (email.value === "") {
    emailErrorMsg.value = "Email is required.";
    return;
  } else {
    emailErrorMsg.value = "";
  }
  if (password.value === "") {
    passwordErrorMsg.value = "Password is required.";
    return;
  } else {
    passwordErrorMsg.value = "";
  }

  const isPasswordValid = validatePassword();
  if (!isPasswordValid) {
    passwordErrorMsg.value = "Password does not meet all requirements.";
    return;
  }

  const isValidUsername = isUsernameUnique(username.value);
  if (isValidUsername === null) {
    // An error occurred. Try again.
  } else if (!isValidUsername) {
    usernameErrorMsg.value = "This username is taken. Try another.";
    return;
  }

  const { data, error } = await signUpWithEmail(email.value, password.value, username.value);
  if (error) {
    switch (error.code) {
      case "email_address_invalid":
        emailErrorMsg.value = "Please enter a valid email address.";
        return;
      case "email_exists":
        emailErrorMsg.value = "This email is already being used.";
        return;
      case "weak_password":
        // User is signing up or changing their password without meeting the password strength criteria.
        // Use the AuthWeakPasswordError class to access more information about what they need to do to make the password pass.
        emailErrorMsg.value = "Password does not meet strength criteria.";
        return;
      default:
        console.log(error.code, error);
        return;
    }
  } else {
    console.log(data.session);
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
      <h1 class="font-bold text-3xl text-black text-center">Sign up</h1>
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
          class="text-sm text-black border rounded-lg px-4 py-2 placeholder:text-neutral-300"
          :class="usernameErrorMsg === '' ? 'border-neutral-300' : 'border-red-600'"
          type="text"
          placeholder="themathcrafter"
        />
        <div v-if="usernameErrorMsg" class="flex flex-row items-center gap-1 mt-0.5 text-red-600">
          <Icon icon="material-symbols:error-rounded" />
          <p class="text-xs">{{ usernameErrorMsg }}</p>
        </div>
      </div>
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
        <div v-if="emailErrorMsg" class="flex flex-row items-center gap-1 mt-0.5 text-red-600">
          <Icon icon="material-symbols:error-rounded" />
          <p class="text-xs">{{ emailErrorMsg }}</p>
        </div>
      </div>
      <div class="w-full flex flex-col gap-1">
        <label class="text-sm text-black" for="password"> Password </label>
        <input
          v-model="password"
          id="password"
          class="text-sm text-black border rounded-lg px-4 py-2 placeholder:text-neutral-300"
          :class="passwordErrorMsg === '' ? 'border-neutral-300' : 'border-red-600'"
          type="password"
          placeholder="••••••••"
          @focus="showPwConds = true"
          @input="validatePassword"
        />
        <div v-if="passwordErrorMsg" class="flex flex-row items-center gap-1 mt-0.5 text-red-600">
          <Icon icon="material-symbols:error-rounded" />
          <p class="text-xs">{{ passwordErrorMsg }}</p>
        </div>
      </div>
      <div v-if="showPwConds" class="w-full flex flex-col text-neutral-500">
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasUpper" icon="material-symbols:check-circle" class="text-green-700" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Uppercase letter</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasLower" icon="material-symbols:check-circle" class="text-green-700" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Lowercase letter</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon v-if="pwHasNum" icon="material-symbols:check-circle" class="text-green-700" />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Number letter</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon
            v-if="pwHasSpecialChar"
            icon="material-symbols:check-circle"
            class="text-green-700"
          />
          <Icon v-else icon="material-symbols:circle-outline" />
          <p class="text-sm">Special character (e.g. !?&lt;&gt;@#$%)</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon
            v-if="pwHasOver8Chars"
            icon="material-symbols:check-circle"
            class="text-green-700"
          />
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
      <CustomLink styles="text-black hover:underline" href="/login"> Login here </CustomLink>
    </p>
  </AuthLayout>
</template>
