<template>
  <view class="container">
    <view class="header">
      <view class="title">wx.pageScrollTo 示例</view>
      <view class="subtitle">页面滚动API演示</view>
    </view>

    <view class="control-panel">
      <view class="input-group">
        <text class="label">滚动位置 (px):</text>
        <input type="number" v-model="scrollPosition" placeholder="输入滚动位置" />
      </view>

      <view class="input-group">
        <text class="label">滚动时长 (ms):</text>
        <input type="number" v-model="scrollDuration" placeholder="输入滚动时长" />
      </view>

      <view class="checkbox-group">
        <checkbox :checked="scrollWithAnimation" @tap="scrollWithAnimation = !scrollWithAnimation" />
        <text @tap="scrollWithAnimation = !scrollWithAnimation">使用动画效果</text>
      </view>

      <view class="button-group">
        <button @tap="scrollToPosition">滚动到指定位置</button>
        <button @tap="scrollToTop">滚动到顶部</button>
        <button @tap="scrollToBottom">滚动到底部</button>
      </view>

      <view class="selector-group">
        <text class="label">滚动到指定元素:</text>
        <view class="selector-buttons">
          <button @tap="scrollToElement('section1')">第一部分</button>
          <button @tap="scrollToElement('section2')">第二部分</button>
          <button @tap="scrollToElement('section3')">第三部分</button>
          <button @tap="scrollToElement('section4')">第四部分</button>
        </view>
      </view>
    </view>

    <view class="content">
      <view id="section1" class="section">
        <view class="section-title">第一部分</view>
        <view class="section-content">
          <text>这是第一部分的内容。wx.pageScrollTo API 可以让页面滚动到指定的位置。</text>
          <text>当前部分的ID: section1</text>
        </view>
      </view>

      <view id="section2" class="section">
        <view class="section-title">第二部分</view>
        <view class="section-content">
          <text>这是第二部分的内容。你可以通过指定滚动位置(scrollTop)来控制滚动到哪个位置。</text>
          <text>当前部分的ID: section2</text>
        </view>
      </view>

      <view id="section3" class="section">
        <view class="section-title">第三部分</view>
        <view class="section-content">
          <text>这是第三部分的内容。你可以通过设置duration来控制滚动动画的时长。</text>
          <text>当前部分的ID: section3</text>
        </view>
      </view>

      <view id="section4" class="section">
        <view class="section-title">第四部分</view>
        <view class="section-content">
          <text>这是第四部分的内容。你可以通过设置selector来滚动到指定的元素位置。</text>
          <text>当前部分的ID: section4</text>
        </view>
      </view>
    </view>

    <view class="tips">
      <view class="tips-title">wx.pageScrollTo 参数说明:</view>
      <view class="tips-item">
        <text class="param-name">scrollTop:</text>
        <text class="param-desc">滚动到页面的目标位置，单位为px</text>
      </view>
      <view class="tips-item">
        <text class="param-name">duration:</text>
        <text class="param-desc">滚动动画的时长，单位为ms，默认为300</text>
      </view>
      <view class="tips-item">
        <text class="param-name">selector:</text>
        <text class="param-desc">选择器，指定滚动到哪个元素，优先级高于scrollTop</text>
      </view>
      <view class="tips-item">
        <text class="param-name">offsetTop:</text>
        <text class="param-desc">偏移距离，需与selector配合使用，滚动到距离元素顶部offsetTop的位置</text>
      </view>
      <view class="tips-item">
        <text class="param-name">scrollWithAnimation:</text>
        <text class="param-desc">是否使用动画过渡，默认为true</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 滚动参数
const scrollPosition = ref(0)
const scrollDuration = ref(300)
const scrollWithAnimation = ref(true)

// 滚动到指定位置
const scrollToPosition = () => {
  if (!scrollPosition.value) {
    uni.showToast({
      title: '请输入滚动位置',
      icon: 'none'
    })
    return
  }

  wx.pageScrollTo({
    scrollTop: Number(scrollPosition.value),
    duration: Number(scrollDuration.value || 300),
    scrollWithAnimation: scrollWithAnimation.value
  })

  console.log('滚动到位置:', scrollPosition.value, '持续时间:', scrollDuration.value, '使用动画:', scrollWithAnimation.value)
}

// 滚动到顶部
const scrollToTop = () => {
  wx.pageScrollTo({
    scrollTop: 0,
    duration: Number(scrollDuration.value || 300),
    scrollWithAnimation: scrollWithAnimation.value
  })

  console.log('滚动到顶部', '持续时间:', scrollDuration.value, '使用动画:', scrollWithAnimation.value)
}

// 滚动到底部 (这里使用一个很大的值模拟滚动到底部)
const scrollToBottom = () => {
  wx.pageScrollTo({
    scrollTop: 10000,
    duration: Number(scrollDuration.value || 300),
    scrollWithAnimation: scrollWithAnimation.value
  })

  console.log('滚动到底部', '持续时间:', scrollDuration.value, '使用动画:', scrollWithAnimation.value)
}

// 滚动到指定元素
const scrollToElement = (elementId) => {
  wx.pageScrollTo({
    selector: `#${elementId}`,
    duration: Number(scrollDuration.value || 300),
    scrollWithAnimation: scrollWithAnimation.value,
    offsetTop: 20 // 设置一个偏移量，让元素不会贴着顶部
  })

  console.log('滚动到元素:', elementId, '持续时间:', scrollDuration.value, '使用动画:', scrollWithAnimation.value)
}

// 页面加载完成后，添加一些填充内容使页面可滚动
onMounted(() => {
  console.log('页面加载完成')
})
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .header {
    margin-bottom: 30rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }

    .subtitle {
      font-size: 28rpx;
      color: #666;
      margin-top: 10rpx;
    }
  }

  .control-panel {
    background-color: #f8f9fa;
    padding: 20rpx;
    border-radius: 12rpx;
    margin-bottom: 30rpx;

    .input-group {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .label {
        width: 200rpx;
        font-size: 28rpx;
        color: #333;
      }

      input {
        flex: 1;
        height: 70rpx;
        border: 1px solid #ddd;
        border-radius: 8rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
        background-color: #fff;
      }
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      text {
        font-size: 28rpx;
        color: #333;
        margin-left: 10rpx;
      }
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
      margin-bottom: 20rpx;

      button {
        flex: 1;
        min-width: 200rpx;
        background-color: #007AFF;
        color: #fff;
        font-size: 28rpx;
        padding: 15rpx 0;
        border-radius: 8rpx;

        &:active {
          opacity: 0.8;
        }
      }
    }

    .selector-group {
      .label {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 15rpx;
        display: block;
      }

      .selector-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 15rpx;

        button {
          flex: 1;
          min-width: 150rpx;
          background-color: #4CAF50;
          color: #fff;
          font-size: 26rpx;
          padding: 12rpx 0;
          border-radius: 8rpx;

          &:active {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .content {
    margin-bottom: 30rpx;

    .section {
      margin-bottom: 50rpx;
      padding: 30rpx;
      background-color: #fff;
      border-radius: 12rpx;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

      &:nth-child(1) {
        background-color: #e3f2fd;
      }

      &:nth-child(2) {
        background-color: #e8f5e9;
      }

      &:nth-child(3) {
        background-color: #fff3e0;
      }

      &:nth-child(4) {
        background-color: #f3e5f5;
      }

      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        color: #333;
      }

      .section-content {
        text {
          font-size: 28rpx;
          color: #666;
          line-height: 1.6;
          display: block;
          margin-bottom: 10rpx;
        }
      }
    }
  }

  .tips {
    background-color: #f8f9fa;
    padding: 20rpx;
    border-radius: 12rpx;

    .tips-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 15rpx;
    }

    .tips-item {
      margin-bottom: 15rpx;

      .param-name {
        font-size: 26rpx;
        font-weight: bold;
        color: #007AFF;
        margin-right: 10rpx;
      }

      .param-desc {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}
</style>