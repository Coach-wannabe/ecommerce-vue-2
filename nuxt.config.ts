export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],

  ssr: true,

  router: {
    options: {
      strict: true,
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "/assets/styles.css", // Correct reference for public directory
        },
      ],
    },
  },

  vite: {
    clearScreen: false,
  },

  // Remove the following line
  // plugins: ["~/plugins/initCart.client.js"],
});
