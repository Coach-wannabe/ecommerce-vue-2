<script setup lang="ts">

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore()
const smartphones = computed(() => productStore.filteredProducts.filter((product) => product.category === "Smartphones"));

</script>

<template>
  <product :products="smartphones" />

</template>

<style scoped>

</style>