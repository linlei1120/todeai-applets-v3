<template>
	<view class="container">
		<button class="text" @tap="sendMessage">发送短信</button>
		<uv-icon name="photo" size="30" color="#909399"></uv-icon>
		<view class="uni-title uni-common-mt">是否支持相册选择{{ isOnlyFromCamera }}</view>
		<uv-radio-group v-model="isOnlyFromCamera" placement="column">
			<uv-radio :name="false" label="是"></uv-radio>
			<uv-radio :name="true" activeColor="red" label="否"></uv-radio>
		</uv-radio-group>
		<button class="text" @tap="qrCode">扫码</button>
		<button class="text" @tap="longShortVibrate">长振动</button>
		<button class="text" @tap="sendMessage">发送短信</button>
	</view>
</template>

<script setup>
import { ref } from "vue";
const btnTitle = "短振动";
const btnTitle01 = "长振动";
let isOnlyFromCamera = ref(false);
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
const qrCode = () => {
	// #ifdef MP-WEIXIN
	uni.scanCode({
		onlyFromCamera: isOnlyFromCamera.value,
		scanType: ["barCode", "qrCode", "datamatrix", "pdf417"],
		success: function (res) {
			console.log("条码类型：" + res.scanType);
			console.log("条码内容：" + res.result);
			console.log("扫码的字符集：" + res.charSet);
			console.log("Base64原始编码：" + res.rawData);
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
	background-color: #ffffff;
}
</style>
