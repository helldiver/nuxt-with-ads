// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    // '@nuxtjs/google-adsense',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/scripts',
  ],
  // googleAdsense: {
  //   id: 'ca-pub-8547631167659534',
  //   test: false,
  // },
  scripts: {
    registry: {
      googleAdsense: {
        client: "ca-google",
        autoAds: true,
      },
    },
  },
  ssr: true,
  runtimeConfig: {
    // 伺服器端環境變數
    adsense: {
      publisherId: process.env.ADSENSE_PUBLISHER_ID || 'ca-google',
      secretKey: process.env.ADSENSE_SECRET_KEY || ''
    },
    
    // 客戶端環境變數
    public: {
      adsense: {
        publisherId: process.env.NUXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-google',
        testMode: process.env.NODE_ENV === 'development' || process.env.NUXT_PUBLIC_ADSENSE_TEST_MODE === 'true'
      }
    }
  },
});