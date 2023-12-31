// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: ["@/assets/css/main.scss"],
    modules: ['@nuxtjs/tailwindcss'],
})