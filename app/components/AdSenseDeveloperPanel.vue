<!-- components/AdSenseDeveloperPanel.vue -->
<template>
  <div 
    v-if="isDevelopment" 
    class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border z-50"
  >
    <h3 class="text-sm font-semibold mb-3">AdSense 開發工具</h3>
    
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label class="text-sm">測試模式</label>
        <button
          @click="toggleTestMode"
          :class="[
            'px-3 py-1 rounded text-xs font-medium',
            isTestMode ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]"
        >
          {{ isTestMode ? '開啟' : '關閉' }}
        </button>
      </div>
      
      <div class="flex items-center justify-between">
        <label class="text-sm">Publisher ID</label>
        <span class="text-xs text-gray-600 font-mono">
          {{ currentPublisherId }}
        </span>
      </div>
      
      <div class="flex items-center justify-between">
        <label class="text-sm">廣告數量</label>
        <span class="text-xs text-gray-600">
          {{ adCount }}
        </span>
      </div>
      
      <button
        @click="refreshAllAds"
        class="w-full px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600"
      >
        重新載入廣告
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $adsense } = useNuxtApp()
const isDevelopment = process.env.NODE_ENV === 'development'

const isTestMode = ref($adsense.getTestMode())
const currentPublisherId = ref($adsense.config.publisherId)
const adCount = ref(0)

const toggleTestMode = () => {
  $adsense.toggleTestMode()
  isTestMode.value = $adsense.getTestMode()
}

const refreshAllAds = () => {
  $adsense.refreshAds()
}

// 計算頁面上的廣告數量
const updateAdCount = () => {
  adCount.value = document.querySelectorAll('.adsbygoogle').length
}

onMounted(() => {
  updateAdCount()
  
  // 監聽 DOM 變化
  const observer = new MutationObserver(() => {
    updateAdCount()
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>