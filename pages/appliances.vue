<script setup lang="ts">

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore()
const appliances = computed(() => productStore.filteredProducts.filter((product) => product.category === "Appliances"));

</script>

<template>

  <product :products="appliances"/>

</template>

<style scoped>

</style>