import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
      users: [
        { email: "test@example.com", password: "password123" }, // Sample user
      ],
      currentUser: null,
    }),
    actions: {
      registerUser(newUser) {
        this.users.push(newUser);
      },
      login(email, password) {
        const user = this.users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          this.currentUser = user;
          return true;
        }
        return false;
      },
      logout() {
        this.currentUser = null;
      },
    },
    getters: {
      isAuthenticated: (state) => !!state.currentUser,
    },
  });  