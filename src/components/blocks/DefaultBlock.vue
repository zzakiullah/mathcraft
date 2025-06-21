<script setup lang="ts">
import { ref } from "vue";

import { PLACEHOLDER_TEXT } from "@/constants/block";

const text = ref("");
</script>

<template>
  <div
    class="block default-block"
    contenteditable="plaintext-only"
    :data-placeholder="PLACEHOLDER_TEXT"
  >
    {{ text }}
  </div>
</template>
