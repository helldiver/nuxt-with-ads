<!-- pages/index.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">AdSense 測試頁面</h1>
    
    <!-- 控制面板 -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 class="text-lg font-semibold mb-4">廣告控制</h2>
      <div class="flex gap-4">
        <button
          @click="toggleGlobalTestMode"
          :class="[
            'px-4 py-2 rounded font-medium',
            globalTestMode ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
          ]"
        >
          {{ globalTestMode ? '測試模式：開啟' : '測試模式：關閉' }}
        </button>
        
        <button
          @click="refreshAllAds"
          class="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
        >
          重新載入廣告
        </button>
      </div>
    </div>
    
    <!-- 不同配置的廣告 -->
    <div class="space-y-8">
      <!-- 全域測試模式廣告 -->
      <AdSense
        ad-slot="1234567890"
        ad-format="horizontal"
        container-class="bg-gray-50 p-4 rounded"
      />
      
      <!-- 強制測試模式廣告 -->
      <AdSense
        ad-slot="0987654321"
        ad-format="rectangle"
        :width="300"
        :height="250"
        :test-mode="true"
        container-class="bg-blue-50 p-4 rounded"
      />
      
      <!-- 強制生產模式廣告 -->
      <AdSense
        ad-slot="1122334455"
        ad-format="auto"
        :test-mode="false"
        container-class="bg-green-50 p-4 rounded"
      />
      
      <!-- 自訂 Publisher ID 的廣告 -->
      <AdSense
        ad-slot="5566778899"
        ad-format="vertical"
        publisher-id="ca-pub-1111111111111111"
        container-class="bg-yellow-50 p-4 rounded"
      />
    </div>
    
    <!-- 開發工具面板 -->
    <AdSenseDeveloperPanel />
  </div>
</template>

<script setup lang="ts">
const { $adsense } = useNuxtApp()

const globalTestMode = ref($adsense.getTestMode())

const toggleGlobalTestMode = () => {
  $adsense.toggleTestMode()
  globalTestMode.value = $adsense.getTestMode()
}

const refreshAllAds = () => {
  $adsense.refreshAds()
}
</script>