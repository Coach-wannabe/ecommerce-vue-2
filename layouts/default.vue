<template>
  <div>
    <!-- Header with catalogue button -->
    <header>
      <nav>
        <!-- Catalogue Button -->
        <button @click="toggleCategoryDropdown">Catalogue</button>
        <div v-if="showCategoryDropdown" class="category-dropdown">
          <ul>
            <li @click="selectCategory('Laptops')">Laptops</li>
            <li @click="selectCategory('Smartphones')">Smartphones</li>
            <li @click="selectCategory('Tablets')">Tablets</li>
            <li @click="selectCategory('Appliances')">Appliances</li>
            <li @click="selectCategory('Accessories')">Accessories</li>
            <li @click="selectCategory('Electronics')">Electronics</li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // Import Nuxt's useRouter function

// Toggle the category dropdown visibility
const showCategoryDropdown = ref(false);
const toggleCategoryDropdown = () => {
  showCategoryDropdown.value = !showCategoryDropdown.value;
};

// Use the router to navigate
const router = useRouter();

// Handle category selection and navigation
const selectCategory = (category) => {
  // Construct the route path based on the selected category
  const categoryPath = category.toLowerCase().replace(/ & /g, '-').replace(/\s/g, '-');
  router.push(`/${categoryPath}`);  // Navigate to the category page
  showCategoryDropdown.value = false; // Hide the dropdown after selection
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Category dropdown */
.category-dropdown {
  position: absolute;
  top: 40px;
  left: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  width: 200px;
}

.category-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-dropdown li {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: black;
}

.category-dropdown li:hover {
  background-color: #007bff;
  color: white;
}
</style>