<script setup lang="ts">
import { onUnmounted, onMounted, ref, useTemplateRef } from "vue";
import { useGesture } from "@vueuse/gesture";

import EditableBlock from "./EditableBlock.vue";

const container = useTemplateRef("container");
const dragArea = useTemplateRef("drag-area");

const width = ref(500);
// const height = ref(100);

onMounted(() => {
  width.value = window.innerWidth * 0.32;
  // height.value = container.value!.clientHeight;
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  width.value = container.value!.clientWidth;
  // height.value = container.value!.clientHeight;
};

const onDrag = (x: number) => {
  width.value = x;
};

useGesture(
  {
    onDrag: ({ xy: [x] }) => onDrag(x),
  },
  {
    domTarget: dragArea,
  },
);
</script>

<template>
  <div
    ref="container"
    class="note-board z-10 relative border-r border-neutral-200"
    :style="{ width: width + 'px' }"
  >
    <div>
      <EditableBlock />
    </div>
    <div
      ref="drag-area"
      class="absolute top-0 bottom-0 right-0 translate-x-full w-3 cursor-ew-resize"
      title="Resize"
    ></div>
  </div>
</template>

<style scoped>
.note-board {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
}
</style>
