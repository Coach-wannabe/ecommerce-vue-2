import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [
      { id: 1, name: "Laptop", price: 359.999, category: "Laptops", image: "laptop.png", rating: 4.2 },
      { id: 2, name: "Apple iPhone 15 Natural Titanium", price: 719.999, category: "Smartphones", model: "Apple", image: "iphone_titnium.jpg", rating: 4.8 },
      { id: 3, name: "Apple iPhone 11 Black", price: 269.999, category: "Smartphones", model: "Apple", image: "iphone_black.jpg", rating: 4.1 },
      { id: 4, name: "Apple iPhone 13 Midnight", price: 299.999, category: "Smartphones", model: "Apple", image: "iphone_midnight.jpg", rating: 4.5 },
      { id: 5, name: "Apple iPhone 14 Midnight", price: 399.999, category: "Smartphones", model: "Apple", image: "iphone_midnight14.jpg", rating: 4.3 },
      { id: 6, name: "Apple iPhone 16 Pro 8 Desert Titanium", price: 769.999, category: "Smartphones", model: "Apple", image: "iphone_desert.jpg", rating: 4.9 },
      { id: 7, name: "Fridge", price: 296.2, category: "Appliances", image: "fridge.jpg", rating: 3.8 },
      { id: 8, name: "Air Conditioner", price: 1999.0, category: "Appliances", image: "cond.jpg", rating: 4.2 },
      { id: 9, name: "Tablet", price: 1999.0, category: "Tablets", image: "ipad.jpg", rating: 4.4 },
      { id: 10, name: "Iron", price: 200.999, category: "Appliances", image: "utug.png", rating: 3.6 },
      { id: 11, name: "Washing Machine", price: 1000.999, category: "Appliances", image: "stmach.png", rating: 4.1 },
      { id: 12, name: "TV", price: 2960.0, category: "Electronics", image: "tv.png", rating: 4.7 },
      { id: 13, name: "Vacuum Cleaner", price: 62.0, category: "Appliances", image: "pul.jpg", rating: 3.9 },
      { id: 14, name: "Microwave", price: 120.0, category: "Appliances", image: "micr.jpg", rating: 4.0 },
      { id: 15, name: "Camera", price: 119.0, category: "Accessories", image: "camera.jpg", rating: 4.3 },
      { id: 16, name: "Apple iPhone 15 Blue", price: 514.999, category: "Smartphones", model: "Apple", image: "iphone_15blue.jpg", rating: 4.5 },
      { id: 17, name: "Apple iPhone 11 White", price: 234.999, category: "Smartphones", model: "Apple", image: "iphone_11white.jpg", rating: 4.0 },
      { id: 18, name: "Apple iPhone 16 Plus Ultramarine", price: 744.999, category: "Smartphones", model: "Apple", image: "iphone_16ultrablabla.jpg", rating: 4.9 },
      { id: 19, name: "Apple iPhone 12 Purple", price: 299.999, category: "Smartphones", model: "Apple", image: "iphone_12.webp", rating: 4.6 },
      { id: 20, name: "Apple iPhone 14 Midnight", price: 399.999, category: "Smartphones", model: "Apple", image: "iphone_14midnight.jpg", rating: 4.7 },
      { id: 21, name: "Apple iPhone 16 Pink", price: 594.999, category: "Smartphones", model: "Apple", image: "iphone_16pink.jpg", rating: 4.3 },
      { id: 22, name: "Apple iPhone 16 Teal", price: 669.999, category: "Smartphones", model: "Apple", image: "iphone_16teal.jpg", rating: 4.5 },
      { id: 23, name: "Samsung Galaxy A25 5G Light Blue", price: 104.899, category: "Smartphones", model: "Samsung", image: "samsung_25light.jpg", rating: 4.2 },
      { id: 24, name: "Samsung Galaxy A05s Light Violet", price: 64.999, category: "Smartphones", model: "Samsung", image: "samsung_a05.jpg", rating: 3.8 },
      { id: 25, name: "Samsung Galaxy A16 Black", price: 119.999, category: "Smartphones", model: "Samsung", image: "samsung_a16.jpg", rating: 4.0 },
      { id: 26, name: "Samsung Galaxy Z Flip Yellow", price: 499.899, category: "Smartphones", model: "Samsung", image: "samsung_flip_yellow.jpg", rating: 4.7 },
      { id: 27, name: "Samsung Galaxy M15 Gray", price: 87.899, category: "Smartphones", model: "Samsung", image: "samsung_m15_gray.jpg", rating: 3.9 },
      { id: 28, name: "Samsung Galaxy S24 Ultra Titanium Black", price: 709.899, category: "Smartphones", model: "Samsung", image: "samsung_s24.webp", rating: 4.9 },
    ],
    cart: [],
    selectedCategory: "All",
    selectedPhoneModel: "All",
  }),

  actions: {
    initializeCart() {
      if (process.client) {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          this.cart = JSON.parse(savedCart);
        }
      }
    },

    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (!existingItem) {
        this.cart.push({ ...product, quantity: 1 });
        this.saveCart();
      }
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      this.saveCart();
    },

    updateQuantity(productId, quantity) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
        this.saveCart();
      }
    },

    isInCart(productId) {
      return this.cart.some((item) => item.id === productId);
    },

    saveCart() {
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },

    filterByCategory(category) {
      this.selectedCategory = category;
    },

    filterByPhoneModel(model) {
      this.selectedPhoneModel = model;
    },
  },

  getters: {
    filteredProducts() {
      let filtered = this.products;
      if (this.selectedCategory !== "All") {
        filtered = filtered.filter((product) => product.category === this.selectedCategory);
      }
      if (this.selectedCategory === "Smartphones" && this.selectedPhoneModel !== "All") {
        filtered = filtered.filter((product) => product.model === this.selectedPhoneModel);
      }
      return filtered;
    },

    cartTotal() {
      return this.cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
});
