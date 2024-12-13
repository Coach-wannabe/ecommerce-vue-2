<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit" class="login-form">
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
          <label for="password">Password</label>
          <input
            v-model="formValues.password"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <p v-if="errors.password">{{ errors.password }}</p>
        </div>
  
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
  
        <button type="submit">Login</button>
  
        <p>
          Don't have an account?
          <NuxtLink to="/register">Register here</NuxtLink>
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useForm } from "vee-validate";
  import * as yup from "yup";
  import { useUserStore } from "~/stores/userStore";
  
  // Form validation schema
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  
  // Reactive form state
  const formValues = reactive({
    email: "",
    password: "",
  });
  
  // Errors and validation
  const { errors, validate } = useForm({
    validationSchema,
  });
  
  // User store and router
  const userStore = useUserStore();
  const router = useRouter();
  
  // Login error message
  const loginError = ref("");
  
  // Form submission handler
  const onSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      const success = await userStore.login(formValues.email, formValues.password);
      if (success) {
        router.push("/products");
      } else {
        loginError.value = "Invalid email or password.";
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
  }
  
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }
  
  label {
    font-size: 16px;
    margin-bottom: 8px;
    color: #555;
  }
  
  input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 100%;
  }
  
  input:focus {
    outline: none;
    border-color: #6200ea;
  }
  
  button {
    background-color: #6200ea;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #3700b3;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 14px;
    color: #555;
    margin-top: 20px;
  }
  
  a {
    color: #6200ea;
    text-decoration: none;
    font-weight: bold;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  