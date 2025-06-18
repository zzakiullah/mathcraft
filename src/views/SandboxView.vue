<script setup lang="ts">
import SandboxLayout from "@/layouts/SandboxLayout.vue";
import NoteBoard from "@/components/inputs/NoteBoard.vue";
import GridCanvas from "@/components/math/GridCanvas.vue";
</script>

<template>
  <SandboxLayout>
    <main class="w-screen h-screen flex flex-row pt-14">
      <NoteBoard />
      <GridCanvas />
    </main>
  </SandboxLayout>
</template>
