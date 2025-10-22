export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api'
    }
  }
})