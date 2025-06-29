<template>
  <view class="container">
    <view class="section">
      <view class="section-title">菜单按钮位置信息</view>
      <view class="info-box">
        <view class="info-item" v-for="(value, key) in menuButtonInfo" :key="key">
          <text class="info-label">{{ key }}:</text>
          <text class="info-value">{{ value }}</text>
        </view>
      </view>
      <button @click="getMenuButtonRect">获取菜单按钮位置信息</button>
    </view>

    <view class="section">
      <view class="section-title">菜单按钮宽度变化监听</view>
      <view class="status-box">
        <text class="status-label">监听状态:</text>
        <text class="status-value" :class="{ 'active': isListeningWeight }">{{ isListeningWeight ? '已开启' : '未开启'
        }}</text>
      </view>
      <view class="log-box">
        <view class="log-title">宽度变化日志:</view>
        <scroll-view class="log-content" scroll-y>
          <view v-for="(log, index) in weightChangeLogs" :key="index" class="log-item">
            {{ log }}
          </view>
        </scroll-view>
      </view>
      <view class="button-group">
        <button @click="onWeightChange">开启监听</button>
        <button @click="offWeightChange" class="btn-cancel">关闭监听</button>
      </view>
    </view>

    <view class="section">
      <view class="section-title">用户触发翻译监听</view>
      <view class="status-box">
        <text class="status-label">监听状态:</text>
        <text class="status-value" :class="{ 'active': isListeningTranslation }">{{ isListeningTranslation ? '已开启' :
          '未开启' }}</text>
      </view>
      <view class="log-box">
        <view class="log-title">翻译触发日志:</view>
        <scroll-view class="log-content" scroll-y>
          <view v-for="(log, index) in translationLogs" :key="index" class="log-item">
            {{ log }}
          </view>
        </scroll-view>
      </view>
      <view class="button-group">
        <button @click="onTranslation">开启翻译监听</button>
        <button @click="offTranslation" class="btn-cancel">关闭翻译监听</button>
      </view>
    </view>

    <view class="tips">
      <view class="tips-title">API 说明:</view>
      <view class="tips-content">
        <text class="tips-item">1. wx.getMenuButtonBoundingClientRect: 获取菜单按钮（右上角胶囊按钮）的位置信息</text>
        <text class="tips-item">2. wx.onMenuButtonBoundingClientRectWeightChange: 监听菜单按钮宽度变化事件</text>
        <text class="tips-item">3. wx.offMenuButtonBoundingClientRectWeightChange: 取消监听菜单按钮宽度变化事件</text>
        <text class="tips-item">4. wx.onOnUserTriggerTranslation: 监听用户触发翻译事件</text>
        <text class="tips-item">5. wx.offOnUserTriggerTranslation: 取消监听用户触发翻译事件</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 菜单按钮位置信息
const menuButtonInfo = ref({})

// 监听状态
const isListeningWeight = ref(false)
const isListeningTranslation = ref(false)

// 日志记录
const weightChangeLogs = ref([])
const translationLogs = ref([])

// 获取菜单按钮位置信息
const getMenuButtonRect = () => {
  try {
    const rect = wx.getMenuButtonBoundingClientRect()
    menuButtonInfo.value = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    }

    console.log('菜单按钮位置信息:', rect)
  } catch (error) {
    console.error('获取菜单按钮位置信息失败:', error)
    uni.showToast({
      title: '获取菜单按钮位置信息失败',
      icon: 'none'
    })
  }
}

// 菜单按钮宽度变化回调函数
const menuButtonWeightChangeCallback = (res) => {
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  // 确保 res 对象存在且包含 weight 属性
  if (res && res.weight !== undefined) {
    weightChangeLogs.value.push(`[${timeString}] 宽度变为: ${res.weight}`)
  } else {
    weightChangeLogs.value.push(`[${timeString}] 接收到宽度变化事件，但数据异常`)
  }
  console.log('菜单按钮宽度变化:', res)
}

// 用户触发翻译回调函数
const userTriggerTranslationCallback = (res) => {
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  // 确保 res 对象存在且包含 text 属性
  if (res && res.text) {
    translationLogs.value.push(`[${timeString}] 翻译内容: ${res.text}`)
  } else {
    translationLogs.value.push(`[${timeString}] 接收到翻译事件，但数据异常`)
  }
  console.log('用户触发翻译:', res)
}

// 开启菜单按钮宽度变化监听
const onWeightChange = () => {
  if (isListeningWeight.value) {
    uni.showToast({
      title: '监听已开启',
      icon: 'none'
    })
    return
  }

  try {
    wx.onMenuButtonBoundingClientRectWeightChange(menuButtonWeightChangeCallback)
    isListeningWeight.value = true

    weightChangeLogs.value.push('开始监听菜单按钮宽度变化')
    uni.showToast({
      title: '监听已开启',
      icon: 'success'
    })
  } catch (error) {
    console.error('开启菜单按钮宽度变化监听失败:', error)
    uni.showToast({
      title: '开启监听失败',
      icon: 'none'
    })
  }
}

// 关闭菜单按钮宽度变化监听
const offWeightChange = () => {
  if (!isListeningWeight.value) {
    uni.showToast({
      title: '监听未开启',
      icon: 'none'
    })
    return
  }

  try {
    wx.offMenuButtonBoundingClientRectWeightChange(menuButtonWeightChangeCallback)
    isListeningWeight.value = false

    weightChangeLogs.value.push('停止监听菜单按钮宽度变化')
    uni.showToast({
      title: '监听已关闭',
      icon: 'success'
    })
  } catch (error) {
    console.error('关闭菜单按钮宽度变化监听失败:', error)
    uni.showToast({
      title: '关闭监听失败',
      icon: 'none'
    })
  }
}

// 开启用户触发翻译监听
const onTranslation = () => {
  if (isListeningTranslation.value) {
    uni.showToast({
      title: '监听已开启',
      icon: 'none'
    })
    return
  }

  try {
    wx.onOnUserTriggerTranslation(userTriggerTranslationCallback)
    isListeningTranslation.value = true

    translationLogs.value.push('开始监听用户触发翻译')
    uni.showToast({
      title: '监听已开启',
      icon: 'success'
    })
  } catch (error) {
    console.error('开启用户触发翻译监听失败:', error)
    uni.showToast({
      title: '开启监听失败',
      icon: 'none'
    })
  }
}

// 关闭用户触发翻译监听
const offTranslation = () => {
  if (!isListeningTranslation.value) {
    uni.showToast({
      title: '监听未开启',
      icon: 'none'
    })
    return
  }

  try {
    wx.offOnUserTriggerTranslation(userTriggerTranslationCallback)
    isListeningTranslation.value = false

    translationLogs.value.push('停止监听用户触发翻译')
    uni.showToast({
      title: '监听已关闭',
      icon: 'success'
    })
  } catch (error) {
    console.error('关闭用户触发翻译监听失败:', error)
    uni.showToast({
      title: '关闭监听失败',
      icon: 'none'
    })
  }
}

// 页面加载时自动获取菜单按钮位置信息
onMounted(() => {
  getMenuButtonRect()
})

// 页面卸载时清理监听器
onUnmounted(() => {
  if (isListeningWeight.value) {
    wx.offMenuButtonBoundingClientRectWeightChange(menuButtonWeightChangeCallback)
  }

  if (isListeningTranslation.value) {
    wx.offOnUserTriggerTranslation(userTriggerTranslationCallback)
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .section {
    margin-bottom: 40rpx;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
      color: #333;
    }

    .info-box {
      background-color: #f8f9fa;
      padding: 20rpx;
      border-radius: 8rpx;
      margin-bottom: 20rpx;

      .info-item {
        display: flex;
        margin-bottom: 10rpx;

        .info-label {
          width: 120rpx;
          font-size: 26rpx;
          color: #666;
        }

        .info-value {
          flex: 1;
          font-size: 26rpx;
          color: #333;
        }
      }
    }

    .status-box {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .status-label {
        font-size: 28rpx;
        color: #666;
        margin-right: 20rpx;
      }

      .status-value {
        font-size: 28rpx;
        color: #999;
        font-weight: bold;

        &.active {
          color: #07c160;
        }
      }
    }

    .log-box {
      margin-bottom: 20rpx;

      .log-title {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 10rpx;
      }

      .log-content {
        height: 200rpx;
        background-color: #f8f9fa;
        padding: 20rpx;
        border-radius: 8rpx;

        .log-item {
          font-size: 24rpx;
          color: #666;
          margin-bottom: 10rpx;
          word-break: break-all;
        }
      }
    }

    .button-group {
      display: flex;
      gap: 20rpx;

      button {
        flex: 1;
        background-color: #07c160;
        color: #fff;
        border: none;
        font-size: 28rpx;

        &.btn-cancel {
          background-color: #f56c6c;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .tips {
    background-color: #f8f9fa;
    padding: 20rpx;
    border-radius: 8rpx;

    .tips-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    .tips-content {
      .tips-item {
        display: block;
        font-size: 24rpx;
        color: #666;
        margin-bottom: 10rpx;
        line-height: 1.5;
      }
    }
  }
}
</style>