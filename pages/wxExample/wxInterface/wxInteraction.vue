<template>
	<view class="container">
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showToast" name="Docs guide">
				<view>显示消息提示框，可设置是否遮罩mask，可自定义弹框图片</view>
				<view>使用wx.hideToast()隐藏弹框，目前 toast 和 loading 相关接口可以相互混用</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="showToast" type="success" text="消息弹框"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showModel" name="Docs guide">
				<view>显示模态对话框，可自定义弹框内容以及按钮设置</view>
				<view>注意：基础库 2.17.1 版本起，支持传入 editable 参数，显示带输入框的弹窗</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="showModel" type="success" text="模态框显示"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showActionSheet" name="Docs guide">
				<view>显示下拉列表操作菜单</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="showActionSheet" type="success" text="显示操作菜单"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showActionSheet" name="Docs guide">
				<view>功能开启小程序页面返回询问对话框</view>
				<view>注意: 当用户在小程序内非首页页面/最底层页/手势滑动返回时不做拦截</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="enableAlertBeforeUnload" type="success" text="返回页面询问弹框设置"></uv-button>
		<uv-button @tap="disableAlertBeforeUnload" type="success" text="返回页面询问弹框取消"></uv-button>
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
// 消息提示弹框
const showToast = () => {
	wx.showToast({
		title: "成功",
		icon: "success",
		image: "/static/avatar.png", //自定义图标本地路径，优先级高于icon
		mask: false,
		duration: 2000,
		success() {
			console.log("Toast触发成功");
		}
	});
};
const showModel = () => {
	wx.showModal({
		title: "提示",
		content: "这是一个模态弹窗",
		showCancel: true, //是否显示取消按钮
		cancelText: "取消", //自定义取消按钮文字
		cancelColor: "#dfdfdf", //取消按钮自定义
		confirmText: "确认",
		confirmColor: "",
		editable: true, //是否显示输入框
		placeholderText: "", // 显示输入框时的提示文本
		success(res) {
			if (res.confirm) {
				console.log("用户点击确定");
			} else if (res.cancel) {
				console.log("用户点击取消");
			}
		}
	});
};

const showActionSheet = () => {
	wx.showActionSheet({
		alertText: "警示文案",
		itemList: ["A", "B", "C"],
		itemColor: "#000000", //按钮的文字颜色
		success(res) {
			console.log(res.tapIndex);
		},
		fail(res) {
			console.log(res.errMsg);
		}
	});
};
const enableAlertBeforeUnload = () => {
	wx.enableAlertBeforeUnload({
		message: "是否确认返回上一页",
		success: (res) => {}
	});
};
const disableAlertBeforeUnload = () => {
	wx.disableAlertBeforeUnload({
		success: (res) => {}
	});
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
