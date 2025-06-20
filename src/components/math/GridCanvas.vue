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
const offsetX = ref(0);
const offsetY = ref(0);

const majorGridSizeX = ref(INITIAL_MAJOR_DIVISION_SIZE);
const majorGridSizeY = ref(INITIAL_MAJOR_DIVISION_SIZE);
const minorGridSizeX = ref(INITIAL_MINOR_DIVISION_SIZE);
const minorGridSizeY = ref(INITIAL_MINOR_DIVISION_SIZE);
const incrementX = ref(2);
const incrementY = ref(2);
const originX = ref(width.value / 2);
const originY = ref(width.value / 2);

onMounted(() => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

  const rect = container.value!.getBoundingClientRect();
  offsetX.value = rect.x;
  offsetY.value = rect.y;
  originX.value = width.value / 2;
  originY.value = height.value / 2;

  context.value = canvas.value!.getContext("2d")!;
  createGrid(
    context.value,
    width.value,
    height.value,
    majorGridSizeX.value,
    majorGridSizeY.value,
    minorGridSizeX.value,
    minorGridSizeY.value,
    incrementX.value,
    incrementY.value,
    originX.value,
    originY.value,
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
    majorGridSizeX.value,
    majorGridSizeY.value,
    minorGridSizeX.value,
    minorGridSizeY.value,
    incrementX.value,
    incrementY.value,
    originX.value,
    originY.value,
  );
};

const calculateNewOrigin = (pointerX: number, pointerY: number, zoomIn: boolean) => {
  const oldDistX = originX.value - pointerX;
  const oldDistY = originY.value - pointerY;

  const deltaDivisionIncrement = zoomIn ? MAJOR_DIVISON_INCREMENT : -MAJOR_DIVISON_INCREMENT;

  const newDistX =
    ((majorGridSizeX.value + deltaDivisionIncrement) * oldDistX) / majorGridSizeX.value;
  const newDistY =
    ((majorGridSizeY.value + deltaDivisionIncrement) * oldDistY) / majorGridSizeY.value;

  originX.value = newDistX + pointerX;
  originY.value = newDistY + pointerY;
};

const zoomIn = () => {
  majorGridSizeX.value = majorGridSizeX.value + MAJOR_DIVISON_INCREMENT;
  minorGridSizeX.value = majorGridSizeX.value / MINOR_DIVISIONS;
  majorGridSizeY.value = majorGridSizeY.value + MAJOR_DIVISON_INCREMENT;
  minorGridSizeY.value = majorGridSizeY.value / MINOR_DIVISIONS;
  if (majorGridSizeX.value >= INITIAL_MAJOR_DIVISION_SIZE * MAJOR_DIVISION_SCALE) {
    majorGridSizeX.value = majorGridSizeX.value / MAJOR_DIVISION_SCALE;
    minorGridSizeX.value = minorGridSizeX.value / MAJOR_DIVISION_SCALE;
    incrementX.value = incrementX.value / MAJOR_DIVISION_SCALE;
  }
  if (majorGridSizeY.value >= INITIAL_MAJOR_DIVISION_SIZE * MAJOR_DIVISION_SCALE) {
    majorGridSizeY.value = majorGridSizeY.value / MAJOR_DIVISION_SCALE;
    minorGridSizeY.value = minorGridSizeY.value / MAJOR_DIVISION_SCALE;
    incrementY.value = incrementY.value / MAJOR_DIVISION_SCALE;
  }
  repaintGrid();
};

const zoomOut = () => {
  majorGridSizeX.value = majorGridSizeX.value - MAJOR_DIVISON_INCREMENT;
  minorGridSizeX.value = majorGridSizeX.value / MINOR_DIVISIONS;
  majorGridSizeY.value = majorGridSizeY.value - MAJOR_DIVISON_INCREMENT;
  minorGridSizeY.value = majorGridSizeY.value / MINOR_DIVISIONS;
  if (majorGridSizeX.value <= INITIAL_MAJOR_DIVISION_SIZE / MAJOR_DIVISION_SCALE) {
    majorGridSizeX.value = majorGridSizeX.value * MAJOR_DIVISION_SCALE;
    minorGridSizeX.value = minorGridSizeX.value * MAJOR_DIVISION_SCALE;
    incrementX.value = incrementX.value * MAJOR_DIVISION_SCALE;
  }
  if (majorGridSizeY.value <= INITIAL_MAJOR_DIVISION_SIZE / MAJOR_DIVISION_SCALE) {
    majorGridSizeY.value = majorGridSizeY.value * MAJOR_DIVISION_SCALE;
    minorGridSizeY.value = minorGridSizeY.value * MAJOR_DIVISION_SCALE;
    incrementY.value = incrementY.value * MAJOR_DIVISION_SCALE;
  }
  repaintGrid();
};

const handleResize = () => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;

  originX.value = width.value / 2;
  originY.value = height.value / 2;

  canvas.value!.width = width.value;
  canvas.value!.height = height.value;
  repaintGrid();
};

const onWheel = (y: number, pointerX: number, pointerY: number) => {
  // Scroll up (zoom in)
  if (y < 0) {
    calculateNewOrigin(pointerX, pointerY, true);
    zoomIn();
  }
  // Scroll down  (zoom out)
  else {
    calculateNewOrigin(pointerX, pointerY, false);
    zoomOut();
  }
};

const onPinch = (vd: number, pointerX: number, pointerY: number) => {
  // Pinch out (zoom in)
  if (vd > 0) {
    calculateNewOrigin(pointerX, pointerY, true);
    zoomIn();
  }
  // Pinch in (zoom out)
  else {
    calculateNewOrigin(pointerX, pointerY, false);
    zoomOut();
  }
};

const onDrag = (x: number, y: number) => {
  originX.value = originX.value + x;
  originY.value = originY.value + y;
  repaintGrid();
};

useGesture(
  {
    onWheel: ({ movement: [, y], event }) => onWheel(y, event.offsetX, event.offsetY),
    onPinch: ({ vdva: [vd], origin: [pointerX, pointerY] }) =>
      onPinch(vd, pointerX - offsetX.value, pointerY - offsetY.value),
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
