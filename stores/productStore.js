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
    cart: [], // Initialize as empty; we'll load from localStorage on the client
  }),

  getters: {
    cartTotal(state) {
      return state.cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(3);
    },
    totalItems(state) {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
  },

  actions: {
    loadCartFromLocalStorage() {
      if (process.client) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          this.cart = JSON.parse(storedCart);
        }
      }
    },

    saveCartToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },

    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCartToLocalStorage();
    },

    removeFromCart(productId) {
      const existingItem = this.cart.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          this.cart = this.cart.filter((item) => item.id !== productId);
        }
        this.saveCartToLocalStorage();
      }
    },

    clearCart() {
      this.cart = [];
      this.saveCartToLocalStorage();
    },
  },
});
