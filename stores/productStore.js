  import { defineStore } from "pinia";

  export const useProductStore = defineStore("productStore", {
    state: () => ({
      products: [
        { id: 1, name: "Laptop", price: 359.999, category: "Laptops", image: "laptop.png", rating: 2.5 },
        { id: 2, name: "Phone", price: 275.999, category: "Smartphones & Tablets", image: "phone.jpg", rating: 3.5 },
        { id: 3, name: "Fridge", price: 296.2, category: "Appliances", image: "fridge.jpg", rating: 4.5 },
        { id: 4, name: "Headphones", price: 48.9, category: "Accessories", image: "naushniki-sony.png", rating: 2.8 },
        { id: 5, name: "Air Conditioner", price: 1999.0, category: "Appliances", image: "cond.jpg", rating: 1.5 },
        { id: 6, name: "Tablet", price: 1999.0, category: "Smartphones & Tablets", image: "ipad.jpg", rating: 4.1 },
        { id: 7, name: "Iron", price: 200.999, category: "Appliances", image: "utug.png", rating: 5 },
        { id: 8, name: "Washing Machine", price: 1000.999, category: "Appliances", image: "stmach.png", rating: 4.5 },
        { id: 9, name: "TV", price: 2960.0, category: "Electronics", image: "tv.png", rating:4.6 },
        { id: 10, name: "Vacuum Cleaner", price: 62.0, category: "Appliances", image: "pul.jpg", rating: 3.8 },
        { id: 11, name: "Microwave", price: 120.0, category: "Appliances", image: "micr.jpg", rating: 2 },
        { id: 12, name: "Camera", price: 119.0, category: "Accessories", image: "camera.jpg" , rating: 3.5},
      ],
      cart: [], // Initialize as empty; cart data is populated from localStorage later
      selectedCategory: "All", // Default category
    }),
    actions: {
      // Initialize cart from localStorage on the client side
      initializeCart() {
        if (process.client) {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            this.cart = JSON.parse(savedCart);
          }
        }
      },

      // Add a product to the cart
      addToCart(product) {
        const existingItem = this.cart.find((item) => item.id === product.id);
        if (!existingItem) {
          this.cart.push({ ...product, quantity: 1 });
          this.saveCart();
        }
      },

      // Remove a product from the cart
      removeFromCart(productId) {
        this.cart = this.cart.filter((item) => item.id !== productId);
        this.saveCart();
      },

      // Update the quantity of a product in the cart
      updateQuantity(productId, quantity) {
        const item = this.cart.find((item) => item.id === productId);
        if (item) {
          item.quantity = quantity > 0 ? quantity : 1; // Prevent quantity from being less than 1
          this.saveCart();
        }
      },

      // Check if a product is in the cart
      isInCart(productId) {
        return this.cart.some((item) => item.id === productId);
      },

      // Save the cart to localStorage on the client side
      saveCart() {
        if (process.client) {
          localStorage.setItem("cart", JSON.stringify(this.cart));
        }
      },

      // Filter products by category
      filterByCategory(category) {
        this.selectedCategory = category;
      },
    },
    getters: {
      // Get filtered products based on the selected category
      filteredProducts() {
        if (this.selectedCategory === "All") return this.products;
        return this.products.filter((product) => product.category === this.selectedCategory);
      },

      // Calculate the total price of the cart
      cartTotal() {
        return this.cart
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2);
      },
    },
  });
