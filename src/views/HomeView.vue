<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
  <main>
    <div class="heading-container">
      <h1 class="main-heading">Mathcraft</h1>
      <p class="main-subheading">An interactive math sandbox</p>
      <div class="main-btn-container">
        <button>Find a template</button>
        <button>Start from scratch</button>
      </div>
    </div>
  </main>
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
