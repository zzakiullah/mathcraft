<script setup lang="ts">
import { Icon } from "@iconify/vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CustomButton from "@/components/inputs/CustomButton.vue";
</script>

<template>
  <DefaultLayout>
    <main>
      <div class="heading-container">
        <h1 class="text-7xl text-center font-semibold leading-none">Learn by playing</h1>
        <p class="text-xl text-center leading-none">Make math fun with our interactive sandbox</p>
        <div class="main-btn-container">
          <CustomButton
            styles="border-2 rounded-full bg-blue-800 border-blue-800 text-white px-4 py-3 hover:bg-blue-700 hover:border-blue-700"
            ariaLabel="Scroll down to browse templates"
          >
            Find a template
            <Icon icon="ion:arrow-forward" class="right-to-down-arrow custom-transition-default" />
          </CustomButton>
          <CustomButton
            styles="border-2 rounded-full bg-transparent border-blue-800 text-blue-800 px-4 py-3 hover:bg-blue-100"
            href="/sandbox"
            ariaLabel="Start interactive sandbox"
          >
            Start from scratch
            <Icon icon="ion:arrow-forward" class="right-bobbing-arrow custom-transition-default" />
          </CustomButton>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped>
main {
  width: 100%;
}

.heading-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.main-btn-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
