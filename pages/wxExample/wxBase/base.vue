<template>
	<view class="container">
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.env" name="Docs guide">
				<view>文件系统中的用户目录路径 (本地路径)也可以用于设置全局环境遍历，是一个可读写的API</view>
				<view style="word-wrap: break-word">wx.env对象：{{ JSON.stringify(envData) }}</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="saveFiles" type="success" text="环境变量设置"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.canIUse" name="Docs guide">
				<view>文件系统中的用户目录路径 (本地路径)也可以用于设置全局环境遍历，是一个可读写的API</view>
				<uv-input placeholder="请输入监测内容" border="surround" v-model="userCxt"></uv-input>
				<view>是否兼容: {{ isUse }}</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="canUse" type="success" text="低版本兼容"></uv-button>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
const envData = ref({});
const userCxt = ref("");
const isUse = ref();
// 添加缺失的事件处理方法
const change = (e) => {
	console.log("折叠面板变化:", e);
};

const close = (name) => {
	console.log("面板关闭:", name);
};

const open = (name) => {
	console.log("面板打开:", name);
};

onLoad((option) => {
	console.log("option");
	console.log(wx.env);
	envData.value = wx.env;
});
onUnload(() => {});
const saveFiles = () => {
	//  注意重新赋值wx.env渲染不会生效
	// wx.env.envData = "prod";
	envData.value.envData = "prod";
	console.log("环境变量设置", wx.env);
};
const canUse = () => {
	if (!userCxt.value) {
		uni.showToast({
			title: "请输入监测内容",
			icon: "error"
		});
		return;
	}
	console.log(wx.canIUse(userCxt.value));
	isUse.value = wx.canIUse(userCxt.value);
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
</style>
