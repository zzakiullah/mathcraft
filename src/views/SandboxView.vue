<script setup lang="ts">
import SandboxLayout from "@/layouts/SandboxLayout.vue";
import NoteBoard from "@/components/sandbox/NoteBoard.vue";
import GridCanvas from "@/components/sandbox/GridCanvas.vue";
</script>

<template>
  <SandboxLayout>
    <main class="z-0 w-screen h-screen pt-14">
      <div class="w-full h-full flex flex-row overflow-hidden">
        <NoteBoard />
        <GridCanvas />
      </div>
    </main>
  </SandboxLayout>
</template>
