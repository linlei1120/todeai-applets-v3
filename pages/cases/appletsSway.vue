<template>
	<view class="shake-container">
		<!-- 视觉反馈区域 -->
		<view class="phone-model" :class="{ 'shake-animation': isShaking }">
			<view class="screen">
				<text class="title">摇一摇功能演示</text>
				<image src="/static/shake-icon.png" class="shake-icon" :class="{ 'pulse': isShaking }"></image>
				<text class="hint">用力摇晃手机试试</text>

				<!-- 状态显示 -->
				<view class="status-card">
					<text class="status-text">晃动状态: {{ shakeStatus }}</text>
					<text class="count-text">触发次数: {{ shakeCount }}</text>
				</view>

				<!-- 传感器数据显示 -->
				<view class="sensor-data">
					<view class="data-item">
						<text>X: {{ accelerometerData.x.toFixed(2) }}</text>
						<view class="progress-bar">
							<view class="progress-fill x-fill" :style="{ width: Math.abs(accelerometerData.x) * 50 + '%' }"></view>
						</view>
					</view>
					<view class="data-item">
						<text>Y: {{ accelerometerData.y.toFixed(2) }}</text>
						<view class="progress-bar">
							<view class="progress-fill y-fill" :style="{ width: Math.abs(accelerometerData.y) * 50 + '%' }"></view>
						</view>
					</view>
					<view class="data-item">
						<text>Z: {{ accelerometerData.z.toFixed(2) }}</text>
						<view class="progress-bar">
							<view class="progress-fill z-fill" :style="{ width: Math.abs(accelerometerData.z) * 50 + '%' }"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 控制按钮 -->
		<view class="control-buttons">
			<button class="btn" @tap="startListen" :disabled="isListening">开始监听</button>
			<button class="btn stop" @tap="stopListen" :disabled="!isListening">停止监听</button>
		</view>

		<!-- 触发结果 -->
		<view v-if="lastShakeTime" class="result-card">
			<text>上次触发: {{ formatTime(lastShakeTime) }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isListening: false,
			isShaking: false,
			shakeCount: 0,
			lastShakeTime: null,
			shakeStatus: "未检测",
			accelerometerData: { x: 0, y: 0, z: 0 },
			lastAccelerometer: { x: 0, y: 0, z: 0 },
			shakeTimer: null
		};
	},
	onUnload() {
		this.stopListen();
	},
	methods: {
		// 开始监听加速度
		startListen() {
			this.isListening = true;
			this.shakeStatus = "监听中...";

			// 开启加速度监听
			uni.onAccelerometerChange((res) => {
				this.accelerometerData = res;
				this.detectShake(res);
			});

			// 部分设备需要先开启加速度计
			uni.startAccelerometer({
				interval: "normal",
				success: () => console.log("加速度计已开启"),
				fail: (err) => console.error("开启失败", err)
			});
		},

		// 停止监听
		stopListen() {
			this.isListening = false;
			this.shakeStatus = "已停止";
			uni.offAccelerometerChange();
			uni.stopAccelerometer();
			clearTimeout(this.shakeTimer);
		},

		// 检测晃动
		detectShake(currentData) {
			// 计算三轴加速度差值
			const deltaX = Math.abs(currentData.x - this.lastAccelerometer.x);
			const deltaY = Math.abs(currentData.y - this.lastAccelerometer.y);
			const deltaZ = Math.abs(currentData.z - this.lastAccelerometer.z);

			// 保存当前值为上一次的值
			this.lastAccelerometer = { ...currentData };

			// 晃动阈值 (根据实际需求调整)
			const SHAKE_THRESHOLD = 0.5;

			// 检测是否达到晃动条件
			if (deltaX > SHAKE_THRESHOLD || deltaY > SHAKE_THRESHOLD || deltaZ > SHAKE_THRESHOLD) {
				this.triggerShake();
			}
		},

		// 触发晃动事件
		triggerShake() {
			// 防抖处理：500ms内只触发一次
			if (this.shakeTimer) return;

			this.isShaking = true;
			this.shakeCount++;
			this.lastShakeTime = Date.now();
			this.shakeStatus = "检测到晃动!";

			// 实际业务中可替换为您的逻辑
			uni.vibrateShort(); // 震动反馈

			// 显示效果1.5秒后重置
			this.shakeTimer = setTimeout(() => {
				this.isShaking = false;
				this.shakeStatus = "监听中...";
				this.shakeTimer = null;
			}, 1500);
		},

		// 格式化时间
		formatTime(timestamp) {
			const date = new Date(timestamp);
			return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		}
	}
};
</script>

<style lang="scss">
.shake-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30rpx;
	background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
	min-height: 100vh;
}

.phone-model {
	width: 320rpx;
	height: 650rpx;
	background-color: #333;
	border-radius: 40rpx;
	position: relative;
	overflow: hidden;
	box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
	margin: 40rpx 0;

	// 顶部刘海
	&::before {
		content: "";
		position: absolute;
		top: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 160rpx;
		height: 30rpx;
		background-color: #000;
		border-radius: 0 0 20rpx 20rpx;
		z-index: 10;
	}

	// 晃动动画
	&.shake-animation {
		animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}
}

.screen {
	position: absolute;
	top: 50rpx;
	left: 10rpx;
	right: 10rpx;
	bottom: 10rpx;
	background-color: #f0f2f5;
	border-radius: 30rpx;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 50rpx;
}

.shake-icon {
	width: 120rpx;
	height: 120rpx;
	margin: 40rpx 0;

	&.pulse {
		animation: pulse 0.5s ease-in-out;
	}
}

.hint {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 60rpx;
}

.status-card {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 20rpx;
	width: 100%;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	margin-bottom: 30rpx;
}

.status-text {
	display: block;
	font-size: 30rpx;
	font-weight: bold;
	color: #2575fc;
	margin-bottom: 10rpx;
}

.count-text {
	display: block;
	font-size: 26rpx;
	color: #666;
}

.sensor-data {
	width: 100%;
	background: #fff;
	border-radius: 16rpx;
	padding: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.data-item {
	margin-bottom: 20rpx;

	&:last-child {
		margin-bottom: 0;
	}

	text {
		display: block;
		font-size: 26rpx;
		margin-bottom: 8rpx;
		color: #444;
	}
}

.progress-bar {
	height: 20rpx;
	background: #eee;
	border-radius: 10rpx;
	overflow: hidden;
}

.progress-fill {
	height: 100%;
	border-radius: 10rpx;

	&.x-fill {
		background: linear-gradient(90deg, #ff416c, #ff4b2b);
	}

	&.y-fill {
		background: linear-gradient(90deg, #11998e, #38ef7d);
	}

	&.z-fill {
		background: linear-gradient(90deg, #396afc, #2948ff);
	}
}

.control-buttons {
	display: flex;
	gap: 30rpx;
	margin: 30rpx 0;
}

.btn {
	background: linear-gradient(45deg, #00b09b, #96c93d);
	color: white;
	border: none;
	border-radius: 50rpx;
	padding: 0 50rpx;
	height: 80rpx;
	font-size: 30rpx;

	&[disabled] {
		opacity: 0.6;
	}

	&.stop {
		background: linear-gradient(45deg, #ff416c, #ff4b2b);
	}
}

.result-card {
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border-radius: 16rpx;
	padding: 20rpx 40rpx;
	margin-top: 20rpx;
	color: white;
	font-size: 28rpx;
}

/* 动画效果 */
@keyframes shake {
	0%,
	100% {
		transform: translateX(0);
	}
	10%,
	30%,
	50%,
	70%,
	90% {
		transform: translateX(-10px);
	}
	20%,
	40%,
	60%,
	80% {
		transform: translateX(10px);
	}
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}
</style>
