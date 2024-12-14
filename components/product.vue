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
        <button @click="addToCart(product)">
          {{ isInCart(product.id) ? "Remove from Cart" : "Add to Cart" }}
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

const addToCart = (product) => {
  if (productStore.isInCart(product.id)) {
    productStore.removeFromCart(product.id);
    toast.info(`${product.name} removed from the cart.`);
  } else {
    addToCart(product);
    toast.success(`${product.name} added to the cart!`);
  }
};

const isInCart = (productId) => productStore.isInCart(productId);

</script>

<style scoped>
/* Styling for the Product Page */
.products-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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

/* Pagination Controls */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
</style>
