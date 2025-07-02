<template>
	<view class="container">
		<view style="margin-bottom: 20rpx">交互API</view>
		<view class="view">
			<button v-for="btn in buttons" :key="btn.id" class="btn" @click="btn.handler">
				{{ btn.text }}
			</button>
		</view>
		<view style="margin-bottom: 20rpx">导航栏API</view>
		<view class="view">
			<button v-for="btn in buttonsNavBar" :key="btn.id" class="btn" @click="btn.handler">
				{{ btn.text }}
			</button>
		</view>
		<view style="margin-bottom: 20rpx">背景API</view>
		<view class="view">
			<button v-for="btn in buttonsBackground" :key="btn.id" class="btn" @click="btn.handler">
				{{ btn.text }}
			</button>
		</view>
	</view>
</template>

<script setup>
const showToast = () => {
	wx.showToast({
		title: "成功",
		icon: "success", // 可选 success, loading, error,(title最多显示7个汉字长度) none（title最多可显示两行）
		duration: 90000, // 可选，默认 1500ms
		// mask: true, // 是否显示透明蒙层，防止触摸穿透，默认 false
		image: "/static/logo.png", // 可选，图片路径，优先级高于 icon        -----------------------------------------
		success(res) {
			console.log("showToast success", res);
		},
		fail(res) {
			console.log("showToast fail", res);
		},
		complete(res) {
			console.log("showToast complete", res);
		}
	});
};

const showModal = () => {
	wx.showModal({
		title: "提示",
		content: "这是一个模态弹窗",
		showCancel: true, // 是否显示取消按钮，默认 true
		cancelText: "取消", // 取消按钮的文字，默认 "取消"
		cancelColor: "#000000", // 取消按钮的文字颜色，默认 "#000000"
		confirmText: "确定", // 确定按钮的文字，默认 "确定"
		confirmColor: "#3CC51F", // 确定按钮的文字颜色，默认 "#576B95"
		success(res) {
			if (res.confirm) {
				console.log("用户点击确定");
			} else if (res.cancel) {
				console.log("用户点击取消");
			}
		},
		fail(res) {
			console.log("showModal fail", res);
		},
		complete(res) {
			console.log("showModal complete", res);
		}
	});
};

const showLoading = () => {
	wx.showLoading({
		title: "加载中",
		mask: false, // 是否显示透明蒙层，防止触摸穿透，默认 false
		success(res) {
			console.log("showLoading success", res);
		},
		fail(res) {
			console.log("showLoading fail", res);
		},
		complete(res) {
			console.log("showLoading complete", res);
		}
	});
};

const hideLoading = () => {
	wx.hideLoading();
};

const showActionSheet = () => {
	wx.showActionSheet({
		alertText: "请选择操作", // 弹窗标题，默认无
		itemList: ["选项一", "选项二", "选项三"], // 按钮文字数组，长度最大为6，必填
		itemColor: "#000000", // 按钮文字颜色，默认 "#000000"
		success(res) {
			console.log(res.tapIndex);
		},
		fail(res) {
			console.log(res.errMsg);
		}
	});
};

const hideToast = () => {
	wx.hideToast({
		//目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性
		noConflict: true // 是否不冲突，默认 false
	});
};

const enableAlertBeforeUnload = () => {
	// 弹窗条件
	// 当用户在小程序内非首页页面/最底层页
	// 官方导航栏上的的返回
	// 全屏模式下自绘返回键
	// android 系统 back 键时
	// 注意事项
	// 手势滑动返回时不做拦截
	// 在任何场景下，此功能都不应拦住用户退出小程序的行为
	wx.enableAlertBeforeUnload({
		message: "您有未保存的内容，确定要离开吗？", // 弹窗提示信息
		// title: "提示", // 弹窗标题，默认 "提示"
		success(res) {
			console.log("enableAlertBeforeUnload success", res);
		},
		fail(res) {
			console.log("enableAlertBeforeUnload fail", res);
		},
		complete(res) {
			console.log("enableAlertBeforeUnload complete", res);
		}
	});
};

const disableAlertBeforeUnload = () => {
	wx.disableAlertBeforeUnload({
		success(res) {
			console.log("disableAlertBeforeUnload success", res);
		},
		fail(res) {
			console.log("disableAlertBeforeUnload fail", res);
		},
		complete(res) {
			console.log("disableAlertBeforeUnload complete", res);
		}
	});
};

const showNavigationBarLoading = () => {
	wx.showNavigationBarLoading({
		success(res) {
			console.log("showNavigationBarLoading success", res);
			setTimeout(() => {
				// 模拟加载完成后隐藏导航栏加载动画
				wx.hideNavigationBarLoading();
			}, 2000); // 2秒后隐藏加载动画
		},
		fail(res) {
			console.log("showNavigationBarLoading fail", res);
		},
		complete(res) {
			console.log("showNavigationBarLoading complete", res);
		}
	});
};

const setNavigationBarTitle = () => {
	wx.setNavigationBarTitle({
		title: "我是动态标题", // 设置导航栏标题
		success(res) {
			console.log("setNavigationBarTitle success", res);
		},
		fail(res) {
			console.log("setNavigationBarTitle fail", res);
		},
		complete(res) {
			console.log("setNavigationBarTitle complete", res);
		}
	});
};

const setNavigationBarColor = () => {
	wx.setNavigationBarColor({
		frontColor: "#ffffff", // 导航栏标题颜色，仅支持 #ffffff 和 #000000
		backgroundColor: "#efc4d5", // 导航栏背景颜色，十六进制颜色
		animation: {
			duration: 400, // 动画持续时间，单位 ms
			timingFunc: "easeIn" // 动画效果，默认 "linear"
		},
		success(res) {
			console.log("setNavigationBarColor success", res);
		},
		fail(res) {
			console.log("setNavigationBarColor fail", res);
		},
		complete(res) {
			console.log("setNavigationBarColor complete", res);
		}
	});
};

const hideNavigationBarLoading = () => {
	wx.hideNavigationBarLoading({
		success(res) {
			console.log("hideNavigationBarLoading success", res);
		},
		fail(res) {
			console.log("hideNavigationBarLoading fail", res);
		},
		complete(res) {
			console.log("hideNavigationBarLoading complete", res);
		}
	});
};

const hideHomeButton = () => {
	wx.hideHomeButton({
		success(res) {
			console.log("hideHomeButton success", res);
		},
		fail(res) {
			console.log("hideHomeButton fail", res);
		},
		complete(res) {
			console.log("hideHomeButton complete", res);
		}
	});
};

const setBackgroundTextStyle = () => {
	wx.setBackgroundTextStyle({
		textStyle: "light", // 可选 "dark" 或 "light"
		success(res) {
			console.log("setBackgroundTextStyle success", res);
		},
		fail(res) {
			console.log("setBackgroundTextStyle fail", res);
		},
		complete(res) {
			console.log("setBackgroundTextStyle complete", res);
		}
	});
};

const setBackgroundColor = () => {
	wx.setBackgroundColor({
		backgroundColor: "#efc4d5", // 窗口的背景色，十六进制颜色
		backgroundColorTop: "#efc4d5", // 顶部窗口的背景色，十六进制颜色
		backgroundColorBottom: "#efc4d5", // 底部窗口的背景色，十六进制颜色
		success(res) {
			console.log("setBackgroundColor success", res);
		},
		fail(res) {
			console.log("setBackgroundColor fail", res);
		},
		complete(res) {
			console.log("setBackgroundColor complete", res);
		}
	});
};

const buttons = [
	{
		id: 1,
		text: "wx.showToast(显示消息提示框)",
		handler: showToast
	},
	{
		id: 2,
		text: "wx.showModal(显示模态对话框)",
		handler: showModal
	},
	{
		id: 3,
		text: "wx.showLoading(显示 loading 提示框, 需主动调用 hideLoading 才能关闭)",
		handler: showLoading
	},
	{
		id: 4,
		text: "wx.hideLoading(隐藏 loading 提示框)",
		handler: hideLoading
	},
	{
		id: 5,
		text: "wx.showActionSheet(显示操作菜单)",
		handler: showActionSheet
	},
	{
		id: 6,
		text: "wx.hideToast(隐藏消息提示框)",
		handler: hideToast
	},
	{
		id: 7,
		text: "wx.enableAlertBeforeUnload(开启小程序页面返回询问对话框)",
		handler: enableAlertBeforeUnload
	},
	{
		id: 8,
		text: "wx.disableAlertBeforeUnload(关闭小程序页面返回询问对话框)",
		handler: disableAlertBeforeUnload
	}
];
const buttonsNavBar = [
	{
		id: 1,
		text: "wx.showNavigationBarLoading(在当前页面显示导航条加载动画)",
		handler: showNavigationBarLoading
	},
	{
		id: 2,
		text: "wx.setNavigationBarTitle(动态设置当前页面的标题)",
		handler: setNavigationBarTitle
	},
	{
		id: 3,
		text: "wx.setNavigationBarColor(设置页面导航条颜色)",
		handler: setNavigationBarColor
	},
	{
		id: 4,
		text: "wx.hideNavigationBarLoading(在当前页面隐藏导航条加载动画)",
		handler: hideNavigationBarLoading
	},
	{
		id: 5,
		text: "wx.hideHomeButton(隐藏返回首页按钮)",
		handler: hideHomeButton
	}
];
const buttonsBackground = [
	{
		id: 1,
		text: "wx.setBackgroundTextStyle(动态设置下拉背景字体、loading 图的样式)",
		handler: setBackgroundTextStyle
	},
	{
		id: 2,
		text: "wx.setBackgroundColor(动态设置窗口的背景色)",
		handler: setBackgroundColor
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
