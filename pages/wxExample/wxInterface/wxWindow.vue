<template>
	<view class="container">
		<!-- API说明折叠面板 -->
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.onWindowStateChange" name="onWindowStateChange">
				<view class="api-desc">监听窗口状态变化事件，如最小化、最大化、全屏等状态变化</view>
				<view class="api-usage">使用场景：需要感知窗口状态变化时调整界面布局或业务逻辑</view>
				<p>注意：仅适用于 PC 平台</p>
			</uv-collapse-item>
			
			<uv-collapse-item title="API接口： wx.onWindowResize" name="onWindowResize">
				<view class="api-desc">监听窗口尺寸变化事件，当窗口大小发生改变时触发</view>
				<view class="api-usage">使用场景：响应式布局调整、界面元素重新定位等</view>
			</uv-collapse-item>
			
			<uv-collapse-item title="API接口： wx.offWindowStateChange" name="offWindowStateChange">
				<view class="api-desc">取消监听窗口状态变化事件</view>
				<view class="api-usage">使用场景：页面卸载时移除监听器，避免内存泄漏</view>
			</uv-collapse-item>
			
			<uv-collapse-item title="API接口： wx.offWindowResize" name="offWindowResize">
				<view class="api-desc">取消监听窗口尺寸变化事件</view>
				<view class="api-usage">使用场景：页面卸载时移除监听器</view>
			</uv-collapse-item>
			
			<uv-collapse-item title="API接口： wx.checkIsPictureInPictureActive" name="checkPictureInPicture">
				<view class="api-desc">检查当前是否处于画中画模式</view>
				<view class="api-usage">使用场景：根据画中画状态调整界面显示</view>
				<p>注意：在 video/live-player/live-pusher 下可用</p>
			</uv-collapse-item>
		</uv-collapse>

		<!-- 功能演示区域 -->
		<view class="dynamic-message-section">
			<text class="section-title">窗口API功能演示</text>
			
			<!-- 按钮组 -->
			<view class="button-group">
				<uv-button @tap="startWindowStateMonitor" type="success" text="开始监听窗口状态" size="small"></uv-button>
				<uv-button @tap="stopWindowStateMonitor" type="error" text="停止监听窗口状态" size="small"></uv-button>
			</view>
			
			<view class="button-group">
				<uv-button @tap="startWindowResizeMonitor" type="primary" text="开始监听窗口大小" size="small"></uv-button>
				<uv-button @tap="stopWindowResizeMonitor" type="warning" text="停止监听窗口大小" size="small"></uv-button>
			</view>
			
			<view class="button-group">
				<uv-button @tap="checkPictureInPicture" type="info" text="检查画中画状态" size="small"></uv-button>
				<uv-button @tap="clearResults" type="default" text="清空结果" size="small"></uv-button>
			</view>

			<!-- 状态显示 -->
			<view class="status-section">
				<text class="status-title">监听状态</text>
				<view class="status-item">
					<text class="status-label">窗口状态监听：</text>
					<text class="status-value" :class="{ active: isWindowStateListening }">
						{{ isWindowStateListening ? '已开启' : '已关闭' }}
					</text>
				</view>
				<view class="status-item">
					<text class="status-label">窗口大小监听：</text>
					<text class="status-value" :class="{ active: isWindowResizeListening }">
						{{ isWindowResizeListening ? '已开启' : '已关闭' }}
					</text>
				</view>
			</view>

			<!-- 演示结果展示 -->
			<view class="tips" v-if="apiResults.length > 0">
				<text class="tip-text">API执行结果</text>
				<view class="result-list">
					<view 
						v-for="(result, index) in apiResults" 
						:key="index" 
						class="result-item"
						:class="result.type"
					>
						<text class="time">{{ result.time }}</text>
						<text class="api-name">{{ result.api }}</text>
						<text class="result-content">{{ result.content }}</text>
					</view>
				</view>
			</view>

			<!-- 当前窗口信息 -->
			<view class="window-info" v-if="currentWindowInfo">
				<text class="info-title">当前窗口信息</text>
				<view class="info-item">
					<text class="info-label">窗口宽度：</text>
					<text class="info-value">{{ currentWindowInfo.width }}px</text>
				</view>
				<view class="info-item">
					<text class="info-label">窗口高度：</text>
					<text class="info-value">{{ currentWindowInfo.height }}px</text>
				</view>
				<view class="info-item">
					<text class="info-label">画中画状态：</text>
					<text class="info-value">{{ currentWindowInfo.isPictureInPicture ? '是' : '否' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { onLoad, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

const envData = ref({});
const userCxt = ref("");
const isUse = ref();

// 监听状态
const isWindowStateListening = ref(false);
const isWindowResizeListening = ref(false);

// API执行结果
const apiResults = ref([]);

// 当前窗口信息
const currentWindowInfo = ref(null);

// 监听器引用，用于取消监听
let windowStateListener = null;
let windowResizeListener = null;

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

// 添加结果到列表
const addResult = (api, content, type = 'info') => {
	console.log("addResult", api);
	const now = new Date();
	const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
	
	apiResults.value.unshift({
		time: timeStr,
		api: api,
		content: content,
		type: type
	});
	
	// 保持结果列表不超过20条
	if (apiResults.value.length > 20) {
		apiResults.value = apiResults.value.slice(0, 20);
	}
};

// 开始监听窗口状态变化
const startWindowStateMonitor = () => {
	try {
		if (typeof wx === 'undefined' || !wx.onWindowStateChange) {
			addResult('wx.onWindowStateChange', '当前环境不支持此API', 'error');
			return;
		}

		windowStateListener = (res) => {
			console.log("windowStateListener", res);
			addResult('wx.onWindowStateChange', `窗口状态变化: ${JSON.stringify(res)}`, 'success');
		};

		wx.onWindowStateChange(windowStateListener);
		isWindowStateListening.value = true;
		addResult('wx.onWindowStateChange', '开始监听窗口状态变化', 'info');
	} catch (error) {
		addResult('wx.onWindowStateChange', `监听失败: ${error.message}`, 'error');
	}
};

// 停止监听窗口状态变化
const stopWindowStateMonitor = () => {
	try {
		if (typeof wx === 'undefined' || !wx.offWindowStateChange) {
			addResult('wx.offWindowStateChange', '当前环境不支持此API', 'error');
			return;
		}

		if (windowStateListener) {
			wx.offWindowStateChange(windowStateListener);
			windowStateListener = null;
			isWindowStateListening.value = false;
			addResult('wx.offWindowStateChange', '已停止监听窗口状态变化', 'info');
		} else {
			addResult('wx.offWindowStateChange', '没有正在监听的窗口状态', 'warning');
		}
	} catch (error) {
		addResult('wx.offWindowStateChange', `取消监听失败: ${error.message}`, 'error');
	}
};

// 开始监听窗口大小变化
const startWindowResizeMonitor = () => {
	try {
		if (typeof wx === 'undefined' || !wx.onWindowResize) {
			addResult('wx.onWindowResize', '当前环境不支持此API', 'error');
			return;
		}

		windowResizeListener = (res) => {
			console.log("windowResizeListener", res);
			
			addResult('wx.onWindowResize', `窗口大小变化: 宽${res.size.windowWidth}px × 高${res.size.windowHeight}px`, 'success');
			// 更新当前窗口信息
			if (currentWindowInfo.value) {
				currentWindowInfo.value.width = res.size.windowWidth;
				currentWindowInfo.value.height = res.size.windowHeight;
			}
		};

		wx.onWindowResize(windowResizeListener);
		isWindowResizeListening.value = true;
		addResult('wx.onWindowResize', '开始监听窗口大小变化', 'info');
	} catch (error) {
		addResult('wx.onWindowResize', `监听失败: ${error.message}`, 'error');
	}
};

// 停止监听窗口大小变化
const stopWindowResizeMonitor = () => {
	try {
		if (typeof wx === 'undefined' || !wx.offWindowResize) {
			addResult('wx.offWindowResize', '当前环境不支持此API', 'error');
			return;
		}

		if (windowResizeListener) {
			wx.offWindowResize(windowResizeListener);
			windowResizeListener = null;
			isWindowResizeListening.value = false;
			addResult('wx.offWindowResize', '已停止监听窗口大小变化', 'info');
		} else {
			addResult('wx.offWindowResize', '没有正在监听的窗口大小', 'warning');
		}
	} catch (error) {
		addResult('wx.offWindowResize', `取消监听失败: ${error.message}`, 'error');
	}
};

// 检查画中画状态
const checkPictureInPicture = () => {
	try {
		if (typeof wx === 'undefined' || !wx.checkIsPictureInPictureActive) {
			addResult('wx.checkIsPictureInPictureActive', '当前环境不支持此API', 'error');
			return;
		}

		const result = wx.checkIsPictureInPictureActive();
		const status = result ? '是' : '否';
		addResult('wx.checkIsPictureInPictureActive', `当前画中画状态: ${status}`, 'info');
		
		// 更新当前窗口信息
		if (currentWindowInfo.value) {
			currentWindowInfo.value.isPictureInPicture = result;
		}
	} catch (error) {
		addResult('wx.checkIsPictureInPictureActive', `检查失败: ${error.message}`, 'error');
	}
};

// 清空结果
const clearResults = () => {
	apiResults.value = [];
	addResult('系统', '已清空所有结果', 'info');
};

// 获取系统信息
const getSystemInfo = () => {
	try {
		if (typeof wx !== 'undefined' && wx.getSystemInfoSync) {
			const systemInfo = wx.getSystemInfoSync();
			currentWindowInfo.value = {
				width: systemInfo.windowWidth || systemInfo.screenWidth,
				height: systemInfo.windowHeight || systemInfo.screenHeight,
				isPictureInPicture: false
			};
		}
	} catch (error) {
		console.log('获取系统信息失败:', error);
	}
};

onLoad((option) => {
	console.log("option", option);
	console.log("wx.env", wx?.env);
	envData.value = wx?.env || {};
	
	// 获取初始窗口信息
	getSystemInfo();
	
	// 添加初始化日志
	addResult('系统', '页面初始化完成，可以开始测试各项API功能', 'info');
});

onUnload(() => {
	// 页面卸载时清理监听器
	stopWindowStateMonitor();
	stopWindowResizeMonitor();
});

onBeforeUnmount(() => {
	// 组件卸载前清理监听器
	stopWindowStateMonitor();
	stopWindowResizeMonitor();
});

// 兼容旧版本的方法
const onWindowStateChange = () => {
	startWindowStateMonitor();
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 30rpx;
}

.api-desc {
	color: #333;
	font-size: 28rpx;
	line-height: 1.5;
	margin-bottom: 10rpx;
}

.api-usage {
	color: #666;
	font-size: 24rpx;
	line-height: 1.4;
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
		margin-bottom: 20rpx;

		.uv-button {
			flex: 1;
		}
	}

	.status-section {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15rpx;
		padding: 25rpx;
		margin-bottom: 20rpx;
		border: 1px solid rgba(255, 255, 255, 0.2);

		.status-title {
			display: block;
			font-size: 28rpx;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 15rpx;
		}

		.status-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;

			.status-label {
				color: rgba(255, 255, 255, 0.9);
				font-size: 26rpx;
			}

			.status-value {
				color: #ff6b6b;
				font-size: 26rpx;
				font-weight: bold;

				&.active {
					color: #51cf66;
				}
			}
		}
	}

	.tips {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15rpx;
		padding: 25rpx;
		border: 1px solid rgba(255, 255, 255, 0.2);
		margin-bottom: 20rpx;

		.tip-text {
			display: block;
			font-size: 28rpx;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 15rpx;
		}

		.result-list {
			max-height: 600rpx;
			overflow-y: auto;
		}

		.result-item {
			background: rgba(255, 255, 255, 0.05);
			border-radius: 10rpx;
			padding: 15rpx;
			margin-bottom: 10rpx;
			border-left: 4rpx solid #ffffff;

			&.success {
				border-left-color: #51cf66;
			}

			&.error {
				border-left-color: #ff6b6b;
			}

			&.warning {
				border-left-color: #ffd43b;
			}

			&.info {
				border-left-color: #74c0fc;
			}

			.time {
				display: block;
				font-size: 22rpx;
				color: rgba(255, 255, 255, 0.7);
				margin-bottom: 5rpx;
			}

			.api-name {
				display: block;
				font-size: 24rpx;
				color: #ffffff;
				font-weight: bold;
				margin-bottom: 5rpx;
			}

			.result-content {
				display: block;
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.9);
				line-height: 1.4;
			}
		}
	}

	.window-info {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15rpx;
		padding: 25rpx;
		border: 1px solid rgba(255, 255, 255, 0.2);

		.info-title {
			display: block;
			font-size: 28rpx;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 15rpx;
		}

		.info-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;

			.info-label {
				color: rgba(255, 255, 255, 0.9);
				font-size: 26rpx;
			}

			.info-value {
				color: #ffffff;
				font-size: 26rpx;
				font-weight: bold;
			}
		}
	}
}
</style>
