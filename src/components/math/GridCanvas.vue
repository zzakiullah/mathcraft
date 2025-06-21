<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { useElementBounding, useThrottleFn } from "@vueuse/core";
import { useGesture } from "@vueuse/gesture";

import { clearGrid, createGrid } from "@/lib/math/grid";

const MAJOR_DIVISON_INCREMENT_MOUSE = 20;
const MAJOR_DIVISON_INCREMENT_TOUCH = 20;

const MINOR_DIVISIONS = [5, 4, 5];
const MAJOR_DIVISION_SCALES = [2, 2, 5 / 2];
const INCREMENT_COEFFS = [1, 2, 5];

const INITIAL_MAJOR_DIVISION_SIZE = 160;
const INITIAL_MINOR_DIVISION_SIZE = INITIAL_MAJOR_DIVISION_SIZE / MINOR_DIVISIONS[1];

const MIN_DIVISION_SIZE = 100;
const MAX_DIVISION_SIZE = 220;

const ZOOM_LEVELS = 3;

const container = useTemplateRef("container");
const canvas = useTemplateRef("canvas-2d");

const { width, height, x: offsetX, y: offsetY } = useElementBounding(container);

const context = ref<CanvasRenderingContext2D>();

const majorGridSizeX = ref(INITIAL_MAJOR_DIVISION_SIZE);
const majorGridSizeY = ref(INITIAL_MAJOR_DIVISION_SIZE);
const minorGridSizeX = ref(INITIAL_MINOR_DIVISION_SIZE);
const minorGridSizeY = ref(INITIAL_MINOR_DIVISION_SIZE);
const incrementX = ref(2);
const incrementY = ref(2);
const originX = ref(width.value / 2);
const originY = ref(width.value / 2);

const zoomLevelX = ref(1);
const zoomLevelY = ref(1);
const incrementExpX = ref(0);
const incrementExpY = ref(0);

const handleResize = () => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;

  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

  originX.value = width.value / 2;
  originY.value = height.value / 2;

  repaintGrid();
};

const handleResizeThrottled = useThrottleFn(handleResize, 50);
watch([width, height], handleResizeThrottled);

onMounted(() => {
  width.value = container.value!.clientWidth;
  height.value = container.value!.clientHeight;

  canvas.value!.width = width.value;
  canvas.value!.height = height.value;

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
    incrementExpX.value,
    incrementExpY.value,
    originX.value,
    originY.value,
  );
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
    incrementExpX.value,
    incrementExpY.value,
    originX.value,
    originY.value,
  );
};

const calculateNewOrigin = (
  majorDivisionIncrement: number,
  pointerX: number,
  pointerY: number,
  zoomIn: boolean,
) => {
  const oldDistX = originX.value - pointerX;
  const oldDistY = originY.value - pointerY;

  const deltaDivisionIncrement = zoomIn ? majorDivisionIncrement : -majorDivisionIncrement;

  const newDistX =
    ((majorGridSizeX.value + deltaDivisionIncrement) * oldDistX) / majorGridSizeX.value;
  const newDistY =
    ((majorGridSizeY.value + deltaDivisionIncrement) * oldDistY) / majorGridSizeY.value;

  originX.value = newDistX + pointerX;
  originY.value = newDistY + pointerY;
};

// Zoom order: 10 -> 5 -> 2 -> 1 -> 0.5 -> 0.2 -> 0.1
const zoomIn = (majorDivisionIncrement: number) => {
  majorGridSizeX.value = majorGridSizeX.value + majorDivisionIncrement;
  minorGridSizeX.value = majorGridSizeX.value / MINOR_DIVISIONS[zoomLevelX.value];
  majorGridSizeY.value = majorGridSizeY.value + majorDivisionIncrement;
  minorGridSizeY.value = majorGridSizeY.value / MINOR_DIVISIONS[zoomLevelY.value];

  const scaleX = MAJOR_DIVISION_SCALES[zoomLevelX.value];
  if (majorGridSizeX.value >= MAX_DIVISION_SIZE) {
    majorGridSizeX.value = majorGridSizeX.value / scaleX;
    minorGridSizeX.value = minorGridSizeX.value / scaleX;
    zoomLevelX.value = (zoomLevelX.value + ZOOM_LEVELS - 1) % ZOOM_LEVELS;

    if (zoomLevelX.value === ZOOM_LEVELS - 1) {
      incrementExpX.value = incrementExpX.value - 1;
    }
    incrementX.value = INCREMENT_COEFFS[zoomLevelX.value];
  }

  const scaleY = MAJOR_DIVISION_SCALES[zoomLevelY.value];
  if (majorGridSizeY.value >= MAX_DIVISION_SIZE) {
    majorGridSizeY.value = majorGridSizeY.value / scaleY;
    minorGridSizeY.value = minorGridSizeY.value / scaleY;
    zoomLevelY.value = (zoomLevelY.value + ZOOM_LEVELS - 1) % ZOOM_LEVELS;

    if (zoomLevelY.value === ZOOM_LEVELS - 1) {
      incrementExpY.value = incrementExpY.value - 1;
    }
    incrementY.value = INCREMENT_COEFFS[zoomLevelY.value];
  }

  repaintGrid();
};

// Zoom order: 0.1 -> 0.2 -> 0.5 -> 1 -> 2 -> 5 -> 10
const zoomOut = (majorDivisionIncrement: number) => {
  majorGridSizeX.value = majorGridSizeX.value - majorDivisionIncrement;
  minorGridSizeX.value = majorGridSizeX.value / MINOR_DIVISIONS[zoomLevelX.value];
  majorGridSizeY.value = majorGridSizeY.value - majorDivisionIncrement;
  minorGridSizeY.value = majorGridSizeY.value / MINOR_DIVISIONS[zoomLevelY.value];

  const scaleX = MAJOR_DIVISION_SCALES[zoomLevelX.value];
  if (majorGridSizeX.value <= MIN_DIVISION_SIZE) {
    majorGridSizeX.value = majorGridSizeX.value * scaleX;
    minorGridSizeX.value = minorGridSizeX.value * scaleX;
    zoomLevelX.value = (zoomLevelX.value + 1) % ZOOM_LEVELS;

    if (zoomLevelX.value === 0) {
      incrementExpX.value = incrementExpX.value + 1;
    }
    incrementX.value = INCREMENT_COEFFS[zoomLevelX.value];
  }

  const scaleY = MAJOR_DIVISION_SCALES[zoomLevelY.value];
  if (majorGridSizeY.value <= MIN_DIVISION_SIZE) {
    majorGridSizeY.value = majorGridSizeY.value * scaleY;
    minorGridSizeY.value = minorGridSizeY.value * scaleY;
    zoomLevelY.value = (zoomLevelY.value + 1) % ZOOM_LEVELS;

    if (zoomLevelY.value === 0) {
      incrementExpY.value = incrementExpY.value + 1;
    }
    incrementY.value = INCREMENT_COEFFS[zoomLevelY.value];
  }

  repaintGrid();
};

const onWheel = (y: number, pointerX: number, pointerY: number) => {
  // Scroll up (zoom in)
  if (y < 0) {
    calculateNewOrigin(MAJOR_DIVISON_INCREMENT_MOUSE, pointerX, pointerY, true);
    zoomIn(MAJOR_DIVISON_INCREMENT_MOUSE);
  }
  // Scroll down  (zoom out)
  else {
    calculateNewOrigin(MAJOR_DIVISON_INCREMENT_MOUSE, pointerX, pointerY, false);
    zoomOut(MAJOR_DIVISON_INCREMENT_MOUSE);
  }
};

const onPinch = (vd: number, pointerX: number, pointerY: number) => {
  // Pinch out (zoom in)
  if (vd > 0) {
    calculateNewOrigin(MAJOR_DIVISON_INCREMENT_TOUCH, pointerX, pointerY, true);
    zoomIn(MAJOR_DIVISON_INCREMENT_TOUCH);
  }
  // Pinch in (zoom out)
  else {
    calculateNewOrigin(MAJOR_DIVISON_INCREMENT_TOUCH, pointerX, pointerY, false);
    zoomOut(MAJOR_DIVISON_INCREMENT_TOUCH);
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
  <div ref="container" class="interactive-pane z-0 relative grow overflow-hidden">
    <canvas ref="canvas-2d" @wheel.prevent></canvas>
  </div>
</template>
