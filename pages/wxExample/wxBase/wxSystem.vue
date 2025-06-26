<template>
	<view class="container">
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.openSystemBluetoothSetting" name="Docs guide">
				应用场景：
				<view>跳转系统蓝牙设置页。仅支持安卓</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="bluetoothSetting" type="success" text="蓝牙设置(仅安卓)"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.openAppAuthorizeSetting" name="Docs guide">
				应用场景：
				<view>用于跳转到手机系统设置中，微信APP的授权管理页面</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="authorizeSetting" type="success" text="授权管理页"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.getWindowInfo" name="Docs guide">
				应用场景：
				<view>获取当前应用所在的window窗口信息，包括：设备像素比、屏幕宽/高、可使用窗口宽/高、状态栏高度、部分机型竖屏正方向下的安全区域</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="getWindow" type="success" text="应用窗口信息"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.getWindowInfo" name="Docs guide">
				应用场景：
				<view>获取设备设置，如蓝牙开关设置、WiFi开关设置、地理位置开关设置、横屏竖屏判断</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="getSystemSet" type="success" text="系统设置信息"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.getDeviceInfo" name="Docs guide">
				应用场景：
				<view>获取设备设置，如蓝牙开关设置、WiFi开关设置、地理位置开关设置、横屏竖屏判断</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="getDeviceInfo" type="success" text="设备基础/性能信息"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.getAppBaseInfo" name="Docs guide">
				应用场景：
				<view>获取当前微信APP基础信息，包括：基础库版本、微信版本号、微信设置的语言、微信字体比例及大小、系统主题等</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="getAppBaseInfo" type="success" text="设微信APP基础信息"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.getAppAuthorizeSetting" name="Docs guide">
				应用场景：
				<view>用于获取应用在微信APP中获取的授权信息，通常这些授权信息需要在微信公众平台隐私协议设置中进行申请，地理位置相关授权重点注意</view>
				<view>
					注意： 'authorized' 表示已经获得授权，无需再次请求授权； 'denied' 表示请求授权被拒绝，无法再次请求授权；（此情况需要引导用户打开系统设置，在设置页中打开权限）
					'non determined' 表示尚未请求授权，会在微信下一次调用系统相应权限时请求；（仅 iOS 会出现。此种情况下引导用户打开系统设置，不展示开关）
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="getWxAuthSetting" type="success" text="微信APP授权设置信息"></uv-button>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
const envData = ref({});
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
const bluetoothSetting = () => {
	wx.openSystemBluetoothSetting({
		success(res) {
			console.log("success", res);
		},
		fail(err) {
			console.log("fail", err);
		}
	});
};
const authorizeSetting = () => {
	wx.openAppAuthorizeSetting({
		success(res) {
			console.log("success", res);
		},
		fail(err) {
			console.log("fail", err);
		}
	});
};
const getWindow = () => {
	const windowInfo = wx.getWindowInfo();
	console.log("设备像素比", windowInfo.pixelRatio);
	console.log("屏幕宽度", windowInfo.screenWidth);
	console.log("屏幕高度", windowInfo.screenHeight);
	console.log("可使用窗口宽度", windowInfo.windowWidth);
	console.log("可使用窗口高度", windowInfo.windowHeight);
	console.log("状态栏的高度", windowInfo.statusBarHeight);
	console.log("安全区域", windowInfo.safeArea);
	console.log("窗口上的边缘y值", windowInfo.screenTop);
	// 计算自定义导航栏高度
	// let sysInfo = wx.getSystemInfoSync();
	// let menuInfo = wx.getMenuButtonBoundingClientRect();
	// let navigationBarHeight = (menuInfo.top - sysInfo.statusBarHeight) * 2 + menuInfo.height;
};
const getSystemSet = () => {
	const systemSetting = wx.getSystemSetting();
	console.log("蓝牙的系统开关", systemSetting.bluetoothEnabled);
	console.log("地理位置的系统开关", systemSetting.deviceOrientation);
	console.log("设备方向", systemSetting.locationEnabled); //portrait 竖屏 landscape横屏
	console.log("Wi-Fi 的系统开关", systemSetting.wifiEnabled);
};
const getDeviceInfo = () => {
	const deviceInfo = wx.getDeviceInfo();
	const deviceBenchmarkInfo = wx.getDeviceBenchmarkInfo();
	console.log("应用（微信APP）二进制接口类型", deviceInfo.abi); // 仅安卓支持
	console.log("设备二进制接口类型", deviceInfo.deviceAbi); // 仅安卓支持
	console.log("设备品牌", deviceInfo.brand);
	console.log("设备型号", deviceInfo.model);
	console.log("客户端平台", deviceInfo.platform);
	console.log("操作系统及版本", deviceInfo.system);
	console.log("设备 CPU 型号", deviceInfo.cpuType);
	console.log("设备内存大小", deviceInfo.memorySize);
	console.log("设备性能deviceBenchmarkInfo", deviceBenchmarkInfo);
};
const getAppBaseInfo = () => {
	const appBaseInfo = wx.getAppBaseInfo();
	console.log("客户端基础库版本", appBaseInfo.SDKVersion);
	console.log("是否打开调试工具", appBaseInfo.enableDebug);
	console.log("小程序运行的宿主环境", appBaseInfo.host);
	console.log("微信设置的语言", appBaseInfo.language);
	console.log("微信版本号", appBaseInfo.version);
	console.log("系统当前主题（深色dark/浅色light）", appBaseInfo.theme);
	console.log("微信字体大小缩放比例", appBaseInfo.fontSizeScaleFactor);
	console.log("微信字体大小", appBaseInfo.fontSizeSetting);
};
const getWxAuthSetting = () => {
	const appAuthorizeSetting = wx.getAppAuthorizeSetting();

	console.log("允许微信使用相册的开关(仅IOS)", appAuthorizeSetting.albumAuthorized); // 仅IOS有效
	console.log("允许微信使用蓝牙的开关", appAuthorizeSetting.bluetoothAuthorized); //基础库3.5.0+
	console.log("允许微信使用摄像头的开关", appAuthorizeSetting.cameraAuthorized);
	console.log("允许微信使用定位的开关", appAuthorizeSetting.locationAuthorized);
	console.log("是否开启定位准确度", appAuthorizeSetting.locationReducedAccuracy);
	console.log("允许微信使用麦克风的开关", appAuthorizeSetting.microphoneAuthorized);
	console.log("允许微信通知的开关", appAuthorizeSetting.notificationAlertAuthorized);
	console.log("允许微信通知带有提醒的开关(仅IOS)", appAuthorizeSetting.notificationAuthorized);
	console.log("允许微信通知带有标记的开关(仅IOS)", appAuthorizeSetting.notificationBadgeAuthorized);
	console.log("允许微信通知带有声音的开关(仅IOS)", appAuthorizeSetting.notificationSoundAuthorized);
	console.log("允许微信读写日历的开关", appAuthorizeSetting.phoneCalendarAuthorized);
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
