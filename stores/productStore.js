import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Laptop',
        price: 359.999,
        description: 'A great product',
        category: 'Laptops',
        image: 'laptop.png',
      },
      {
        id: 2,
        name: 'Phone',
        price: 275.999,
        description: 'Another great product',
        category: 'Smartphones',
        image: 'phone.jpg',
      },
      {
        id: 3,
        name: 'Fridge',
        price: 296.2,
        description: 'The best product',
        category: 'Accessories',
        image: 'fridge.jpg',
      },
      // Add remaining products...
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
