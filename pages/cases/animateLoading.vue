<template>
	<view class="loader-container">
		<!-- 旋转加载器 -->
		<view class="loader" :class="{ hidden: !showLoader }"></view>
		
		<!-- 大学名称展示 -->
		<view class="university-name" :class="{ hidden: !showUniversityName }">
			{{ currentUniversity }}
		</view>

		<!-- 完成状态的对勾图标 -->
		<view class="checkmark-container" :class="{ visible: showCheckmark }">
			<view class="checkmark-circle"></view>
			<view class="checkmark-line line1"></view>
			<view class="checkmark-line line2"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AnimateLoading',
	data() {
		return {
			// 动画状态控制
			showLoader: true,
			showUniversityName: true,
			showCheckmark: false,
			
			// 内容数据
			currentUniversity: "清华大学",
			list: ["北京大学", "清华大学", "南开大学", "天津大学", "复旦大学"],
			usedUniversities: [], // 记录已展示的大学，避免连续重复
			
			// 动画配置参数
			config: {
				switchInterval: 1000, // 大学名称切换间隔(ms)
				totalDuration: 5000,  // 总动画时长(ms)
				fadeTransition: 200   // 淡入淡出过渡时间(ms)
			},
			
			// 定时器管理
			timers: {
				animation: null,
				switch: null
			}
		};
	},
	
	mounted() {
		this.startAnimation();
	},
	
	beforeDestroy() {
		this.clearAllTimers();
	},
	
	methods: {
		/**
		 * @desc 启动完整的加载动画流程
		 */
		startAnimation() {
			this.resetAnimationState();
			this.initializeContent();
			this.startContentSwitching();
			this.scheduleAnimationEnd();
		},
		
		/**
		 * @desc 重置动画状态到初始值
		 */
		resetAnimationState() {
			this.showLoader = true;
			this.showCheckmark = false;
			this.showUniversityName = true;
			this.usedUniversities = [];
			this.clearAllTimers();
		},
		
		/**
		 * @desc 初始化内容显示
		 */
		initializeContent() {
			this.currentUniversity = this.getRandomUniversity();
		},
		
		/**
		 * @desc 开始内容切换循环
		 */
		startContentSwitching() {
			this.timers.switch = setInterval(() => {
				this.switchContentWithAnimation();
			}, this.config.switchInterval);
		},
		
		/**
		 * @desc 排动画结束时间
		 */
		scheduleAnimationEnd() {
			this.timers.animation = setTimeout(() => {
				this.endAnimation();
			}, this.config.totalDuration);
		},
		
		/**
		 * @desc 结束动画并显示完成状态
		 */
		endAnimation() {
			// 停止内容切换
			if (this.timers.switch) {
				clearInterval(this.timers.switch);
				this.timers.switch = null;
			}
			
			// 隐藏加载器
			this.showLoader = false;
			
			// 延迟显示完成状态
			setTimeout(() => {
				this.showUniversityName = false;
				this.showCheckmark = true;
			}, 300);
		},
		
		/**
		 * @desc 带动画效果的内容切换
		 */
		switchContentWithAnimation() {
			// 淡出当前内容
			this.showUniversityName = false;
			
			// 延迟更新内容并淡入
			setTimeout(() => {
				this.currentUniversity = this.getRandomUniversity();
				this.showUniversityName = true;
			}, this.config.fadeTransition);
		},
		
		/**
		 * @desc 获取随机大学名称（避免连续重复）
		 * @returns {string} 随机选择的大学名称
		 */
		getRandomUniversity() {
			// 重置已使用记录（当所有大学都展示过时）
			if (this.usedUniversities.length >= this.list.length) {
				this.usedUniversities = [];
			}
			
			// 获取可用的大学列表
			let availableUniversities = this.list.filter(
				university => !this.usedUniversities.includes(university)
			);
			
			// 避免连续显示相同内容
			if (availableUniversities.includes(this.currentUniversity) && availableUniversities.length > 1) {
				availableUniversities = availableUniversities.filter(
					university => university !== this.currentUniversity
				);
			}
			
			// 随机选择
			const randomIndex = Math.floor(Math.random() * availableUniversities.length);
			const selectedUniversity = availableUniversities[randomIndex];
			
			// 记录使用历史
			this.usedUniversities.push(selectedUniversity);
			
			return selectedUniversity;
		},
		
		/**
		 * @desc 清理所有定时器
		 */
		clearAllTimers() {
			Object.keys(this.timers).forEach(key => {
				if (this.timers[key]) {
					clearTimeout(this.timers[key]);
					clearInterval(this.timers[key]);
					this.timers[key] = null;
				}
			});
		},
		
		/**
		 * @desc 动态更新动画配置
		 * @param {Object} newConfig - 新的配置参数
		 */
		updateConfig(newConfig = {}) {
			this.config = { ...this.config, ...newConfig };
		},
		
		/**
		 * @desc 重新开始动画（外部调用接口）
		 */
		restart() {
			this.startAnimation();
		}
	}
};
</script>

<style scoped>
/* ==================== 容器布局 ==================== */
.loader-container {
	position: relative;
	width: 300rpx;
	height: 300rpx;
	text-align: center;
	margin: 200rpx auto;
}

/* ==================== 旋转加载器 ==================== */
.loader {
	width: 200rpx;
	height: 200rpx;
	border: 16rpx solid rgba(246, 247, 248, 0.2);
	border-top: 16rpx solid #fb4710;
	border-radius: 50%;
	margin: 0 auto;
	
	/* 动画效果 */
	animation: spin 1s linear infinite;
	transition: all 0.5s ease;
	opacity: 1;
	transform: scale(1);
}

.loader.hidden {
	opacity: 0;
	transform: scale(0.8);
}

/* ==================== 大学名称展示 ==================== */
.university-name {
	position: absolute;
	top: 35%;
	left: 50%;
	
	/* 文字样式 */
	font-weight: bold;
	font-size: 32rpx;
	color: #fb4710;
	white-space: nowrap;
	
	/* 动画效果 */
	transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	opacity: 1;
	transform: translate(-50%, -50%) scale(1);
}

.university-name.hidden {
	opacity: 0;
	transform: translate(-50%, -50%) scale(0.8);
}

/* ==================== 完成状态对勾 ==================== */
.checkmark-container {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 200rpx;
	height: 200rpx;
	opacity: 0;
	transition: all 0.5s ease;
}

.checkmark-container.visible {
	opacity: 1;
}

/* 对勾圆圈 */
.checkmark-circle {
	width: 200rpx;
	height: 200rpx;
	border: 8rpx solid #fb4710;
	border-radius: 50%;
	position: absolute;
	top: 0;
	left: 0;
	box-sizing: border-box;
	animation: fadeIn 0.6s ease forwards;
}

/* 对勾线条基础样式 */
.checkmark-line {
	position: absolute;
	background-color: #fb4710;
	border-radius: 4rpx;
	opacity: 0;
}

/* 对勾左侧短线 */
.line1 {
	width: 10rpx;
	height: 40rpx;
	top: 112rpx;
	left: 38rpx;
	transform: rotate(-45deg);
	transform-origin: top center;
	animation: drawLine1 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
}

/* 对勾右侧长线 */
.line2 {
	width: 10rpx;
	height: 120rpx;
	top: 35rpx;
	left: 74rpx;
	transform: rotate(40deg);
	transform-origin: bottom center;
	animation: drawLine2 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

/* ==================== 动画关键帧 ==================== */

/* 旋转动画 */
@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

/* 淡入动画 */
@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}

/* 对勾线条绘制动画 */
@keyframes drawLine1 {
	from {
		height: 0;
		opacity: 1;
	}
	to {
		height: 60rpx;
		opacity: 1;
	}
}

@keyframes drawLine2 {
	from {
		height: 0;
		opacity: 1;
	}
	to {
		height: 120rpx;
		opacity: 1;
	}
}
</style>
