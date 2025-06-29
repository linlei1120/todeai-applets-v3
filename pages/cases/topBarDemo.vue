<template>
  <view class="container">
    <view class="input-group">
      <text>置顶栏文本：</text>
      <input type="text" v-model="topBarText" placeholder="请输入置顶栏文本" />
    </view>

    <view class="button-group">
      <button @click="setTopBarText">设置置顶栏文本</button>
      <button @click="clearTopBarText">清除置顶栏文本</button>
    </view>

    <view class="tips">
      <text class="tips-title">注意事项：</text>
      <text class="tips-item">1. 调用成功后，将持续显示topBarText文本</text>
      <text class="tips-item">2. 文本显示5秒后自动消失</text>
      <text class="tips-item">3. 文本长度限制为4-8个汉字长度</text>
      <text class="tips-item">4. 一个小程序中最多可以同时设置5个置顶栏</text>
      <text class="tips-item">5. 可以在任意页面调用该接口</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const topBarText = ref('')

// 设置置顶栏文本
const setTopBarText = () => {
  if (!topBarText.value) {
    uni.showToast({
      title: '请输入置顶栏文本',
      icon: 'none'
    })
    return
  }

  // 检查文本长度
  if (topBarText.value.length < 4 || topBarText.value.length > 8) {
    uni.showToast({
      title: '文本长度需要在4-8个汉字之间',
      icon: 'none'
    })
    return
  }

  wx.setTopBarText({
    text: topBarText.value,
    success: () => {
      uni.showToast({
        title: '设置成功',
        icon: 'success'
      })
    },
    fail: (err) => {
      uni.showToast({
        title: '设置失败：' + err.errMsg,
        icon: 'none'
      })
    },
    complete: () => {
      console.log('setTopBarText 调用完成')
    }
  })
}

// 清除置顶栏文本
const clearTopBarText = () => {
  wx.setTopBarText({
    text: '',
    success: () => {
      uni.showToast({
        title: '清除成功',
        icon: 'success'
      })
      topBarText.value = ''
    },
    fail: (err) => {
      uni.showToast({
        title: '清除失败：' + err.errMsg,
        icon: 'none'
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    text {
      width: 150rpx;
      font-size: 28rpx;
    }

    input {
      flex: 1;
      height: 70rpx;
      border: 1px solid #dcdfe6;
      border-radius: 8rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
    }
  }

  .button-group {
    display: flex;
    gap: 20rpx;
    margin-bottom: 40rpx;

    button {
      flex: 1;
      background-color: #007AFF;
      color: #fff;
      border: none;
      padding: 20rpx;
      border-radius: 8rpx;

      &:active {
        background-color: #0056b3;
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
      color: #303133;
      margin-bottom: 10rpx;
      display: block;
    }

    .tips-item {
      font-size: 24rpx;
      color: #606266;
      margin-bottom: 10rpx;
      display: block;
      line-height: 1.5;
    }
  }
}
</style>