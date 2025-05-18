<script setup lang="ts">
import SandboxLayout from "@/layouts/SandboxLayout.vue";
</script>

<template>
  <SandboxLayout>
    <div class="w-screen h-screen flex flex-row pt-14">
      <nav class="side-panel w-md border border-red-500"></nav>
      <main class="interactive-pane grow border border-red-500">
        <canvas> </canvas>
      </main>
    </div>
  </SandboxLayout>
</template>

<style scoped></style>
