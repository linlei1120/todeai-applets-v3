<template>
	<view class="container">
		<view class="header">
			<view class="title">wx.pageScrollTo 示例</view>
			<view class="subtitle">页面滚动API演示</view>
		</view>

		<view class="control-panel">
			<view class="input-group">
				<text class="label">滚动位置 (px):</text>
				<input type="number" v-model="scrollPosition" placeholder="输入滚动位置" />
			</view>

			<view class="input-group">
				<text class="label">滚动时长 (ms):</text>
				<input type="number" v-model="scrollDuration" placeholder="输入滚动时长" />
			</view>

			<view class="checkbox-group">
				<checkbox :checked="scrollWithAnimation" @change="scrollWithAnimation = !scrollWithAnimation" />
				<text @click="scrollWithAnimation = !scrollWithAnimation">使用动画效果</text>
			</view>

			<view class="button-group">
				<button @click="scrollToPosition">滚动到指定位置</button>
				<button @click="scrollToTop">滚动到顶部</button>
				<button @click="scrollToBottom">滚动到底部</button>
			</view>

			<view class="selector-group">
				<text class="label">滚动到指定元素:</text>
				<view class="selector-buttons">
					<button @click="scrollToElement('section1')">第一部分</button>
					<button @click="scrollToElement('section2')">第二部分</button>
					<button @click="scrollToElement('section3')">第三部分</button>
					<button @click="scrollToElement('section4')">第四部分</button>
				</view>
			</view>
		</view>

		<!-- 新增 ScrollViewContext 增强 ScrollView 实例演示 -->
		<view class="section">
			<view class="section-title">ScrollViewContext 增强 ScrollView 实例</view>
			<view class="section-description">
				<text>通过 wx.createSelectorQuery 的 NodesRef.node 方法获取增强的 ScrollView 实例。</text>
				<text>仅在 scroll-view 组件开启 enhanced 属性后生效。</text>
			</view>

			<view class="scroll-enhanced-demo">
				<scroll-view
					id="enhanced-scroll"
					class="enhanced-scroll-view"
					scroll-y
					enhanced="true"
					:show-scrollbar="showScrollbar"
					:bounces="bounces"
					:paging-enabled="pagingEnabled"
					:fast-deceleration="fastDeceleration"
					@dragstart="onDragStart"
					@dragging="onDragging"
					@dragend="onDragEnd"
				>
					<view v-for="i in 20" :key="i" class="scroll-item">
						<text>内容项 {{ i }}</text>
						<text class="item-description">ScrollViewContext 增强示例项</text>
					</view>
				</scroll-view>
			</view>

			<view class="scroll-controls">
				<view class="scroll-control-section">
					<view class="control-title">滚动控制</view>
					<view class="control-buttons">
						<button @click="scrollEnhancedTo(0)" class="control-btn">滚动到顶部</button>
						<button @click="scrollEnhancedTo(500)" class="control-btn">滚动到中间</button>
						<button @click="scrollEnhancedToBottom()" class="control-btn">滚动到底部</button>
					</view>
				</view>

				<view class="scroll-control-section">
					<view class="control-title">ScrollView 属性控制</view>
					<view class="control-props">
						<view class="prop-item">
							<checkbox :checked="showScrollbar" @change="toggleScrollbar" />
							<text @click="toggleScrollbar">显示滚动条</text>
						</view>
						<view class="prop-item">
							<checkbox :checked="bounces" @change="toggleBounces" />
							<text @click="toggleBounces">边界弹性</text>
						</view>
						<view class="prop-item">
							<checkbox :checked="pagingEnabled" @change="togglePagingEnabled" />
							<text @click="togglePagingEnabled">分页滑动</text>
						</view>
						<view class="prop-item">
							<checkbox :checked="fastDeceleration" @change="toggleFastDeceleration" />
							<text @click="toggleFastDeceleration">快速减速</text>
						</view>
					</view>
				</view>

				<view class="scroll-control-section">
					<view class="control-title">滚动状态</view>
					<view class="scroll-status">
						<view class="status-item">
							<text class="status-label">滚动位置:</text>
							<text class="status-value">{{ enhancedScrollTop }}</text>
						</view>
						<view class="status-item">
							<text class="status-label">滚动速度:</text>
							<text class="status-value">{{ enhancedScrollVelocity || "0" }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="content">
			<view id="section1" class="section">
				<view class="section-title">第一部分</view>
				<view class="section-content">
					<text>这是第一部分的内容。wx.pageScrollTo API 可以让页面滚动到指定的位置。</text>
					<text>当前部分的ID: section1</text>
				</view>
			</view>

			<view id="section2" class="section">
				<view class="section-title">第二部分</view>
				<view class="section-content">
					<text>这是第二部分的内容。你可以通过指定滚动位置(scrollTop)来控制滚动到哪个位置。</text>
					<text>当前部分的ID: section2</text>
				</view>
			</view>

			<view id="section3" class="section">
				<view class="section-title">第三部分</view>
				<view class="section-content">
					<text>这是第三部分的内容。你可以通过设置duration来控制滚动动画的时长。</text>
					<text>当前部分的ID: section3</text>
				</view>
			</view>

			<view id="section4" class="section">
				<view class="section-title">第四部分</view>
				<view class="section-content">
					<text>这是第四部分的内容。你可以通过设置selector来滚动到指定的元素位置。</text>
					<text>当前部分的ID: section4</text>
				</view>
			</view>
		</view>

		<view class="tips">
			<view class="tips-title">wx.pageScrollTo 参数说明:</view>
			<view class="tips-item">
				<text class="param-name">scrollTop:</text>
				<text class="param-desc">滚动到页面的目标位置，单位为px</text>
			</view>
			<view class="tips-item">
				<text class="param-name">duration:</text>
				<text class="param-desc">滚动动画的时长，单位为ms，默认为300</text>
			</view>
			<view class="tips-item">
				<text class="param-name">selector:</text>
				<text class="param-desc">选择器，指定滚动到哪个元素，优先级高于scrollTop</text>
			</view>
			<view class="tips-item">
				<text class="param-name">offsetTop:</text>
				<text class="param-desc">偏移距离，需与selector配合使用，滚动到距离元素顶部offsetTop的位置</text>
			</view>
			<view class="tips-item">
				<text class="param-name">scrollWithAnimation:</text>
				<text class="param-desc">是否使用动画过渡，默认为true</text>
			</view>
		</view>

		<!-- 新增 ScrollViewContext 相关说明 -->
		<view class="tips">
			<view class="tips-title">ScrollViewContext 说明:</view>
			<view class="tips-item">
				<text class="param-name">获取方式:</text>
				<text class="param-desc">wx.createSelectorQuery().select('#scroll-view-id').node().exec(callback)</text>
			</view>
			<view class="tips-item">
				<text class="param-name">前提条件:</text>
				<text class="param-desc">scroll-view 组件必须开启 enhanced 属性</text>
			</view>
			<view class="tips-item">
				<text class="param-name">scrollTo:</text>
				<text class="param-desc">滚动到指定位置，接收参数：{top, left, velocity, duration, animated}</text>
			</view>
			<view class="tips-item">
				<text class="param-name">scrollIntoView:</text>
				<text class="param-desc">滚动到指定元素，接收元素selector</text>
			</view>
			<view class="tips-item">
				<text class="param-name">属性控制:</text>
				<text class="param-desc">可直接设置bounces, showScrollbar, fastDeceleration等属性</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 滚动参数
const scrollPosition = ref(0);
const scrollDuration = ref(300);
const scrollWithAnimation = ref(true);

// 增强ScrollView参数
const showScrollbar = ref(true);
const bounces = ref(true);
const pagingEnabled = ref(false);
const fastDeceleration = ref(false);
const enhancedScrollTop = ref(0);
const enhancedScrollVelocity = ref("");

// 滚动到指定位置
const scrollToPosition = () => {
	if (!scrollPosition.value) {
		uni.showToast({
			title: "请输入滚动位置",
			icon: "none"
		});
		return;
	}

	wx.pageScrollTo({
		scrollTop: Number(scrollPosition.value),
		duration: Number(scrollDuration.value || 300),
		scrollWithAnimation: scrollWithAnimation.value
	});

	console.log("滚动到位置:", scrollPosition.value, "持续时间:", scrollDuration.value, "使用动画:", scrollWithAnimation.value);
};

// 滚动到顶部
const scrollToTop = () => {
	wx.pageScrollTo({
		scrollTop: 0,
		duration: Number(scrollDuration.value || 300),
		scrollWithAnimation: scrollWithAnimation.value
	});

	console.log("滚动到顶部", "持续时间:", scrollDuration.value, "使用动画:", scrollWithAnimation.value);
};

// 滚动到底部 (这里使用一个很大的值模拟滚动到底部)
const scrollToBottom = () => {
	wx.pageScrollTo({
		scrollTop: 10000,
		duration: Number(scrollDuration.value || 300),
		scrollWithAnimation: scrollWithAnimation.value
	});

	console.log("滚动到底部", "持续时间:", scrollDuration.value, "使用动画:", scrollWithAnimation.value);
};

// 滚动到指定元素
const scrollToElement = (elementId) => {
	wx.pageScrollTo({
		selector: `#${elementId}`,
		duration: Number(scrollDuration.value || 300),
		scrollWithAnimation: scrollWithAnimation.value,
		offsetTop: 0 // 设置偏移量
	});

	console.log("滚动到元素:", elementId, "持续时间:", scrollDuration.value, "使用动画:", scrollWithAnimation.value);
};

// 获取增强型ScrollView上下文
const getScrollViewContext = () => {
	try {
		const query = wx.createSelectorQuery();
		query
			.select("#enhanced-scroll")
			.node()
			.exec((res) => {
				if (res && res[0] && res[0].node) {
					const scrollView = res[0].node;
					console.log("获取ScrollViewContext成功:", scrollView);
					return scrollView;
				} else {
					console.error("获取ScrollViewContext失败");
					return null;
				}
			});
	} catch (error) {
		console.error("获取ScrollViewContext错误:", error);
		return null;
	}
};

// 使用增强型ScrollView滚动到指定位置
const scrollEnhancedTo = (top) => {
	try {
		const query = wx.createSelectorQuery();
		query
			.select("#enhanced-scroll")
			.node()
			.exec((res) => {
				if (res && res[0] && res[0].node) {
					const scrollView = res[0].node;
					scrollView.scrollTo({
						top: top,
						duration: 300,
						animated: true
					});
					console.log(`增强型ScrollView滚动到位置: ${top}`);
				} else {
					console.error("获取ScrollViewContext失败");
					uni.showToast({
						title: "滚动操作失败",
						icon: "none"
					});
				}
			});
	} catch (error) {
		console.error("增强型ScrollView滚动失败:", error);
		uni.showToast({
			title: "滚动操作失败",
			icon: "none"
		});
	}
};

// 使用增强型ScrollView滚动到底部
const scrollEnhancedToBottom = () => {
	try {
		const query = wx.createSelectorQuery();
		query
			.select("#enhanced-scroll")
			.node()
			.exec((res) => {
				if (res && res[0] && res[0].node) {
					const scrollView = res[0].node;
					scrollView.scrollTo({
						top: 10000, // 使用一个足够大的值模拟滚动到底部
						duration: 300,
						animated: true
					});
					console.log("增强型ScrollView滚动到底部");
				} else {
					console.error("获取ScrollViewContext失败");
					uni.showToast({
						title: "滚动操作失败",
						icon: "none"
					});
				}
			});
	} catch (error) {
		console.error("增强型ScrollView滚动失败:", error);
		uni.showToast({
			title: "滚动操作失败",
			icon: "none"
		});
	}
};

// 切换ScrollView属性
const toggleScrollbar = () => {
	showScrollbar.value = !showScrollbar.value;
	updateScrollViewProperty("showScrollbar", showScrollbar.value);
};

const toggleBounces = () => {
	bounces.value = !bounces.value;
	updateScrollViewProperty("bounces", bounces.value);
};

const togglePagingEnabled = () => {
	pagingEnabled.value = !pagingEnabled.value;
	updateScrollViewProperty("pagingEnabled", pagingEnabled.value);
};

const toggleFastDeceleration = () => {
	fastDeceleration.value = !fastDeceleration.value;
	updateScrollViewProperty("fastDeceleration", fastDeceleration.value);
};

// 更新ScrollView属性
const updateScrollViewProperty = (propertyName, value) => {
	try {
		const query = wx.createSelectorQuery();
		query
			.select("#enhanced-scroll")
			.node()
			.exec((res) => {
				if (res && res[0] && res[0].node) {
					const scrollView = res[0].node;
					scrollView[propertyName] = value;
					console.log(`设置ScrollView ${propertyName}:`, value);
				} else {
					console.error("获取ScrollViewContext失败");
				}
			});
	} catch (error) {
		console.error(`设置ScrollView ${propertyName}失败:`, error);
	}
};

// 滚动事件处理
const onDragStart = (e) => {
	console.log("滚动开始:", e);
	// 兼容不同平台，检查事件对象的结构
	const detail = e.detail || e;
	enhancedScrollTop.value = detail.scrollTop || 0;
};

const onDragging = (e) => {
	// 兼容不同平台，检查事件对象的结构
	const detail = e.detail || e;
	enhancedScrollTop.value = detail.scrollTop || 0;
};

const onDragEnd = (e) => {
	console.log("滚动结束:", e);
	// 兼容不同平台，检查事件对象的结构
	const detail = e.detail || e;
	enhancedScrollTop.value = detail.scrollTop || 0;
	enhancedScrollVelocity.value = `x:${detail.velocity.x},y:${detail.velocity.y}`;
};

// 页面加载完成后，添加一些填充内容使页面可滚动
onMounted(() => {
	console.log("页面加载完成");
});
</script>

<style lang="scss" scoped>
.container {
	padding: 20px;

	.header {
		margin-bottom: 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}

		.subtitle {
			font-size: 28rpx;
			color: #666;
			margin-top: 10rpx;
		}
	}

	.control-panel {
		background-color: #f8f9fa;
		padding: 20rpx;
		border-radius: 12rpx;
		margin-bottom: 30rpx;

		.input-group {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.label {
				width: 200rpx;
				font-size: 28rpx;
				color: #333;
			}

			input {
				flex: 1;
				height: 70rpx;
				border: 1px solid #ddd;
				border-radius: 8rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
				background-color: #fff;
			}
		}

		.checkbox-group {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			text {
				font-size: 28rpx;
				color: #333;
				margin-left: 10rpx;
			}
		}

		.button-group {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			margin-bottom: 20rpx;

			button {
				flex: 1;
				min-width: 200rpx;
				background-color: #007aff;
				color: #fff;
				font-size: 28rpx;
				padding: 15rpx 0;
				border-radius: 8rpx;

				&:active {
					opacity: 0.8;
				}
			}
		}

		.selector-group {
			.label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 15rpx;
				display: block;
			}

			.selector-buttons {
				display: flex;
				flex-wrap: wrap;
				gap: 15rpx;

				button {
					flex: 1;
					min-width: 150rpx;
					background-color: #4caf50;
					color: #fff;
					font-size: 26rpx;
					padding: 12rpx 0;
					border-radius: 8rpx;

					&:active {
						opacity: 0.8;
					}
				}
			}
		}
	}

	.section {
		margin-bottom: 30rpx;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			color: #333;
		}

		.section-description {
			margin-bottom: 20rpx;

			text {
				font-size: 28rpx;
				color: #666;
				line-height: 1.6;
				display: block;
			}
		}
	}

	.content {
		margin-bottom: 30rpx;

		.section {
			margin-bottom: 50rpx;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 12rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

			&:nth-child(1) {
				background-color: #e3f2fd;
			}

			&:nth-child(2) {
				background-color: #e8f5e9;
			}

			&:nth-child(3) {
				background-color: #fff3e0;
			}

			&:nth-child(4) {
				background-color: #f3e5f5;
			}

			.section-title {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
				color: #333;
			}

			.section-content {
				text {
					font-size: 28rpx;
					color: #666;
					line-height: 1.6;
					display: block;
					margin-bottom: 10rpx;
				}
			}
		}
	}

	.tips {
		background-color: #f8f9fa;
		padding: 20rpx;
		border-radius: 12rpx;
		margin-bottom: 30rpx;

		.tips-title {
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 15rpx;
		}

		.tips-item {
			margin-bottom: 15rpx;

			.param-name {
				font-size: 26rpx;
				font-weight: bold;
				color: #007aff;
				margin-right: 10rpx;
			}

			.param-desc {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	// 新增ScrollViewContext增强ScrollView样式
	.scroll-enhanced-demo {
		margin-bottom: 20rpx;

		.enhanced-scroll-view {
			height: 300rpx;
			background-color: #f8f9fa;
			border-radius: 8rpx;
			border: 1px solid #eee;

			.scroll-item {
				padding: 20rpx;
				border-bottom: 1px solid #eee;
				display: flex;
				flex-direction: column;

				text {
					font-size: 28rpx;
					color: #333;
				}

				.item-description {
					font-size: 24rpx;
					color: #999;
					margin-top: 5rpx;
				}
			}
		}
	}

	.scroll-controls {
		.scroll-control-section {
			margin-bottom: 20rpx;

			.control-title {
				font-size: 28rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
			}

			.control-buttons {
				display: flex;
				gap: 10rpx;

				.control-btn {
					flex: 1;
					background-color: #42b983;
					color: #fff;
					font-size: 26rpx;
					padding: 10rpx 0;
					border-radius: 6rpx;

					&:active {
						opacity: 0.8;
					}
				}
			}

			.control-props {
				display: flex;
				flex-wrap: wrap;
				gap: 20rpx;

				.prop-item {
					display: flex;
					align-items: center;
					min-width: 45%;

					text {
						font-size: 26rpx;
						color: #333;
						margin-left: 10rpx;
					}
				}
			}

			.scroll-status {
				background-color: #f0f0f0;
				padding: 15rpx;
				border-radius: 8rpx;

				.status-item {
					display: flex;
					margin-bottom: 10rpx;

					.status-label {
						width: 120rpx;
						font-size: 26rpx;
						color: #666;
					}

					.status-value {
						flex: 1;
						font-size: 26rpx;
						color: #333;
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
