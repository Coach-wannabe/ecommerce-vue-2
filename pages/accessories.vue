<script setup lang="ts">

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore()
const accessories = computed(() => productStore.filteredProducts.filter((product) => product.category === "Accessories"));

</script>

<template>
<product :products="accessories"/>
</template>

<style scoped>

</style>