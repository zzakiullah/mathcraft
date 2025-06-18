<script setup lang="ts">
import { onUnmounted, onMounted, ref, useTemplateRef } from "vue";
import { useGesture } from "@vueuse/gesture";

import { clearGrid, createGrid } from "@/lib/math/grid";

const MAJOR_DIVISON_INCREMENT = 20;
const MINOR_DIVISIONS = 5;
const MAJOR_DIVISION_SCALE = 2;
const INITIAL_MAJOR_DIVISION_SIZE = 100;
const INITIAL_MINOR_DIVISION_SIZE = INITIAL_MAJOR_DIVISION_SIZE / MINOR_DIVISIONS;

const container = useTemplateRef("main-container");
const canvas = useTemplateRef("canvas-2d");

const context = ref<CanvasRenderingContext2D>();
const width = ref(100);
const height = ref(100);
const majorGridSize = ref(INITIAL_MAJOR_DIVISION_SIZE);
const minorGridSize = ref(INITIAL_MINOR_DIVISION_SIZE);
const xAxisIncrement = ref(2);
const yAxisIncrement = ref(2);
const xOriginOffset = ref(0);
const yOriginOffset = ref(0);

onMounted(() => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

  context.value = canvas.value!.getContext("2d")!;
  createGrid(
    context.value,
    width.value,
    height.value,
    majorGridSize.value,
    minorGridSize.value,
    xAxisIncrement.value,
    yAxisIncrement.value,
    xOriginOffset.value,
    yOriginOffset.value,
  );

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const repaintGrid = () => {
  clearGrid(context.value!, width.value, height.value);
  createGrid(
    context.value!,
    width.value,
    height.value,
    majorGridSize.value,
    minorGridSize.value,
    xAxisIncrement.value,
    yAxisIncrement.value,
    xOriginOffset.value,
    yOriginOffset.value,
  );
};

const zoomIn = () => {
  majorGridSize.value = majorGridSize.value + MAJOR_DIVISON_INCREMENT;
  minorGridSize.value = majorGridSize.value / MINOR_DIVISIONS;
  if (majorGridSize.value >= INITIAL_MAJOR_DIVISION_SIZE * MAJOR_DIVISION_SCALE) {
    majorGridSize.value = majorGridSize.value / 2;
    minorGridSize.value = minorGridSize.value / 2;
    xAxisIncrement.value = xAxisIncrement.value / 2;
    yAxisIncrement.value = yAxisIncrement.value / 2;
  }
  repaintGrid();
};

const zoomOut = () => {
  majorGridSize.value = majorGridSize.value - MAJOR_DIVISON_INCREMENT;
  minorGridSize.value = majorGridSize.value / MINOR_DIVISIONS;
  if (majorGridSize.value <= INITIAL_MAJOR_DIVISION_SIZE / MAJOR_DIVISION_SCALE) {
    majorGridSize.value = majorGridSize.value * 2;
    minorGridSize.value = minorGridSize.value * 2;
    xAxisIncrement.value = xAxisIncrement.value * 2;
    yAxisIncrement.value = yAxisIncrement.value * 2;
  }
  repaintGrid();
};

const handleResize = () => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;
  repaintGrid();
};

const onWheel = (y: number) => {
  console.log(y);
  // Scroll up (zoom in)
  if (y < 0) {
    zoomIn();
  }
  // Scroll down  (zoom out)
  else {
    zoomOut();
  }
};

const onPinch = (vd: number) => {
  // Pinch out (zoom in)
  if (vd > 0) {
    zoomIn();
  }
  // Pinch in (zoom out)
  else {
    zoomOut();
  }
};

const onDrag = (x: number, y: number) => {
  xOriginOffset.value = xOriginOffset.value + x;
  yOriginOffset.value = yOriginOffset.value + y;
  repaintGrid();
};

useGesture(
  {
    onWheel: ({ movement: [, y] }) => onWheel(y),
    onPinch: ({ vdva: [vd] }) => onPinch(vd),
    onDrag: ({ delta: [x, y] }) => onDrag(x, y),
  },
  {
    domTarget: canvas,
  },
);
</script>

<template>
  <div ref="main-container" class="interactive-pane grow overflow-hidden">
    <canvas ref="canvas-2d" @wheel.prevent></canvas>
  </div>
</template>
