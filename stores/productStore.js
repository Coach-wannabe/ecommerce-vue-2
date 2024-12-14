import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [
      { id: 1, name: "Laptop", price: 359.999, category: "Laptops", image: "laptop.png" },
      { id: 2, name: "Phone (Samsung)", price: 275.999, category: "Smartphones", model: "Samsung", image: "phone-samsung.jpg" },
      { id: 3, name: "Apple iPhone 11 Black", price: 269.999, category: "Smartphones", model: "Apple", image: "iphone_black.jpg" },
      { id: 4, name: "Apple iPhone 13 Midnight", price: 299.999, category: "Smartphones", model: "Apple", image: "iphone_midnight.jpg" },
      { id: 5, name: "Apple iPhone 14 Midnight", price: 399.999, category: "Smartphones", model: "Apple", image: "iphone_midnight14.jpg" },
      { id: 6, name: "Apple iPhone 16 Pro 8 Desert Titanium", price: 769.999, category: "Smartphones", model: "Apple", image: "iphone_desert.jpg" },
      { id: 7, name: "Fridge", price: 296.2, category: "Appliances", image: "fridge.jpg" },
      { id: 8, name: "Air Conditioner", price: 1999.0, category: "Appliances", image: "cond.jpg" },
      { id: 9, name: "Tablet", price: 1999.0, category: "Tablets", image: "ipad.jpg" },
      { id: 10, name: "Iron", price: 200.999, category: "Appliances", image: "utug.png" },
      { id: 11, name: "Washing Machine", price: 1000.999, category: "Appliances", image: "stmach.png" },
      { id: 12, name: "TV", price: 2960.0, category: "Electronics", image: "tv.png" },
      { id: 13, name: "Vacuum Cleaner", price: 62.0, category: "Appliances", image: "pul.jpg" },
      { id: 14, name: "Microwave", price: 120.0, category: "Appliances", image: "micr.jpg" },
      { id: 15, name: "Camera", price: 119.0, category: "Accessories", image: "camera.jpg" },
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
