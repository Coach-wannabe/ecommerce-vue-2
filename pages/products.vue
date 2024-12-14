<template>
  <div class="products-page">
    <aside class="side-menu">
      <ul>
        <li
          @click="filterByCategory('All')"
          :class="{ active: selectedCategory === 'All' }"
        >
          All
        </li>
        <li
          v-for="category in categories"
          :key="category"
          @click="filterByCategory(category)"
          :class="{ active: selectedCategory === category }"
        >
          {{ category }}
        </li>
      </ul>
    </aside>

    <div class="product-section">
      <!-- Фильтр для выбора модели телефона -->
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

      <!-- Продукты, которые отображаются в зависимости от выбранной категории и модели -->
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <img :src="`/assets/images/${product.image}`" alt="Product Image" class="product-image" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.price }} Tg</p>
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useProductStore } from "~/stores/productStore";

const toast = useToast();
const productStore = useProductStore();

const productsPerPage = 6;
const currentPage = ref(1);
<<<<<<< Updated upstream

const categories = ["Laptops", "Smartphones", "Tablets", "Appliances", "Accessories", "Electronics"];
=======
const categories = ["Laptops", "Smartphones", "Tablets", "Appliances", "Electronics"];
const phoneModels = ["Apple", "Samsung", "Xiaomi", "Huawei", "Vivo"]; // Модели телефонов
>>>>>>> Stashed changes

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
</script>

<style scoped>
.products-page {
  display: flex;
  gap: 20px;
  padding: 20px;
  width: 100%;
  justify-content: space-between; /* Элементы будут выровнены по всей ширине */
  flex-wrap: wrap; /* Позволяет элементам переходить на новую строку */
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Адаптивная сетка, минимальная ширина 200px */
  gap: 20px;
  flex-grow: 1;
  width: 100%;
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

.phone-model-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
}

.phone-model-buttons button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.phone-model-buttons button.active {
  background-color: #4CAF50;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 10px;
  margin-top: 20px;
  width: 100%;
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

</style>
