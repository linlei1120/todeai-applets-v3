<template>
	<view class="container">
		<view class="header">
			<text class="title">Worklet 动画案例</text>
			<text class="subtitle">体验丝滑的手势驱动动画</text>
		</view>

		<!-- 可拖拽卡片区域 -->
		<view class="animation-area">
			<view class="drag-card" 
				:animation="cardAnimation" 
				@touchstart="onTouchStart" 
				@touchmove="onTouchMove" 
				@touchend="onTouchEnd">
				<view class="card-content">
					<text class="card-icon">🎯</text>
					<text class="card-title">拖拽我试试</text>
					<text class="card-desc">Worklet 驱动动画</text>
				</view>
			</view>
		</view>

		<!-- 弹性球动画 -->
		<view class="bounce-section">
			<text class="section-title">弹性球动画</text>
			<view class="bounce-container">
				<view class="bounce-ball" 
					:animation="bounceAnimation" 
					@tap="triggerBounce">
					<text class="ball-text">点击</text>
				</view>
			</view>
		</view>

		<!-- 波纹动画 -->
		<view class="ripple-section">
			<text class="section-title">波纹扩散动画</text>
			<view class="ripple-container" @tap="triggerRipple">
				<view class="ripple-circle" 
					v-for="(ripple, index) in ripples" 
					:key="index"
					:animation="ripple.animation"
					:style="{ left: ripple.x + 'px', top: ripple.y + 'px' }">
				</view>
				<text class="ripple-text">点击任意位置</text>
			</view>
		</view>

		<!-- 状态显示 -->
		<view class="status-panel">
			<text class="status-title">动画状态</text>
			<text class="status-item">X: {{ cardPosition.x.toFixed(2) }}</text>
			<text class="status-item">Y: {{ cardPosition.y.toFixed(2) }}</text>
			<text class="status-item">动画FPS: {{ animationFPS }}</text>
		</view>

		<!-- 控制按钮 -->
		<view class="control-buttons">
			<button class="control-btn primary" @tap="resetPosition">重置位置</button>
			<button class="control-btn secondary" @tap="toggleAnimation">
				{{ isAnimating ? '暂停动画' : '开始动画' }}
			</button>
		</view>
    </view>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { onLoad, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

// 环境数据
const envData = ref({});
const userCxt = ref("");
const isUse = ref();

// 动画状态
const isAnimating = ref(true);
const animationFPS = ref(60);

// 卡片位置和动画
const cardPosition = reactive({ x: 0, y: 0 });
const cardAnimation = ref(null);
const startPosition = reactive({ x: 0, y: 0 });
const isDragging = ref(false);

// 弹性球动画
const bounceAnimation = ref(null);
const isBouncing = ref(false);

// 波纹动画
const ripples = ref([]);
let rippleId = 0;

// 动画计时器
let animationTimer = null;
let fpsTimer = null;
let fpsCounter = 0;

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

// 创建动画对象的工具函数
const createAnimation = (options = {}) => {
	const animation = uni.createAnimation({
		duration: options.duration || 300,
		timingFunction: options.timingFunction || 'ease',
		delay: options.delay || 0,
		...options
	});
	return animation;
};

// 卡片拖拽事件处理
const onTouchStart = (e) => {
	if (!isAnimating.value) return;
	
	isDragging.value = true;
	const touch = e.touches[0];
	startPosition.x = touch.clientX - cardPosition.x;
	startPosition.y = touch.clientY - cardPosition.y;
	
	// 创建即时响应动画
	const animation = createAnimation({ duration: 0 });
	animation.scale(1.1).rotate(5);
	cardAnimation.value = animation.export();
};

const onTouchMove = (e) => {
	if (!isDragging.value || !isAnimating.value) return;
	
	const touch = e.touches[0];
	cardPosition.x = touch.clientX - startPosition.x;
	cardPosition.y = touch.clientY - startPosition.y;
	
	// 限制拖拽范围
	const maxX = 150;
	const maxY = 200;
	cardPosition.x = Math.max(-maxX, Math.min(maxX, cardPosition.x));
	cardPosition.y = Math.max(-maxY, Math.min(maxY, cardPosition.y));
	
	// 实时更新位置
	const animation = createAnimation({ duration: 0 });
	animation.translateX(cardPosition.x).translateY(cardPosition.y).scale(1.1).rotate(cardPosition.x * 0.1);
	cardAnimation.value = animation.export();
};

const onTouchEnd = (e) => {
	if (!isDragging.value) return;
	
	isDragging.value = false;
	
	// 弹性回弹动画
	const animation = createAnimation({ 
		duration: 600, 
		timingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)' 
	});
	
	// 计算回弹位置
	const dampening = 0.3;
	const finalX = cardPosition.x * dampening;
	const finalY = cardPosition.y * dampening;
	
	animation.translateX(finalX).translateY(finalY).scale(1).rotate(0);
	cardAnimation.value = animation.export();
	
	// 更新最终位置
	setTimeout(() => {
		cardPosition.x = finalX;
		cardPosition.y = finalY;
	}, 600);
};

// 弹性球动画
const triggerBounce = () => {
	if (isBouncing.value) return;
	
	isBouncing.value = true;
	const animation = createAnimation({ duration: 800, timingFunction: 'ease-out' });
	
	// 多阶段弹跳动画
	animation.translateY(-100).step();
	animation.translateY(-50).step({ duration: 400 });
	animation.translateY(-20).step({ duration: 200 });
	animation.translateY(0).step({ duration: 200 });
	
	bounceAnimation.value = animation.export();
	
	setTimeout(() => {
		isBouncing.value = false;
	}, 1400);
};

// 波纹动画
const triggerRipple = (e) => {
	const { clientX, clientY } = e.detail || e.touches?.[0] || { clientX: 150, clientY: 150 };
	
	const ripple = {
		id: rippleId++,
		x: clientX - 25,
		y: clientY - 25,
		animation: null
	};
	
	ripples.value.push(ripple);
	
	// 创建波纹扩散动画
	const animation = createAnimation({ duration: 1000, timingFunction: 'ease-out' });
	animation.scale(8).opacity(0);
	ripple.animation = animation.export();
	
	// 清理波纹
	setTimeout(() => {
		const index = ripples.value.findIndex(r => r.id === ripple.id);
		if (index > -1) {
			ripples.value.splice(index, 1);
		}
	}, 1000);
};

// 重置位置
const resetPosition = () => {
	cardPosition.x = 0;
	cardPosition.y = 0;
	
	const animation = createAnimation({ duration: 500, timingFunction: 'ease-out' });
	animation.translateX(0).translateY(0).scale(1).rotate(0);
	cardAnimation.value = animation.export();
};

// 切换动画状态
const toggleAnimation = () => {
	isAnimating.value = !isAnimating.value;
	if (isAnimating.value) {
		startFPSMonitor();
	} else {
		stopFPSMonitor();
	}
};

// FPS 监控
const startFPSMonitor = () => {
	fpsCounter = 0;
	fpsTimer = setInterval(() => {
		animationFPS.value = fpsCounter;
		fpsCounter = 0;
	}, 1000);
	
	const updateFPS = () => {
		if (isAnimating.value) {
			fpsCounter++;
			requestAnimationFrame(updateFPS);
		}
	};
	requestAnimationFrame(updateFPS);
};

const stopFPSMonitor = () => {
	if (fpsTimer) {
		clearInterval(fpsTimer);
		fpsTimer = null;
	}
	animationFPS.value = 0;
};

// 生命周期
onLoad((option) => {
	console.log("Worklet 动画页面加载");
	console.log(wx.env);
	envData.value = wx.env;
	
	// 初始化动画
	setTimeout(() => {
		startFPSMonitor();
	}, 500);
});

onMounted(() => {
	console.log("组件挂载完成");
});

onUnload(() => {
	stopFPSMonitor();
	if (animationTimer) {
		clearInterval(animationTimer);
	}
});

onUnmounted(() => {
	stopFPSMonitor();
});

// 消息提示弹框
const showToast = () => {
	wx.showToast({
		title: "成功",
		icon: "success",
		image: "/static/avatar.png",
		mask: false,
		duration: 2000,
		success() {
			console.log("Toast触发成功");
		}
	});
};

</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx;
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
	text-align: center;
	margin-bottom: 40rpx;
	
	.title {
		display: block;
		font-size: 42rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 10rpx;
	}
	
	.subtitle {
		display: block;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
	}
}

.animation-area {
	height: 400rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
}

.drag-card {
	width: 200rpx;
	height: 200rpx;
	background: linear-gradient(45deg, #ff6b6b, #feca57);
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
	cursor: grab;
	
	&:active {
		cursor: grabbing;
	}
}

.card-content {
	text-align: center;
	
	.card-icon {
		display: block;
		font-size: 48rpx;
		margin-bottom: 10rpx;
	}
	
	.card-title {
		display: block;
		font-size: 24rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 5rpx;
	}
	
	.card-desc {
		display: block;
		font-size: 20rpx;
		color: rgba(255, 255, 255, 0.9);
	}
}

.bounce-section {
	margin-bottom: 40rpx;
	
	.section-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 20rpx;
		text-align: center;
	}
}

.bounce-container {
	height: 200rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 20rpx;
}

.bounce-ball {
	width: 100rpx;
	height: 100rpx;
	background: linear-gradient(45deg, #48cae4, #0096c7);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.3);
	
	.ball-text {
		font-size: 20rpx;
		color: #ffffff;
		font-weight: bold;
	}
}

.ripple-section {
	margin-bottom: 40rpx;
	
	.section-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 20rpx;
		text-align: center;
	}
}

.ripple-container {
	height: 300rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	
	.ripple-text {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
		z-index: 10;
	}
}

.ripple-circle {
	position: absolute;
	width: 50rpx;
	height: 50rpx;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent);
	border-radius: 50%;
	pointer-events: none;
}

.status-panel {
	background: rgba(0, 0, 0, 0.3);
	border-radius: 15rpx;
	padding: 20rpx;
	margin-bottom: 30rpx;
	
	.status-title {
		display: block;
		font-size: 28rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 15rpx;
	}
	
	.status-item {
		display: block;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 8rpx;
		font-family: 'Courier New', monospace;
	}
}

.control-buttons {
	display: flex;
	gap: 20rpx;
	
	.control-btn {
		flex: 1;
		height: 80rpx;
		border-radius: 40rpx;
		border: none;
		font-size: 28rpx;
		font-weight: bold;
		
		&.primary {
			background: linear-gradient(45deg, #ff6b6b, #feca57);
			color: #ffffff;
		}
		
		&.secondary {
			background: rgba(255, 255, 255, 0.2);
			color: #ffffff;
			border: 2rpx solid rgba(255, 255, 255, 0.3);
		}
	}
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
