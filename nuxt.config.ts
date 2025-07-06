// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-adsense',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  googleAdsense: {
    id: 'ca-pub-8547631167659534',
    test: false,
  },
});