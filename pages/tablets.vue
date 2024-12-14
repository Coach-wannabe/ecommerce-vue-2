<script setup lang="ts">

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore()
const tablets = computed(() => productStore.filteredProducts.filter((product) => product.category === "Tablets"));

</script>

<template>

  <product :products="tablets"/>

</template>

<style scoped>

</style>