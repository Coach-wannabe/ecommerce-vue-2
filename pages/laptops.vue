<script setup lang="ts">

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore()
const laptops = computed(() => productStore.filteredProducts.filter((product) => product.category === "Laptops"));


</script>

<template>

  <product :products="laptops"></product>


</template>

<style scoped>

</style>