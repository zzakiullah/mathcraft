<script setup lang="ts">
import HeaderNav from "@/components/navigation/HeaderNav";
import FooterNav from "@/components/navigation/FooterNav";
</script>

<template>
  <HeaderNav />
  <slot></slot>
  <FooterNav />
</template>
