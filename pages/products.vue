<template>
    <div class="product-list-page">
      <h1>Our Products</h1>
  
      <!-- Product Grid -->
      <div class="product-grid">
        <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
          <NuxtLink :to="{ name: 'product-id', params: { id: product.id } }">
            <img :src="getImage(product.image)" class="product-image" alt="Product Image" />
          </NuxtLink>
          <h2>{{ product.name }}</h2>
          <p>{{ product.price }} Tg</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="pagination-buttons">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useProductStore } from '~/stores/productStore';
  
  const productStore = useProductStore();
  
  const currentPage = ref(1);
  const itemsPerPage = 6;
  
  const filteredProducts = computed(() => productStore.products);
  
  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredProducts.value.slice(start, start + itemsPerPage);
  });
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const addToCart = (product) => {
    productStore.addToCart(product);
  };
  
  const getImage = (imageName) => {
    return `/assets/images/${imageName}`;
  };
  </script>
  
  <style scoped>
  .product-list-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    margin: 20px;
    width: 300px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 15px;
    border-radius: 8px;
  }
  
  .pagination-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .pagination-buttons button {
    background-color: #361c59;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 30px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .pagination-buttons button:disabled {
    background-color: #5c4b83;
    cursor: not-allowed;
  }
  
  .pagination-buttons button:not(:disabled):hover {
    background-color: #3700b3;
  }
  </style>
  