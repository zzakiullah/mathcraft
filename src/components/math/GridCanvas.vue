<script setup lang="ts">
import { onUnmounted, onMounted, ref, useTemplateRef } from "vue";
import { GesturePlugin } from "@vueuse/gesture";

import { clearGrid, createGrid } from "@/lib/math/grid";

const container = useTemplateRef("main-container");
const canvas = useTemplateRef("canvas-2d");

const context = ref<CanvasRenderingContext2D>();
const width = ref(100);
const height = ref(100);
const majorGridSize = ref(100);
const minorGridSize = ref(25);

onMounted(() => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

  context.value = canvas.value!.getContext("2d")!;
  createGrid(context.value, width.value, height.value);

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

  clearGrid(context.value!, width.value, height.value);
  createGrid(context.value!, width.value, height.value);
};

const onMouseWheel = (event: WheelEvent) => {
  event.preventDefault();
  // Scroll up
  if (event.deltaY < 0) {
  }
  // Scroll down
  else {
  }
  console.log(event.deltaY);
};
</script>

<template>
  <div ref="main-container" class="interactive-pane grow overflow-hidden">
    <canvas ref="canvas-2d" @wheel="onMouseWheel"></canvas>
  </div>
</template>
