<template>
	<view class="container">
		<view class="counter-section">
			<text class="label">计数器：</text>
			<text class="count">{{ count }}</text>
			<button @click="incrementCounter">增加计数</button>
		</view>

		<view class="list-section">
			<text class="label">列表项：</text>
			<view class="list">
				<view v-for="(item, index) in list" :key="index" class="list-item">
					{{ item }}
				</view>
			</view>
			<button @click="addListItem">添加列表项</button>
		</view>

		<view class="log-section">
			<text class="label">操作日志：</text>
			<scroll-view class="log-content" scroll-y>
				<view v-for="(log, index) in logs" :key="index" class="log-item">
					{{ log }}
				</view>
			</scroll-view>
		</view>

		<view class="tips">
			<text class="tips-title">wx.nextTick 说明：</text>
			<text class="tips-item">1. 在下一个时间片执行回调函数</text>
			<text class="tips-item">2. 用于等待视图更新后执行操作</text>
			<text class="tips-item">3. 常用于需要获取更新后的DOM信息</text>
			<text class="tips-item">4. 可以确保数据更新后的操作顺序</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";

// 计数器
const count = ref(0);
// 列表数据
const list = ref(["初始项目"]);
// 日志记录
const logs = ref(["页面加载完成"]);

// 增加计数
const incrementCounter = () => {
	// 记录当前计数
	const oldCount = count.value;

	// 更新计数
	count.value++;

	// 使用 nextTick 等待视图更新后执行
	wx.nextTick(() => {
		// 添加日志
		logs.value.push(`计数从 ${oldCount} 更新到 ${count.value}`);

		// 获取更新后的DOM信息（这里仅作示例）
		console.log("计数更新后执行：", count.value);
	});
};

// 添加列表项
const addListItem = () => {
	// 添加新项目
	const newItem = `项目 ${list.value.length + 1}`;
	list.value.push(newItem);

	// 使用 nextTick 等待列表更新后执行
	wx.nextTick(() => {
		// 添加日志
		logs.value.push(`添加新列表项：${newItem}`);

		// 这里可以执行一些需要等待列表更新完成后的操作
		// 例如：滚动到新添加的项目、获取列表高度等
		console.log("列表更新后执行：", list.value.length);
	});
};

// 页面加载完成后的处理
wx.nextTick(() => {
	logs.value.push("页面首次渲染完成");
});
</script>

<style lang="scss" scoped>
.container {
	padding: 20px;

	.counter-section,
	.list-section,
	.log-section {
		margin-bottom: 30rpx;

		.label {
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			display: block;
		}
	}

	.counter-section {
		.count {
			font-size: 40rpx;
			color: #007aff;
			margin-right: 20rpx;
		}
	}

	.list-section {
		.list {
			background-color: #f8f9fa;
			padding: 20rpx;
			border-radius: 8rpx;
			margin-bottom: 20rpx;

			.list-item {
				padding: 10rpx;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;

				&:last-child {
					border-bottom: none;
				}
			}
		}
	}

	.log-section {
		.log-content {
			height: 300rpx;
			background-color: #f8f9fa;
			padding: 20rpx;
			border-radius: 8rpx;

			.log-item {
				font-size: 24rpx;
				color: #606266;
				margin-bottom: 10rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}

	button {
		background-color: #007aff;
		color: #fff;
		border: none;
		padding: 20rpx;
		border-radius: 8rpx;
		margin: 20rpx 0;

		&:active {
			background-color: #0056b3;
		}
	}

	.tips {
		background-color: #f8f9fa;
		padding: 20rpx;
		border-radius: 8rpx;
		margin-top: 30rpx;

		.tips-title {
			font-size: 28rpx;
			font-weight: bold;
			color: #303133;
			margin-bottom: 10rpx;
			display: block;
		}

		.tips-item {
			font-size: 24rpx;
			color: #606266;
			margin-bottom: 10rpx;
			display: block;
			line-height: 1.5;
		}
	}
}
</style>
