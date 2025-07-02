<template>
  <view class="container">
    <view class="view">
      <button
        v-for="btn in buttons"
        :key="btn.id"
        class="btn"
        @click="btn.handler"
      >
        {{ btn.text }}
      </button>
    </view>
  </view>
</template>

<script setup>
/**重启小程序 */
const restartMiniProgram = () => {
  // 类似用户手动杀掉小程序再进入的效果
  // 调用 wx.restartMiniProgram 后，当前所有页面的 onUnload 生命周期函数会被触发
  // 调用示例
  wx.restartMiniProgram({
    // 指定重启后跳转的页面路径（必填）
    path: "/pages/cases/navigateModule",

    /**  页面参数（可选，类似 URL query 参数）
    query: {
      orderId: "123456",
      status: "success",
     },
    */

    // 重启成功的回调
    success(res) {
      console.log("重启成功", res);
    },

    // 重启失败的回调
    fail(err) {
      console.error("重启失败", err);
      // 可添加降级方案，如跳转到首页
      wx.switchTab({ url: "/pages/index" });
    },

    // 无论成功失败都会执行的回调
    complete() {
      console.log("重启操作完成");
    },
  });
};

/**跳转公众号 */
const openOfficialAccountProfile = () => {
  //需微信基础库版本 3.7.10  及以上支持, 可在调用前检查兼容性
  if (!wx.canIUse("openOfficialAccountProfile")) {
    // 降级处理：提示用户手动关注公众号
    wx.showModal({
      title: "提示",
      content: "当前版本不支持自动跳转公众号，可在右上角菜单中手动关注",
    });
    return;
  }

  // 跳转到公众号个人主页
  wx.openOfficialAccountProfile({
    // 公众号的微信号必填 调用该接口前，需要在微信公众平台将小程序与目标公众号进行关联
    username: "yzwdkamsn557",

    // 跳转成功回调
    success(res) {
      console.log("跳转成功", res);
    },

    // 跳转失败回调
    fail(err) {
      console.error("跳转失败", err);
    },

    complete() {
      console.log("跳转操作完成");
    },
  });
};

/**跳转公众号文章 */
const openOfficialAccountArticle = () => {
  wx.openOfficialAccountArticle({
    // 文章链接（必填）
    // 文章必须是已发布状态（草稿状态无法打开）；文章必须是公开可见的（不支持私密文章或仅特定用户可见的文章）；
    // URL 必须是公众号文章的原始链接（以 https://mp.weixin.qq.com/s/ 开头）；
    url: "https://mp.weixin.qq.com/s/oI95r2qFLl38r2ZmcAueQA",

    // 成功回调
    success(res) {
      console.log("文章打开成功", res);
    },

    // 失败回调
    fail(err) {
      console.error("文章打开失败", err);
      // 可添加降级方案
    },

    // 完成回调
    complete() {
      console.log("打开文章操作完成");
    },
  });
};

/**打开半屏小程序 */
const openEmbeddedMiniProgram = () => {
  // 完整参数调用示例
  wx.openEmbeddedMiniProgram({
    // 半屏小程序的 AppID（必填）
    appId: "wxb69897679e7aadd6",

    // 被嵌入小程序的页面路径（可选，默认为首页）
    path: "pages/index/index",

    // 传递给被嵌入小程序的参数（可选）
    extraData: {
      fromApp: "当前小程序标识",
      userId: "123456",
      orderId: "ORD7890",
    },

    // 接口调用成功的回调
    success(res) {
      console.log("成功打开嵌入小程序", res);
    },

    // 接口调用失败的回调
    fail(err) {
      console.error("打开嵌入小程序失败", err);
      // 可添加降级方案
    },

    // 接口调用完成的回调（成功或失败都会执行）
    complete() {
      console.log("打开嵌入小程序操作完成");
    },
  });
};

/**监听半屏小程序可视高度变化 */
const onEmbeddedMiniProgramHeightChange = () => {
  wx.onEmbeddedMiniProgramHeightChange(function (res) {
    // 高度变化时的回调函数
    console.log("被嵌入小程序高度变化", res);

    // res 参数包含以下属性：
    // - height: 被嵌入小程序的最新高度（单位：px）
    // - initialHeight: 被嵌入小程序的半屏小程序初始高度

    const newHeight = res.height;
    const initialHeight = res.initialHeight;

    // 根据新高度调整界面布局
    this.setData({
      embeddedHeight: newHeight,
    });
  });
};

/**移除监听半屏小程序可视高度变化 */
const offEmbeddedMiniProgramHeightChange = () => {
  wx.offEmbeddedMiniProgramHeightChange(() => {});
  //const listener = function (res) { console.log(res) }
  //wx.onEmbeddedMiniProgramHeightChange(listener)
  //wx.offEmbeddedMiniProgramHeightChange(listener) // 需传入与监听时同一个的函数对象
};

/**跳转另一个小程序 */
const navigateToMiniProgram = () => {
  // 完整参数调用示例
  wx.navigateToMiniProgram({
    // 目标小程序的 AppID（必填）
    appId: "wx1234567890abcdef",

    // 目标小程序的页面路径（可选，默认为首页）长度不超过 128 个字符
    path: "pages/index/index",

    // 传递给目标小程序的参数（可选）
    extraData: {
      fromApp: "当前小程序标识",
      userId: "123456",
      orderId: "ORD7890",
    },

    // 跳转目标小程序的版本（可选，默认值为 release）
    envVersion: "release", // 有效值：develop（开发版）、trial（体验版）、release（正式版）

    // 接口调用成功的回调
    success(res) {
      console.log("成功跳转到目标小程序", res);
    },

    // 接口调用失败的回调
    fail(err) {
      console.error("跳转目标小程序失败", err);
      // 可添加降级方案
    },

    // 接口调用完成的回调（成功或失败都会执行）
    complete() {
      console.log("跳转目标小程序操作完成");
    },
  });
};

/**返回上一个小程序 */
const navigateBackMiniProgram = () => {
  // 完整参数调用示例
  wx.navigateBackMiniProgram({
    // 传递回原小程序的数据（可选）
    extraData: {
      result: "success",
      payStatus: "paid",
      transactionId: "TXN123456",
    },

    // 接口调用成功的回调
    success(res) {
      console.log("成功返回原小程序", res);
    },

    // 接口调用失败的回调
    fail(err) {
      console.error("返回原小程序失败", err);
      // 可添加降级方案
    },

    // 接口调用完成的回调（成功或失败都会执行）
    complete() {
      console.log("返回原小程序操作完成");
    },
  });
};

/**退出 */ 
const exitMiniProgram = () => {
  wx.exitMiniProgram({
    // 退出成功
    success(res) {
      console.log("退出成功", res);
    },

    // 退出失败
    fail(err) {
      console.error("退出失败", err);
    },

    // 退出完成
    complete() {
      console.log("退出操作完成");
    },
  })
}

const buttons = [
  {
    id: 1,
    text: "wx.restartMiniProgram(重启)",
    handler: restartMiniProgram,
  },
  {
    id: 2,
    text: "wx.openOfficialAccountProfile(打开公众号主页)",
    handler: openOfficialAccountProfile,
  },
  {
    id: 3,
    text: "wx.openOfficialAccountArticle(打开公众号文章)",
    handler: openOfficialAccountArticle,
  },
  {
    id: 4,
    text: "wx.openEmbeddedMiniProgram(打开半屏小程序)",
    handler: openEmbeddedMiniProgram,
  },
  {
    id: 5,
    text: "wx.onEmbeddedMiniProgramHeightChange(监听半屏小程序可视高度变化)",
    handler: onEmbeddedMiniProgramHeightChange,
  },
  {
    id: 6,
    text: "wx.offEmbeddedMiniProgramHeightChange(移除半屏小程序可视高度变化)",
    handler: offEmbeddedMiniProgramHeightChange,
  },
  {
    id: 7,
    text: "wx.navigateToMiniProgram(打开另一个小程序)",
    handler: navigateToMiniProgram,
  },
  {
    id: 8,
    text: "wx.navigateBackMiniProgram(返回上一个小程序)",
    handler: navigateBackMiniProgram,
  },
  {
    id: 9,
    text: "wx.exitMiniProgram(退出)",
    handler: exitMiniProgram,
  },
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
