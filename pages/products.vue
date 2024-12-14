<template>
  <div class="products-page">


    <div class="product-section">
      <div v-if="selectedCategory === 'Smartphones'" class="phone-model-buttons">
        <button
          v-for="model in phoneModels"
          :key="model"
          @click="filterByPhoneModel(model)"
          :class="{ active: selectedPhoneModel === model }"
        >
          {{ model }}
        </button>
      </div>

      <div class="product-grid">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="product-card"
        >
          <!-- Clickable Product Image -->
          <img
            :src="`/assets/images/${product.image}`"
            alt="Product Image"
            class="product-image clickable"
            @click="redirectToProduct(product.id)"
          />
          <!-- Clickable Product Name -->
          <h2
            class="product-name clickable"
            @click="redirectToProduct(product.id)"
          >
            {{ product.name }}
          </h2>
          <p>{{ product.price }} Tg</p>
          <star-rating :rating="product.rating"></star-rating>
          <button @click="addToCart(product)">
            {{ isInCart(product.id) ? "Remove from Cart" : "Add to Cart" }}
          </button>
        </div>
      </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useProductStore } from "~/stores/productStore";

const toast = useToast();
const router = useRouter();
const productStore = useProductStore();

const productsPerPage = 6;
const currentPage = ref(1);
const categories = ["Laptops", "Smartphones", "Tablets", "Appliances", "Electronics"];
const phoneModels = ["Apple", "Samsung", "Xiaomi", "Huawei", "Vivo"];

const selectedCategory = computed(() => productStore.selectedCategory);
const selectedPhoneModel = computed(() => productStore.selectedPhoneModel);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage;
  const end = start + productsPerPage;
  return productStore.filteredProducts.slice(start, end);
});
const totalPages = computed(() => Math.ceil(productStore.filteredProducts.length / productsPerPage));

const filterByCategory = (category) => {
  productStore.filterByCategory(category);
  currentPage.value = 1;
};

const filterByPhoneModel = (model) => {
  productStore.filterByPhoneModel(model);
};

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
    productStore.addToCart(product);
    toast.success(`${product.name} added to the cart!`);
  }
};

const isInCart = (productId) => productStore.isInCart(productId);

// Redirect to Product Details Page
const redirectToProduct = (id) => {
  router.push(`/product/${id}`);
};
</script>

<style scoped>
.products-page {
  display: flex;
  justify-content: center;  /* Center the entire page content horizontally */
  align-items: center;      /* Center the entire page content vertically */
  gap: 20px;
  padding: 20px;
  min-height: 100vh;        /* Ensure full page height for vertical centering */
}

.product-section {
  display: flex;
  flex-direction: column;
  align-items: center;      /* Center content horizontally */
  flex-grow: 1;
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;         /* Limit the max width of the grid */
  width: 100%;
  justify-items: center;    /* Center each grid item horizontally */
}

.product-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
  width: 100%;              /* Ensure cards take full width within the grid cell */
  max-width: 300px;         /* Limit the card width */
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Center pagination controls */
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

.side-menu {
  width: 200px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.side-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-menu li {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.side-menu li.active {
  font-weight: bold;
  background-color: #007bff;
  color: white;
}

.side-menu li:hover {
  background-color: #007bff;
  color: white;
}

.phone-model-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.phone-model-buttons button {
  padding: 10px;
  font-size: 14px;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.phone-model-buttons button.active {
  background-color: #0056b3;
}

.phone-model-buttons button:hover {
  background-color: #0056b3;
}

.star-rating {
  display: flex;
  justify-content: center;
}

</style>
