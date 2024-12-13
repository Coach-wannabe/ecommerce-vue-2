<template>
    <div class="cart-page">
      <h1>Your Shopping Cart</h1>
  
      <!-- Check if cart is empty -->
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty. Start shopping!</p>
      </div>
  
      <!-- Cart Items -->
      <div v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <img :src="`/assets/images/${item.image}`" class="cart-item-image" alt="Product image" />
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p>Price: {{ item.price }} Tg</p>
            <div class="quantity-control">
              <button @click="decreaseQuantity(item)">-</button>
              <input type="number" v-model.number="item.quantity" @change="updateQuantity(item)" />
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
        </div>
  
        <!-- Cart Summary -->
        <div class="cart-summary">
          <p>Total Price: {{ cartTotal }} Tg</p>
          <button class="checkout-btn" @click="proceedToCheckout">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useToast } from "vue-toastification";
  import { useProductStore } from "~/stores/productStore";
  
  // Toast setup
  const toast = useToast();
  
  // Product store setup
  const productStore = useProductStore();
  const cartItems = computed(() => productStore.cart);
  const cartTotal = computed(() => productStore.cartTotal);
  
  // Methods
  const removeFromCart = (productId) => {
    const product = cartItems.value.find((item) => item.id === productId);
    productStore.removeFromCart(productId);
    toast.info(`${product.name} removed from the cart.`);
  };
  
  const increaseQuantity = (item) => {
    productStore.updateQuantity(item.id, item.quantity + 1);
    toast.success(`Increased quantity of ${item.name}.`);
  };
  
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      productStore.updateQuantity(item.id, item.quantity - 1);
      toast.info(`Decreased quantity of ${item.name}.`);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const updateQuantity = (item) => {
    if (item.quantity < 1) {
      removeFromCart(item.id);
    } else {
      productStore.updateQuantity(item.id, item.quantity);
      toast.success(`${item.name} quantity updated.`);
    }
  };
  
  const proceedToCheckout = () => {
    toast.success("Proceeding to checkout!");
    // Redirect to checkout page (assumes routing is configured)
    navigateTo("/checkout");
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .empty-cart {
    text-align: center;
    padding: 50px;
    font-size: 18px;
    color: #666;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item-image {
    width: 100px;
    height: auto;
    border-radius: 8px;
    margin-right: 20px;
  }
  
  .cart-item-details {
    flex-grow: 1;
  }
  
  .cart-item-details h3 {
    margin: 0;
    font-size: 18px;
  }
  
  .cart-item-details p {
    margin: 5px 0;
    color: #555;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  .quantity-control button {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
  
  .quantity-control button:hover {
    background: #0056b3;
  }
  
  .quantity-control input {
    width: 50px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 10px;
  }
  
  .remove-btn {
    background: #ff0000;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .remove-btn:hover {
    background: #cc0000;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
  }
  
  .checkout-btn {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .checkout-btn:hover {
    background: #0056b3;
  }
  </style>
  