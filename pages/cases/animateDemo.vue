<template>
  <view class="container">
    <view class="animation-element" :animation="animationData">Hello Animation!</view>

    <view class="button-group">
      <button @click="rotateAnimation">旋转动画</button>
      <button @click="scaleAnimation">缩放动画</button>
      <button @click="translateAnimation">平移动画</button>
      <button @click="opacityAnimation">透明度动画</button>
      <button @click="multipleAnimation">组合动画</button>
      <button @click="resetAnimation">重置</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const animationData = ref({})
let animation = null

// 创建动画实例
const initAnimation = () => {
  animation = wx.createAnimation({
    duration: 1000, // 动画持续时间
    timingFunction: 'ease', // 动画效果
    delay: 0 // 动画延迟时间
  })
}

// 旋转动画
const rotateAnimation = () => {
  initAnimation()
  animation.rotate(180).step()
  animationData.value = animation.export()
}

// 缩放动画
const scaleAnimation = () => {
  initAnimation()
  animation.scale(1.5, 1.5).step()
  animationData.value = animation.export()
}

// 平移动画
const translateAnimation = () => {
  initAnimation()
  animation.translateX(100).step()
  animationData.value = animation.export()
}

// 透明度动画
const opacityAnimation = () => {
  initAnimation()
  animation.opacity(0.2).step()
  animationData.value = animation.export()
}

// 组合动画
const multipleAnimation = () => {
  initAnimation()
  animation
    .rotate(180)
    .scale(1.5)
    .translateX(100)
    .opacity(0.5)
    .step()
  animationData.value = animation.export()
}

// 重置动画
const resetAnimation = () => {
  initAnimation()
  animation
    .rotate(0)
    .scale(1)
    .translateX(0)
    .opacity(1)
    .step()
  animationData.value = animation.export()
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .animation-element {
    width: 200rpx;
    height: 200rpx;
    background-color: #007AFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 50rpx;
    border-radius: 8rpx;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    button {
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
}
</style>