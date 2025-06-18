<script setup lang="ts">
import SandboxLayout from "@/layouts/SandboxLayout.vue";
import GridCanvas from "@/components/math/GridCanvas.vue";
</script>

<template>
  <SandboxLayout>
    <main class="w-screen h-screen flex flex-row pt-14">
      <div class="side-panel w-md border border-red-500"></div>
      <GridCanvas />
    </main>
  </SandboxLayout>
</template>
