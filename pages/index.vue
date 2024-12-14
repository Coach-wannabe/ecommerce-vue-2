<template>
  <div class="index-page">
    <h1 class="title">Welcome to Our Store</h1>
    <p class="subtitle">Discover our featured products below:</p>

    <div class="product-grid">
      <div v-for="product in featuredProducts" :key="product.id" class="product-card">
        <div class="product-card-content">
          <img :src="`/assets/images/${product.image}`" class="product-image" alt="Product image" />
        </div>
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-price">{{ product.price }} Tg</p>
          <button
            :class="buttonClass(product.id)"
            @click="toggleCart(product)"
          >
            {{ buttonText(product.id) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "~/stores/productStore";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const toast = useToast();

// Compute the featured products (limited to 3)
const featuredProducts = computed(() => productStore.products.slice(0, 3));

// Check if a product is in the cart
const isInCart = (productId) => {
  return productStore.cart.some((item) => item.id === productId);
};

// Toggle the product in the cart
const toggleCart = (product) => {
  if (isInCart(product.id)) {
    productStore.removeFromCart(product.id);
    toast.success(`${product.name} removed from cart.`);
  } else {
    productStore.addToCart(product);
    toast.success(`${product.name} added to cart.`);
  }
};

// Dynamic button text based on cart state
const buttonText = (productId) => {
  return isInCart(productId) ? "Remove from Cart" : "Add to Cart";
};

// Dynamic button class based on cart state
const buttonClass = (productId) => {
  return isInCart(productId) ? "remove-from-cart-btn" : "add-to-cart-btn";
};
</script>

<style scoped>
/* General Styling */
.index-page {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 30px;
  color: #555;
}

/* Product Grid */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Product Card Styling */
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px;
  height: 400px; /* Set fixed height for all cards */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Product Content (Image Section) */
.product-card-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

/* Product Info (Text + Button at Bottom) */
.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

/* Product Name */
.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

/* Product Price */
.product-price {
  font-size: 18px;
  color: #666;
}

/* Add to Cart Button */
.add-to-cart-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

/* Remove from Cart Button */
.remove-from-cart-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-from-cart-btn:hover {
  background-color: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-grid {
    flex-direction: column;
    align-items: center;
  }

  .product-card {
    width: 90%; /* Adjust width for smaller screens */
    height: auto; /* Allow flexible height on small screens */
  }

  .product-card-content {
    max-height: 150px;
  }

  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
