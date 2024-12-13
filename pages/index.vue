<template>
    <div class="home-page">
      <h1>Welcome to Our E-Commerce Site</h1>
      <p>Browse our latest products below</p>
  
      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="getImage(product.image)" alt="Product Image" class="product-image" />
          <h2>{{ product.name }}</h2>
          <p>{{ product.price }} Tg</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useProductStore } from '~/stores/productStore'; // Use Pinia store
  
  const productStore = useProductStore(); // Initialize Pinia store
  const products = productStore.products; // Get products from the store
  
  const addToCart = (product) => {
    productStore.addToCart(product); // Call Pinia action
  };
  
  const getImage = (imageName) => {
    return `/assets/images/${imageName}`; // Adjusted for Nuxt static assets
  };
  </script>
  
  <style scoped>
  .home-page {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    font-size: 48px;
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 18px;
    color: #555;
    margin-bottom: 40px;
  }
  
  .product-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .product-card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    text-align: center;
    width: 250px;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
    margin-bottom: 15px;
    border-radius: 8px;
  }
  
  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .product-card p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }
  
  button {
    background-color: #6200ea;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #3700b3;
  }
  </style>
  