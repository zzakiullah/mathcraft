<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CustomButton from "@/components/inputs/CustomButton.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <DefaultLayout>
    <main>
      <div class="heading-container">
        <h1 class="main-heading">Mathcraft</h1>
        <p class="main-subheading">An interactive math sandbox</p>
        <div class="main-btn-container">
          <CustomButton>
            Find a template
            <Icon icon="ion:arrow-forward" />
          </CustomButton>
          <CustomButton onclick="console.log('hello')">
            Start from scratch
            <Icon icon="ion:arrow-forward" />
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

.main-heading {
  font-size: 4.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 1;
}

.main-subheading {
  font-size: 1.25rem;
  text-align: center;
  line-height: 1;
}

.main-btn-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}
</style>
