<template>
    <div class="home-page">
      <h1>Welcome to Our Store</h1>
      <p>Discover our featured products below:</p>
  
      <!-- Featured Products -->
      <div class="featured-products">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
          <img :src="`/assets/images/${product.image}`" alt="Product Image" class="product-image" />
          <h2>{{ product.name }}</h2>
          <p>{{ product.price }} Tg</p>
          <button @click="addToCart(product)">
            {{ isInCart(product.id) ? "Remove from Cart" : "Add to Cart" }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useProductStore } from "~/stores/productStore";
  
  // Access the product store
  const productStore = useProductStore();
  
  // Select 3 random featured products
  const featuredProducts = computed(() => {
    return productStore.products.sort(() => Math.random() - 0.5).slice(0, 3);
  });
  
  // Add or remove product from the cart
  const addToCart = (product) => {
    if (productStore.isInCart(product.id)) {
      productStore.removeFromCart(product.id);
    } else {
      productStore.addToCart(product);
    }
  };
  
  // Check if a product is in the cart
  const isInCart = (productId) => productStore.isInCart(productId);
  </script>
  
  <style scoped>
  .home-page {
    text-align: center;
    padding: 20px;
  }
  
  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }
  
  .featured-products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  
  .product-card {
    background-color: white;
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
    margin-bottom: 15px;
    border-radius: 8px;
  }
  
  h2 {
    font-size: 18px;
    color: #333;
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
  