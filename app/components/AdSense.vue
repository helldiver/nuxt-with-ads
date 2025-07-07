<!-- components/AdSense.vue -->
<template>
  <div ref="adContainer" :class="containerClass">
    <ins
      ref="adElement"
      class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="currentPublisherId"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="fullWidthResponsive"
      :data-adtest="shouldShowTestAd ? 'on' : undefined"
    ></ins>
    
    <!-- 開發模式提示 -->
    <div 
      v-if="shouldShowTestAd && showTestIndicator" 
      class="text-xs text-gray-500 mt-1 text-center"
    >
      測試廣告模式
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  width?: number | string
  height?: number | string
  fullWidthResponsive?: boolean
  containerClass?: string
  testMode?: boolean
  showTestIndicator?: boolean
  publisherId?: string
}

const props = withDefaults(defineProps<Props>(), {
  adFormat: 'auto',
  fullWidthResponsive: true,
  containerClass: '',
  showTestIndicator: true
})

const adElement = ref<HTMLElement>()
const adContainer = ref<HTMLElement>()

// 使用 AdSense composable
const { 
  isLoaded, 
  isTestMode, 
  publisherId, 
  loadAdSense, 
  pushAd,
  setTestMode,
  setPublisherId 
} = useAdSense()

// 計算當前的 Publisher ID
const currentPublisherId = computed(() => {
  return props.publisherId || publisherId.value
})

// 計算是否顯示測試廣告
const shouldShowTestAd = computed(() => {
  // 優先使用 props 的 testMode，其次使用 composable 的設定
  if (props.testMode !== undefined) {
    return props.testMode
  }
  return isTestMode.value
})

// 計算廣告樣式
const adStyle = computed(() => {
  const styles: string[] = ['display: block']
  
  if (props.width) {
    styles.push(`width: ${typeof props.width === 'number' ? props.width + 'px' : props.width}`)
  }
  
  if (props.height) {
    styles.push(`height: ${typeof props.height === 'number' ? props.height + 'px' : props.height}`)
  }
  
  return styles.join('; ')
})

// 載入廣告
const initializeAd = async () => {
  try {
    // 如果有自訂 Publisher ID，更新 composable 設定
    if (props.publisherId) {
      setPublisherId(props.publisherId)
    }
    
    // 載入 AdSense 腳本
    const loaded = await loadAdSense()
    if (!loaded) return
    
    // 等待 DOM 更新
    await nextTick()
    
    // 推送廣告
    if (adElement.value) {
      const adUnit = {
        slot: props.adSlot,
        format: props.adFormat,
        width: props.width,
        height: props.height,
        fullWidthResponsive: props.fullWidthResponsive,
        testMode: shouldShowTestAd.value
      }
      
      pushAd(adElement.value, adUnit)
    }
  } catch (error) {
    console.error('AdSense 初始化失敗:', error)
  }
}

// 監聽測試模式變化
watch(shouldShowTestAd, (newValue) => {
  if (adElement.value) {
    if (newValue) {
      adElement.value.setAttribute('data-adtest', 'on')
    } else {
      adElement.value.removeAttribute('data-adtest')
    }
  }
})

onMounted(() => {
  initializeAd()
})
</script>

<style scoped>
.adsbygoogle {
  background: transparent;
}
</style>