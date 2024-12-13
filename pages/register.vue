<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="onSubmit" class="register-form">
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
          <label for="password">Password</label>
          <input
            v-model="formValues.password"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <p v-if="errors.password">{{ errors.password }}</p>
        </div>
  
        <div>
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="formValues.confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
          />
          <p v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>
  
        <button type="submit">Register</button>
      </form>
  
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
  
      <p>
        Already have an account?
        <NuxtLink to="/login">Login here</NuxtLink>
      </p>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useForm } from "vee-validate";
  import * as yup from "yup";
  import { useUserStore } from "~/stores/userStore";
  
  // Validation schema
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  
  // Reactive form state
  const formValues = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  // Errors and validation
  const { errors, validate } = useForm({
    validationSchema,
  });
  
  // User store and router
  const userStore = useUserStore();
  const router = useRouter();
  
  // Success message
  const successMessage = ref("");
  
  // Form submission handler
  const onSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      userStore.registerUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      });
      successMessage.value = "Registration successful! Redirecting to login...";
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0069d9;
  }
  
  .success-message {
    color: green;
    font-size: 14px;
    margin-top: 10px;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }
  </style>
  