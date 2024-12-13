<template>
    <div class="cart-page">
      <h1>Your Shopping Cart</h1>
      <div v-if="cart.length > 0">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img
            :src="`/assets/images/${item.image}`"
            alt="Product Image"
            class="cart-item-image"
          />
          <div class="cart-item-details">
            <h3 class="product-name">{{ item.name }}</h3>
            <p class="product-price">Price: {{ item.price }} Tg</p>
            <div class="quantity-wrapper">
              <label for="quantity">Quantity:</label>
              <input
                type="number"
                v-model.number="item.quantity"
                @input="updateQuantity(item.id, item.quantity)"
                min="1"
                class="quantity-input"
              />
            </div>
            <p class="item-total">
              Total: {{ (item.price * item.quantity).toFixed(2) }} Tg
            </p>
            <button @click="removeFromCart(item.id)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Total: {{ cartTotal }} Tg</h2>
          <button class="checkout-btn" @click="goToCheckout">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useProductStore } from "~/stores/productStore";
  
  // Access the product store
  const productStore = useProductStore();
  const cart = computed(() => productStore.cart);
  const cartTotal = computed(() => productStore.cartTotal);
  
  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    productStore.updateQuantity(productId, quantity);
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    productStore.removeFromCart(productId);
  };
  
  // Router instance for navigation
  const router = useRouter();
  const goToCheckout = () => {
    router.push("/checkout");
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 40px;
    background-color: #f5f5f5;
  }
  
  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .cart-item {
    display: flex;
    align-items: flex-start;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .cart-item-image {
    width: 100px;
    margin-right: 20px;
    border-radius: 8px;
  }
  
  .cart-item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .product-name {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .product-price,
  .item-total {
    font-size: 16px;
    color: #666;
    margin-top: 10px;
  }
  
  .quantity-wrapper {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .quantity-wrapper label {
    margin-right: 10px;
    font-size: 14px;
  }
  
  .quantity-input {
    width: 60px;
    padding: 5px;
    font-size: 14px;
  }
  
  .remove-btn {
    background-color: #ff5722;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }
  
  .remove-btn:hover {
    background-color: #e64a19;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  
  .cart-summary h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .checkout-btn {
    background-color: #6200ea;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .checkout-btn:hover {
    background-color: #3700b3;
  }
  
  p {
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  </style>
  