<template>
  <view class="container">
    <view class="view">
      <button v-for="btn in buttons" :key="btn.id" class="btn" @click="btn.handler">
        {{ btn.text }}
      </button>
    </view>
  </view>
</template>

<script setup>
/**加载自定义字体 */
const loadFontFace = () => {
  // 加载自定义字体
  wx.loadFontFace({
    family: 'CustomFont', // 字体名称，用于在 CSS 中引用
    source: 'url("https://example.com/fonts/custom-font.woff2")', // 字体文件 URL 字体文件所在的服务器必须配置正确的 CORS（跨域资源共享）头，允许微信小程序的域名访问
    desc: {
      style: 'normal', // 字体样式
      weight: 'normal', // 字体粗细
      variant: 'normal' // 字体变体
    },
    success: function (res) {
      console.log('字体加载成功', res.status)
      // status 值为 'loaded' 表示字体已加载成功
    },
    fail: function (res) {
      console.log('字体加载失败', res.status)
      // status 值为 'failed' 表示字体加载失败
    },
    complete: function (res) {
      console.log('字体加载完成', res.status)
    }
  })
};

/**加载微信内置字体 */
const loadBuiltInFontFace = () => {
  // 加载微信内置字体 基础库 3.7.9 开始支持
  wx.loadFontFace({
    global: true, // 是否全局生效
    family: 'WeChatSansSS', // 微信内置字体名称
    source: 'WeChatSansSS', // 字体样式
    scopes: ['native'], // 字体作用范围，可选值为 webview / native / skyline
    success (res) {
      console.log('微信内置字体加载成功', res)
      // status 值为 'loaded' 表示字体已加载成功
    },
    fail (res) {
      console.log('微信内置字体加载失败', res)
      // status 值为 'failed' 表示字体加载失败
    },
    complete (res) {
      console.log('微信内置字体加载完成', res)
    }
  })
}

/**下拉刷新 */
const startPullDownRefresh = () => {
  // 开始下拉刷新
  wx.startPullDownRefresh({
    success: function () {
      console.log('下拉刷新开始')
    },
    fail: function (err) {
      console.error('下拉刷新失败', err)
    }
  })
};

/**停止下拉刷新 */
const stopPullDownRefresh = () => {
  // 停止下拉刷新
  wx.stopPullDownRefresh({
    success: function () {
      console.log('下拉刷新停止')
    },
    fail: function (err) {
      console.error('停止下拉刷新失败', err)
    }
  })
};

const buttons = [
  {
    id: 1,
    text: "加载自定义字体",
    handler: loadFontFace,
  },
  {
    id: 2,
    text: "加载微信内置字体",
    handler: loadBuiltInFontFace,
  },
  {
    id: 3,
    text: "下拉刷新",
    handler: startPullDownRefresh,
  },
  {
    id: 4,
    text: "停止下拉刷新",
    handler: stopPullDownRefresh,
  }
];
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  min-height: 100vh;
}

.view {
  width: 100%;
}

.btn {
  margin-bottom: 20rpx;
  font-size: 14px;
}
</style>
