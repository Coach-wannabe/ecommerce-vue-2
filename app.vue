<template>
  <div>
    <!-- Navigation -->
    <header class="navbar">
      <nav class="nav-links">
        <a href="/" class="nav-link">Home</a>
        <a href="/products" class="nav-link">Products</a>
        <a href="/cart" class="nav-link">Cart</a>
        <a
          v-if="!isAuthenticated"
          href="/login"
          class="nav-link"
        >
          Login
        </a>
        <a
          v-if="isAuthenticated"
          href="#"
          @click.prevent="logout"
          class="nav-link"
        >
          Logout
        </a>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="social-links">
        <a href="https://twitter.com/login" target="_blank">Twitter</a>
        <a href="https://instagram.com/accounts/login/" target="_blank">Instagram</a>
        <a href="https://facebook.com/login" target="_blank">Facebook</a>
        <a href="https://linkedin.com/login" target="_blank">LinkedIn</a>
      </div>
      <div class="footer-links">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

// Handle logout
const logout = () => {
  userStore.logout();
};
</script>

<style scoped>
/* General Layout */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

main {
  min-height: 80vh;
  padding: 20px;
}

/* Navigation Bar */
.navbar {
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffcc00;
}

/* Footer */
.footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

.footer a {
  color: #ffcc00;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
