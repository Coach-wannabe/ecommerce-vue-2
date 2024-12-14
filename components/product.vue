<template>
  <div class="products-page">
    <!-- Product Grid -->
    <div class="product-grid">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <img
            :src="`/assets/images/${product.image}`"
            alt="Product Image"
            class="product-image"
        />
        <h2>{{ product.name }}</h2>
        <p>{{ product.price }} Tg</p>
        <star-rating :rating="product.rating"></star-rating>

        <!-- Add to Cart Button -->
        <button :class="getButtonClass(product)" @click="toggleCart(product)">
          {{ getButtonText(product) }}
        </button>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import { useToast } from "vue-toastification";

// Define Props
const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

// Toast notification setup
const toast = useToast();

// Pinia store setup for cart management
const productStore = useProductStore();

// Pagination setup
const productsPerPage = 6; // Number of products per page
const currentPage = ref(1);

// Paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage;
  return props.products.slice(start, start + productsPerPage);
});

const totalPages = computed(() => Math.ceil(props.products.length / productsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Cart logic
const isInCart = (productId) => productStore.isInCart(productId);

// Get button text based on whether the product is in the cart
const getButtonText = (product) => {
  return isInCart(product.id) ? "Remove from Cart" : "Add to Cart";
};

// Get button class based on whether the product is in the cart
const getButtonClass = (product) => {
  return isInCart(product.id) ? "remove-from-cart-btn" : "add-to-cart-btn";
};

// Toggle cart status for the product
const toggleCart = (product) => {
  if (!product) return;
  if (isInCart(product.id)) {
    productStore.removeFromCart(product.id);
    toast.info(`${product.name} removed from cart.`);
  } else {
    productStore.addToCart(product);
    toast.success(`${product.name} added to cart.`);
  }
};
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the grid horizontally */
  justify-content: center; /* Center the grid vertically */
  padding: 20px;
  min-height: 100vh; /* Ensure the page takes full height */
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px; /* Max width of the grid */
  width: 100%;
  justify-items: center; /* Center each card horizontally */
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
  height: 200px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 8px;
}

.product-name {
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

button.remove-from-cart-btn {
  background-color: #dc3545;
}

button.remove-from-cart-btn:hover {
  background-color: #c82333;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Center pagination */
  align-items: center;
  gap: 20px;
  width: 100%;
  padding-top: 10px;
}

.pagination button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #dcdcdc;
  color: #8c8c8c;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

.pagination span {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.star-rating{
  display: flex;
  justify-content: center;
}
</style>
