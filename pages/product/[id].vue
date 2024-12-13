<template>
    <div class="product-detail-page">
      <img :src="getImage(product.image)" class="product-detail-image" alt="Product Image" />
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>{{ product.price }} Tg</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'; // For accessing the route params
  import { useProductStore } from '~/stores/productStore';
  
  const productStore = useProductStore();
  const route = useRoute(); // Access route parameters
  
  // Find the product by ID
  const product = computed(() => {
    const id = parseInt(route.params.id); // Get ID from route params
    return productStore.products.find((p) => p.id === id);
  });
  
  // Add product to the cart
  const addToCart = (product) => {
    if (product) {
      productStore.addToCart(product);
    }
  };
  
  // Get the image path
  const getImage = (imageName) => {
    return `/assets/images/${imageName}`;
  };
  </script>
  
  <style scoped>
  .product-detail-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .product-detail-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }
  
  button {
    background-color: #6200ea;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #3700b3;
  }
  </style>
  