<template>
	<view class="container">
		<!-- wx.navigateTo -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.navigateTo" name="Docs guide">
				<view>保留当前页面，跳转到应用内的某个页面。</view>
				<view>注意：小程序中页面栈最多十层</view>
			</uv-collapse-item>
		</uv-collapse>
		<!--  wx.navigateBack -->
		<uv-button @tap="navNavigateTo" type="success" text="页面跳转"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.navigateBack" name="Docs guide">
				作用：
				<view>关闭当前页面，返回上一页面或者多级页面。可通过getCurrentPages获取当前的页面栈，决定需要返回几层</view>
				应用场景
				<view>delta：默认1；非必填；返回的页面数，如果delta大于现有的页面数，则返回到首页。</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navNavigateBack" type="success" text="页面返回"></uv-button>
		<!-- wx.switchTab -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.switchTab" name="Docs guide">
				<view>
					<p>跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面；</p>
					<p>注意：路径后不能带参数；</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navSwitchTab" type="success" text="tabBar页面跳转"></uv-button>
		<!-- wx.showShareMenu -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showShareMenu" name="Docs guide">
				<view>
					特点：
					<p>关闭所有页面，打开到应用内的某个页面</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navReLaunch" type="success" text="路由重置跳转"></uv-button>
		<!-- wx.hideShareMenu -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.hideShareMenu" name="Docs guide">
				<view>
					<p>关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navRedirectTo" type="success" text="关闭当前页跳转"></uv-button>
		<!-- wx.rewriteRoute -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.rewriteRoute" name="Docs guide">
				<view>重写正在进行中的路由事件，与redirectTo()效果相似但实现原理不同，前者不会渲染原页面，后者会先按顺序渲染原页面再进行重置</view>
				<view>
					应用场景：
					<p>①页面未找到的情况下，回到小程序主页或自定义页面</p>
					<p>②将失效页面重写引导到新页面（如活动物料失效，重写跳转到新活动）</p>
					<p>③用户身份变更后的界面重置为指定页面</p>
				</view>
				<view>注意：基础库 3.8.0 起</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button icon="star-fill" @tap="navRewriteRoute" type="success" text="路由重写"></uv-button>
		<!-- 自定义路由 -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.rewriteRoute" name="Docs guide">
				<p>应用痛点：</p>
				<view>小程序采用多 WebView 架构，相较于APP应用，页面间跳转形式十分单一，仅能从右到左进行动画。</view>
				<p>解决方案：</p>
				<view>通过页面配置中的 renderer 字段进行区分WebView和Skyline渲染框架，在连续的 Skyline 页面间跳转时，可实现自定义路由效果。</view>
				<view>
					应用场景：
					<p>①页面未找到的情况下，回到小程序主页或自定义页面</p>
					<p>②将失效页面重写引导到新页面（如活动物料失效，重写跳转到新活动）</p>
					<p>③用户身份变更后的界面重置为指定页面</p>
				</view>
				<view>注意：基础库 3.8.0 起</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button icon="star-fill" @tap="addCustomRouter" type="success" text="添加自定义路由配"></uv-button>
		<uv-button icon="star-fill" @tap="getCustomRouter" type="success" text="获取页面自定义路由上下文对象"></uv-button>
		<uv-button icon="star-fill" @tap="removeCustomRouter" type="success" text="移除自定义路由配置"></uv-button>
		<view class="preview">
			<p>Skyline模式演示</p>
			<image
				style="width: 400rpx; height: 400rpx"
				src="https://res.wx.qq.com/op_res/1tPmq3hxyTRI5e3ch-tBB0bLYk7Zo2JnBwBWJceCRfMSXrg5Mwnpg3lMZNlUJJ_ago16Vjy76doh-7jS5ObRig"
				mode="aspectFill"
			></image>
		</view>
		<p @tap="copyUrl">自定义路由详细参考文档及案例(点击复制)：https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/custom-route.html</p>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

// 添加缺失的事件处理方法
const change = (e) => {
	console.log("折叠面板变化:", e);
};
const copyUrl = () => {
	wx.setClipboardData({
		data: "https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/custom-route.html",
		success(res) {
			wx.getClipboardData({
				success(res) {
					console.log(res.data); // data
				}
			});
		}
	});
};
const close = (name) => {
	console.log("面板关闭:", name);
};

const open = (name) => {
	console.log("面板打开:", name);
};

onLoad((option) => {
	console.log("option", option);
});
onUnload(() => {});
const navSwitchTab = () => {
	wx.switchTab({
		url: "/pages/mine/index",
		success() {
			uni.showToast({
				title: "tabbar跳转成功"
			});
		}
	});
};
const navReLaunch = () => {
	wx.reLaunch({
		url: "/pages/wxExample/wxShare?id=1"
	});
};
const navRedirectTo = () => {
	wx.redirectTo({
		url: "/pages/wxExample/wxShare?id=1"
	});
};
const navNavigateTo = () => {
	wx.navigateTo({
		url: "/pages/wxExample/wxShare?id=1"
	});
};
const navNavigateBack = () => {
	wx.navigateBack({
		// url: 'C?id=1'
		delta: 2
	});
};
const navRewriteRoute = () => {};

// 添加自定义路由配置
const addCustomRouter = () => {
	const HalfScreenDialogRouteBuilder = (customRouteContext) => {
		const { primaryAnimation } = customRouteContext;

		const handlePrimaryAnimation = () => {
			"worklet";
			let t = primaryAnimation.value;
			// 距离顶部边距因子
			const topDistance = 0.12;
			// 距离顶部边距
			const marginTop = topDistance * screenHeight;
			// 半屏页面大小
			const pageHeight = (1 - topDistance) * screenHeight;
			// 自底向上显示页面
			const transY = pageHeight * (1 - t);
			return {
				overflow: "hidden",
				borderRadius: "10px",
				marginTop: `${marginTop}px`,
				height: `${pageHeight}px`,
				transform: `translateY(${transY}px)`
			};
		};

		return {
			handlePrimaryAnimation
		};
	};
	wx.router.addRouteBuilder("slide", HalfScreenDialogRouteBuilder);

	// 使用自定义路由
	wx.navigateTo({
		url: "/pages/wxExample/wxShare",
		routeType: "slide"
	});
};
const getCustomRouter = () => {
	wx.router.getRouteContext(this);
};
const removeCustomRouter = () => {
	wx.router.removeRouteBuilder("slide");
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx;
}

.dynamic-message-section {
	margin-top: 40rpx;
	padding: 30rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 20rpx;
	box-shadow: 0 8rpx 30rpx rgba(102, 126, 234, 0.3);

	.section-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.button-group {
		display: flex;
		gap: 20rpx;
		margin-bottom: 30rpx;

		.uv-button {
			flex: 1;
		}
	}

	.tips {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15rpx;
		padding: 25rpx;
		border: 1px solid rgba(255, 255, 255, 0.2);

		.tip-text {
			display: block;
			font-size: 28rpx;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 15rpx;
		}

		.tip-item {
			display: block;
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.9);
			line-height: 1.6;
			margin-bottom: 8rpx;
			padding-left: 10rpx;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
.preview {
	width: 750rpx;
	display: flex;
	justify-content: center;
	p {
		width: 500rpx;
	}
}
</style>
