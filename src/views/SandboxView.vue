<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

import SandboxLayout from "@/layouts/SandboxLayout.vue";
import { createGrid } from "@/lib/math/grid";

const container = useTemplateRef("main-container");
const canvas = useTemplateRef("canvas-2d");

const width = ref(100);
const height = ref(100);

onMounted(() => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

  const context = canvas.value!.getContext("2d");
  createGrid(context!, width.value, height.value);
});
</script>

<template>
  <SandboxLayout>
    <div class="w-screen h-screen flex flex-row pt-14">
      <nav class="side-panel w-md border border-red-500"></nav>
      <main ref="main-container" class="interactive-pane grow">
        <canvas ref="canvas-2d"></canvas>
      </main>
    </div>
  </SandboxLayout>
</template>

<style scoped>
canvas {
  shape-rendering: crispEdges;
}
</style>
