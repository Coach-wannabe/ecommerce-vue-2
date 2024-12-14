<template>
  <div class="product-detail-page">
    <button @click="navigateBack" class="back-button">← Back to Products</button>
    <div class="product-container">
      <!-- Product Image -->
      <div class="image-container">
        <img :src="getImage(product.image)" class="product-detail-image" alt="Product Image" />
      </div>

      <!-- Product Details -->
      <div class="details-container">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-rating">
          <star-rating :rating="product.rating"></star-rating>
          <span class="rating-text">({{ product.rating.toFixed(1) }})</span>
        </div>
        <p class="product-price">{{ product.price }} Tg</p>

        <!-- Product Description -->
        <div class="product-description">
          <h2>Description</h2>
          <p>{{ product.description }}</p>
        </div>

        <!-- Add to Cart Button -->
        <button :class="buttonClass" @click="toggleCart(product)">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "~/stores/productStore";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import StarRating from "~/components/starRating.vue";

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Fetch product by ID
const product = computed(() => {
  const id = parseInt(route.params.id);
  return productStore.products.find((p) => p.id === id);
});

// Navigate back to the product list
const navigateBack = () => {
  router.push("/products");
};

// Get image URL
const getImage = (imageName) => {
  return `/assets/images/${imageName}`;
};

// Cart logic
const isInCart = computed(() => productStore.isInCart(product.value?.id));
const buttonText = computed(() => (isInCart.value ? "Remove from Cart" : "Add to Cart"));
const buttonClass = computed(() => (isInCart.value ? "remove-from-cart-btn" : "add-to-cart-btn"));

const toggleCart = (product) => {
  if (!product) return;
  if (isInCart.value) {
    productStore.removeFromCart(product.id);
    toast.info(`${product.name} removed from cart.`);
  } else {
    productStore.addToCart(product);
    toast.success(`${product.name} added to cart.`);
  }
};
</script>

<style scoped>
/* General Styling */
.product-detail-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.back-button:hover {
  text-decoration: underline;
}

/* Product Container */
.product-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Image Styling */
.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-detail-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-detail-image:hover {
  transform: scale(1.05);
}

/* Details Container */
.details-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Product Name */
.product-name {
  font-size: 36px;
  color: #333;
}

/* Product Rating */
.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-text {
  font-size: 16px;
  color: #555;
}

/* Product Price */
.product-price {
  font-size: 24px;
  color: #555;
  font-weight: bold;
}

/* Product Description */
.product-description {
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.product-description h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.product-description p {
  font-size: 16px;
  color: #666;
}

/* Add to Cart Button */
.add-to-cart-btn,
.remove-from-cart-btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn {
  background-color: #007bff;
  color: white;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.remove-from-cart-btn {
  background-color: #dc3545;
  color: white;
}

.remove-from-cart-btn:hover {
  background-color: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
    align-items: center;
  }

  .image-container,
  .details-container {
    width: 100%;
  }

  .product-name {
    font-size: 28px;
  }

  .product-price {
    font-size: 20px;
  }
}
</style>
