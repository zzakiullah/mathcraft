<script setup lang="ts"></script>

<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-radial from-blue-800 to-blue-950"
  >
    <main
      class="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl w-[480px] border border-neutral-300 shadow-xl px-10 py-8"
    >
      <slot></slot>
    </main>
  </div>
</template>

<style scoped></style>
