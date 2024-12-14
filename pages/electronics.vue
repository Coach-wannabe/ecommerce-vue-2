<script setup lang="ts">

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore()
const electronics = computed(() => productStore.filteredProducts.filter((product) => product.category === "Electronics"));

</script>

<template>
  <product :products="electronics" />

</template>

<style scoped>

</style>