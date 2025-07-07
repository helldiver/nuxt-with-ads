// composables/useAdSense.ts
export interface AdSenseConfig {
  publisherId: string
  testMode?: boolean
  pageLevel?: boolean
  autoAds?: boolean
}

export interface AdUnit {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  width?: number | string
  height?: number | string
  fullWidthResponsive?: boolean
  testMode?: boolean
}

export const useAdSense = (config?: AdSenseConfig) => {
  const isLoaded = ref(false)
  const isTestMode = ref(config?.testMode ?? true)
  const publisherId = ref(config?.publisherId ?? 'ca-pub-0000000000000000')
  
  // 從環境變數或配置中獲取測試模式
  const runtimeConfig = useRuntimeConfig()
  const globalTestMode = runtimeConfig.public?.adsense?.testMode ?? true
  
  const loadAdSense = async (options?: { forceReload?: boolean }) => {
    if (isLoaded.value && !options?.forceReload) return true
    
    try {
      await useScript(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId.value}`)
      
      isLoaded.value = true
      return true
    } catch (error) {
      console.error('AdSense 載入失敗:', error)
      return false
    }
  }
  
  const pushAd = (element: HTMLElement, adUnit: AdUnit) => {
    if (!window.adsbygoogle || !element) return false
    
    try {
      // 設置廣告測試模式
      const testMode = adUnit.testMode ?? isTestMode.value ?? globalTestMode
      
      if (testMode) {
        element.setAttribute('data-adtest', 'on')
      } else {
        element.removeAttribute('data-adtest')
      }
      
      window.adsbygoogle.push({})
      return true
    } catch (error) {
      console.error('廣告推送失敗:', error)
      return false
    }
  }
  
  const setTestMode = (enabled: boolean) => {
    isTestMode.value = enabled
  }
  
  const setPublisherId = (id: string) => {
    publisherId.value = id
  }
  
  return {
    isLoaded: readonly(isLoaded),
    isTestMode: readonly(isTestMode),
    publisherId: readonly(publisherId),
    loadAdSense,
    pushAd,
    setTestMode,
    setPublisherId
  }
}

// TypeScript 聲明
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}