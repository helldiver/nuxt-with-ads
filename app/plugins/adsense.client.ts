// plugins/adsense.client.ts
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  
  // 全域 AdSense 設定
  const adsenseConfig = {
    publisherId: runtimeConfig.public.adsense.publisherId || 'ca-google',
    testMode: runtimeConfig.public.adsense.testMode || false
  }
  
  // 提供全域廣告管理功能
  return {
    provide: {
      adsense: {
        config: adsenseConfig,
        
        // 切換測試模式
        toggleTestMode: (enabled?: boolean) => {
          const { setTestMode } = useAdSense()
          const newMode = enabled ?? !adsenseConfig.testMode
          setTestMode(newMode)
          adsenseConfig.testMode = newMode
          
          // 重新載入頁面上的所有廣告
          if (window.adsbygoogle) {
            window.adsbygoogle.length = 0
            const ads = document.querySelectorAll('.adsbygoogle')
            ads.forEach(ad => {
              if (newMode) {
                ad.setAttribute('data-adtest', 'on')
              } else {
                ad.removeAttribute('data-adtest')
              }
              window.adsbygoogle.push({})
            })
          }
        },
        
        // 獲取當前測試模式狀態
        getTestMode: () => adsenseConfig.testMode,
        
        // 重新載入所有廣告
        refreshAds: () => {
          if (window.adsbygoogle) {
            const ads = document.querySelectorAll('.adsbygoogle')
            ads.forEach(() => {
              window.adsbygoogle.push({})
            })
          }
        }
      }
    }
  }
})