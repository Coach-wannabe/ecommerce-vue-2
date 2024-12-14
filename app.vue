<template>
  <div class="app-container">
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
    <main class="content">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <!-- Social Media Links -->
        <div class="footer-section social-links">
          <a href="https://twitter.com/login" target="_blank" rel="noopener">Twitter</a>
          <a href="https://instagram.com/accounts/login/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://facebook.com/login" target="_blank" rel="noopener">Facebook</a>
          <a href="https://linkedin.com/login" target="_blank" rel="noopener">LinkedIn</a>
        </div>

        <!-- Additional Links -->
        <div class="footer-section extra-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/terms" target="_blank" rel="noopener">Terms of Service</a>
          <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>
        </div>

        <!-- Copyright -->
        <div class="footer-section copyright">
          © 2024 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useProductStore } from "~/stores/productStore";

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

const logout = () => {
  userStore.logout();
};

const productStore = useProductStore();

onMounted(() => {
  productStore.initializeCart();
});
</script>

<style scoped>
/* App Container for Sticky Footer Behavior */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
}

.content {
  flex-grow: 1; /* Pushes footer to the bottom when content is small */
  margin-top: 60px;
}

/* Navigation Bar */
.navbar {
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
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
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffcc00;
}

/* Footer Styling */
.footer {
  background-color: #333; /* Dark gray */
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between sections */
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Footer Sections */
.footer-section {
  margin: 10px 0;
}

/* Social Media Links */
.social-links a {
  color: #ffcc00; /* Golden color */
  margin: 0 10px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Additional Links */
.extra-links a {
  color: #ffcc00;
  margin: 0 10px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.extra-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Copyright Section */
.copyright {
  font-size: 12px;
  color: #aaa;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column; /* Stack items vertically */
    text-align: center;
    gap: 20px;
  }

  .footer-section {
    margin: 0;
  }
}
</style>
