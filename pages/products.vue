<template>
    <div class="product-list-page">
      <h1>Our Products</h1>
      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img
            :src="`/assets/images/${product.image}`"
            alt="Product Image"
            class="product-image"
          />
          <h2>{{ product.name }}</h2>
          <p>{{ product.price }} Tg</p>
          <button
            @click="toggleCart(product)"
            :class="{ 'in-cart': isInCart(product.id) }"
          >
            {{ isInCart(product.id) ? "Remove from Cart" : "Add to Cart" }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useProductStore } from "~/stores/productStore";
  
  // Access the Pinia product store
  const productStore = useProductStore();
  
  // Get the list of products
  const products = computed(() => productStore.products);
  
  // Toggle the product in and out of the cart
  const toggleCart = (product) => {
    if (productStore.isInCart(product.id)) {
      productStore.removeFromCart(product.id);
    } else {
      productStore.addToCart(product);
    }
  };
  
  // Check if the product is already in the cart
  const isInCart = (productId) => productStore.isInCart(productId);
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
  }
  
  .product-card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  h1 {
    font-size: 32px;
    color: #333;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 20px;
    color: #444;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button.in-cart {
    background-color: #ff0000;
  }
  
  button.in-cart:hover {
    background-color: #cc0000;
  }
  </style>
  