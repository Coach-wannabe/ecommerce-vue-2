import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
        {
            id: 1,
            name: "Laptop",
            price: 359.999,
            description: "A powerful and portable laptop for professionals.",
            category: "Laptops",
            image: "laptop.png",
          },
          {
            id: 2,
            name: "Phone",
            price: 275.999,
            description: "A sleek smartphone with high-resolution camera.",
            category: "Smartphones",
            image: "phone.jpg",
          },
          {
            id: 3,
            name: "Fridge",
            price: 296.2,
            description: "A spacious and energy-efficient fridge.",
            category: "Appliances",
            image: "fridge.jpg",
          },
          {
            id: 4,
            name: "Headphones",
            price: 48.9,
            description: "Noise-cancelling headphones for immersive sound.",
            category: "Accessories",
            image: "naushniki-sony.png",
          },
          {
            id: 5,
            name: "Air Conditioner",
            price: 1999.0,
            description: "Powerful air conditioner for comfortable cooling.",
            category: "Appliances",
            image: "cond.jpg",
          },
          {
            id: 6,
            name: "Tablet",
            price: 1999.0,
            description: "A versatile tablet for work and entertainment.",
            category: "Smartphones",
            image: "ipad.jpg",
          },
          {
            id: 7,
            name: "Iron",
            price: 200.999,
            description: "An efficient and durable steam iron.",
            category: "Appliances",
            image: "utug.png",
          },
          {
            id: 8,
            name: "Washing Machine",
            price: 1000.999,
            description: "A high-capacity washing machine for large loads.",
            category: "Appliances",
            image: "stmach.png",
          },
          {
            id: 9,
            name: "TV",
            price: 2960.0,
            description: "A large-screen smart TV with stunning visuals.",
            category: "Electronics",
            image: "tv.png",
          },
          {
            id: 10,
            name: "Vacuum Cleaner",
            price: 62.0,
            description: "A lightweight and powerful vacuum cleaner.",
            category: "Appliances",
            image: "pul.jpg",
          },
          {
            id: 11,
            name: "Microwave",
            price: 120.0,
            description: "Compact and efficient microwave oven.",
            category: "Appliances",
            image: "micr.jpg",
          },
          {
            id: 12,
            name: "Camera",
            price: 119.0,
            description: "High-quality camera for professional photography.",
            category: "Electronics",
            image: "camera.jpg",
          },
    ],
    cart: [], // Persist cart in localStorage
  }),

  actions: {
    initializeCart() {
      if (process.client) {
        // Only run this on the client-side
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
        // Only save to localStorage on the client-side
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
  },
  getters: {
    cartTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ).toFixed(2);
    },
  },
});