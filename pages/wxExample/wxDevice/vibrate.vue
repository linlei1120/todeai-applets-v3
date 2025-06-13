<template>
	<view class="container">
		<button class="text" @tap="startVibrate">振动</button>
		<button class="text" @tap="startShortVibrate">短振动</button>
		<button class="text" @tap="longShortVibrate">长振动</button>
		<p>拉起手机发送短信</p>
		<button class="text" @tap="sendMessage">发送短信</button>
		<view class="loader"></view>
	</view>
</template>

<script setup>
import { ref } from "vue";
const btnTitle = "短振动";
const btnTitle01 = "长振动";
const sendMessage = () => {
	console.log("sendMessage");
	// #ifdef MP-WEIXIN
	wx.sendSms({
		phoneNumber: "13001353169",
		content: "这是一条测试短信，来自TodeAI团队！",
		success: function () {
			console.log("success");
		},
		fail: function () {
			console.log("fail");
		},
		complete: function () {
			console.log("complete");
		}
	});
	// #endif
};
const startVibrate = () => {
	// #ifdef MP-ALIPAY
	uni.vibrate({
		success: function () {
			console.log("success");
		}
	});
	// #endif

	// #ifdef MP-WEIXIN
	uni.vibrateShort({
		type: "medium",
		success: () => {
			// 震动成功的回调
			console.log("震动触发成功");
		},
		fail: (err) => {
			console.log("震动失败:", err);
		}
	});
	// #endif
};
const startShortVibrate = () => {
	uni.vibrateShort({
		type: "heavy",
		success: () => {
			// 震动成功的回调
			console.log("震动触发成功");
		},
		fail: (err) => {
			console.log("震动失败:", err);
		}
	});
};
const longShortVibrate = () => {
	uni.vibrateLong({
		success: () => {
			// 震动成功的回调
			console.log("长震动触发成功");
		},
		fail: (err) => {
			console.log("长震动失败:", err);
		}
	});
};
</script>

<style lang="scss">
page {
	background-color: aquamarine;
}
.loader {
	width: 85rrpx;
	height: 50rpx;
	background-repeat: no-repeat;
	background-image: linear-gradient(#fff 50rpx, transparent 0), linear-gradient(#fff 50rpx, transparent 0), linear-gradient(#fff 50rpx, transparent 0),
		linear-gradient(#fff 50rpx, transparent 0), linear-gradient(#fff 50rpx, transparent 0), linear-gradient(#fff 50rpx, transparent 0);
	background-position: 0rpx center, 15rpx center, 30rpx center, 45rpx center, 60rpx center, 75rpx center, 90rpx center;
	animation: rikSpikeRoll 0.65s linear infinite alternate;
}
@keyframes rikSpikeRoll {
	0% {
		background-size: 10rpx 3rpx;
	}
	16% {
		background-size: 10rpx 50rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx;
	}
	33% {
		background-size: 10rpx 30rpx, 10rpx 50rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx;
	}
	50% {
		background-size: 10rpx 10rpx, 10rpx 30rpx, 10rpx 50rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx;
	}
	66% {
		background-size: 10rpx 3rpx, 10rpx 10rpx, 10rpx 30rpx, 10rpx 50rpx, 10rpx 3rpx, 10rpx 3rpx;
	}
	83% {
		background-size: 10rpx 3rpx, 10rpx 3rpx, 10rpx 10rpx, 10rpx 30rpx, 10rpx 50rpx, 10rpx 3rpx;
	}
	100% {
		background-size: 10rpx 3rpx, 10rpx 3rpx, 10rpx 3rpx, 10rpx 10rpx, 10rpx 30rpx, 10rpx 50rpx;
	}
}
</style>
