<script setup lang="ts">
import HeaderNav from "@/components/navigation/HeaderNav.vue";
import FooterNav from "@/components/navigation/FooterNav.vue";
</script>

<template>
  <HeaderNav />
  <slot></slot>
  <FooterNav />
</template>
