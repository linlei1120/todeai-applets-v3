<template>
  <view class="container">
    <view class="header">
      <view class="title">微信API示例</view>
      <view class="subtitle">页面相关API演示</view>
    </view>

    <view class="demo-list">
      <view class="demo-item" v-for="item in demoList" :key="item.id" @click="navigateToDemo(item)">
        <view class="demo-icon" :class="item.iconClass">
          <text class="iconfont" :class="item.icon"></text>
        </view>
        <view class="demo-info">
          <view class="demo-title">{{ item.title }}</view>
          <view class="demo-desc">{{ item.desc }}</view>
        </view>
        <view class="demo-arrow">
          <text class="iconfont icon-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'

// 示例列表数据
const demoList = reactive([
  {
    id: 1,
    title: '动画API',
    desc: 'wx.createAnimation 创建动画实例，实现元素动画效果',
    path: '/pages/cases/animateDemo',
    icon: 'icon-animation',
    iconClass: 'icon-blue'
  },
  {
    id: 2,
    title: '置顶栏文本',
    desc: 'wx.setTopBarText 设置置顶栏文本内容',
    path: '/pages/cases/topBarDemo',
    icon: 'icon-text',
    iconClass: 'icon-green'
  },
  {
    id: 3,
    title: 'nextTick',
    desc: 'wx.nextTick 延迟到下一个时间片执行回调函数',
    path: '/pages/cases/nextTickDemo',
    icon: 'icon-time',
    iconClass: 'icon-orange'
  },
  {
    id: 4,
    title: '菜单按钮',
    desc: '菜单按钮位置信息获取及相关事件监听',
    path: '/pages/cases/menuButtonDemo',
    icon: 'icon-menu',
    iconClass: 'icon-purple'
  },
  {
    id: 5,
    title: '页面滚动',
    desc: 'wx.pageScrollTo 控制页面滚动到指定位置',
    path: '/pages/cases/pageScrollDemo',
    icon: 'icon-scroll',
    iconClass: 'icon-red'
  }
])

// 跳转到对应的示例页面
const navigateToDemo = (item) => {
  uni.navigateTo({
    url: item.path
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;

  .header {
    margin-bottom: 40rpx;

    .title {
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    .subtitle {
      font-size: 28rpx;
      color: #666;
    }
  }

  .demo-list {
    .demo-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      background-color: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

      &:active {
        background-color: #f8f9fa;
      }

      .demo-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;

        .iconfont {
          font-size: 40rpx;
          color: #fff;
        }

        &.icon-blue {
          background-color: #007AFF;
        }

        &.icon-green {
          background-color: #4CAF50;
        }

        &.icon-orange {
          background-color: #FF9800;
        }

        &.icon-purple {
          background-color: #9C27B0;
        }

        &.icon-red {
          background-color: #F44336;
        }
      }

      .demo-info {
        flex: 1;

        .demo-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 10rpx;
        }

        .demo-desc {
          font-size: 26rpx;
          color: #666;
          line-height: 1.5;
        }
      }

      .demo-arrow {
        margin-left: 20rpx;

        .iconfont {
          font-size: 32rpx;
          color: #ccc;
        }
      }
    }
  }
}
</style>