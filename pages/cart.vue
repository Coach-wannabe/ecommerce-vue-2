<template>
    <div class="cart-page">
      <h1 class="page-title">Your Shopping Cart</h1>
      
      <!-- Slot for additional content -->
      <slot name="additional-content"></slot> 
  
      <!-- Cart Items -->
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="getImage(item.image)" class="cart-item-image" alt="Product image" />
          <div class="cart-item-details">
            <h3 class="product-name">{{ item.name }}</h3>
            <p class="product-price">{{ item.price }} Tg ({{ item.quantity }})</p>
            <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
        </div>
      </div>
  
      <!-- Cart Summary -->
      <div class="cart-summary">
        <p class="summary-title">Total Price: {{ cartTotal }} Tg</p>
        <button class="checkout-btn" @click="navigateToCheckout">Proceed to Checkout</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useProductStore } from '~/stores/productStore'; // Use product store for cart actions
  import { useRouter } from 'vue-router'; // For navigation
  
  const productStore = useProductStore();
  const router = useRouter();
  
  // Get cart items and total price from the store
  const cart = computed(() => productStore.cart);
  const cartTotal = computed(() => productStore.cartTotal);
  
  // Remove an item from the cart
  const removeFromCart = (productId) => {
    productStore.removeFromCart(productId);
  };
  
  // Navigate to checkout page
  const navigateToCheckout = () => {
    router.push('/checkout');
  };
  
  // Get image path
  const getImage = (imageName) => {
    return `/assets/images/${imageName}`;
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 40px;
    background-color: #f5f5f5;
  }
  
  .page-title {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item-image {
    width: 100px;
    margin-right: 20px;
    border-radius: 8px;
  }
  
  .cart-item-details {
    display: flex;
    flex-direction: column;
  }
  
  .product-name {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .product-price {
    font-size: 18px;
    color: #666;
    margin-top: 10px;
  }
  
  .remove-btn {
    background-color: #ff5722;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }
  
  .remove-btn:hover {
    background-color: #e64a19;
  }
  
  .cart-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  .summary-title {
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
  </style>
  