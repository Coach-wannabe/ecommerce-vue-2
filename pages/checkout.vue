<template>
    <div class="checkout-page">
      <h1>Checkout</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label for="firstName">First Name</label>
          <input
            v-model="formValues.firstName"
            id="firstName"
            type="text"
            placeholder="Enter your first name"
          />
          <p v-if="errors.firstName">{{ errors.firstName }}</p>
        </div>
  
        <div>
          <label for="lastName">Last Name</label>
          <input
            v-model="formValues.lastName"
            id="lastName"
            type="text"
            placeholder="Enter your last name"
          />
          <p v-if="errors.lastName">{{ errors.lastName }}</p>
        </div>
  
        <div>
          <label for="email">Email</label>
          <input
            v-model="formValues.email"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          <p v-if="errors.email">{{ errors.email }}</p>
        </div>
  
        <div>
          <label for="postalCode">Postal Code</label>
          <input
            v-model="formValues.postalCode"
            id="postalCode"
            type="text"
            placeholder="Enter your postal code"
          />
          <p v-if="errors.postalCode">{{ errors.postalCode }}</p>
        </div>
  
        <div>
          <label for="cardNumber">Card Number</label>
          <input
            v-model="formValues.cardNumber"
            id="cardNumber"
            type="text"
            placeholder="Enter your card number"
          />
          <p v-if="errors.cardNumber">{{ errors.cardNumber }}</p>
        </div>
  
        <button type="submit">Place Order</button>
      </form>
  
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useField, useForm, defineRule, configure } from "vee-validate";
  import * as yup from "yup";
  
  // Define validation schema using yup
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    postalCode: yup
      .string()
      .length(5, "Postal Code must be exactly 5 characters")
      .required("Postal Code is required"),
    cardNumber: yup
      .string()
      .min(16, "Card Number must be at least 16 characters")
      .required("Card Number is required"),
  });
  
  // Initialize form and errors
  const formValues = reactive({
    firstName: "",
    lastName: "",
    email: "",
    postalCode: "",
    cardNumber: "",
  });
  
  const { errors, validate } = useForm({
    validationSchema,
  });
  
  const successMessage = ref("");
  
  const onSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      successMessage.value = "Your order has been placed successfully!";
    } else {
      successMessage.value = ""; // Clear success message if validation fails
    }
  };
  </script>
  
  <style scoped>
  .checkout-page {
    padding: 40px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  input:focus {
    outline: none;
    border-color: #6200ea;
  }
  
  button {
    padding: 10px;
    background-color: #6200ea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #3700b3;
  }
  
  p {
    color: red;
    font-size: 12px;
  }
  
  .success-message {
    margin-top: 20px;
    color: green;
    font-size: 16px;
    font-weight: bold;
  }
  </style>
  