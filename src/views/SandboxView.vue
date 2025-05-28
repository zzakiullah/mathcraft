<script setup lang="ts">
import SandboxLayout from "@/layouts/SandboxLayout.vue";
import { createGrid } from "@/lib/math/grid";

const canvas = document.getElementById("canvas-2d") as HTMLCanvasElement;
const context = canvas.getContext("2d");

createGrid(context!);
</script>

<template>
  <SandboxLayout>
    <div class="w-screen h-screen flex flex-row pt-14">
      <nav class="side-panel w-md border border-red-500"></nav>
      <main class="interactive-pane grow border border-red-500">
        <canvas id="canvas-2d"></canvas>
      </main>
    </div>
  </SandboxLayout>
</template>

<style scoped></style>
