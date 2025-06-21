<template>
	<view class="content">
		<!-- <image class="logo" src="@/static/logo.png"></image> -->
		<view class="text-area" v-if="false">
			<view class="menu">
				<view class="menu-card" v-for="(item, index) in menuList" :key="index" @tap="navPages(item)">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from "vue";
	const menuList = ref([{
			id: 0,
			title: "设备接口",
			path: "/pages/wxExample/device"
		},
		{
			id: 7,
			title: "加载动画",
			path: "/pages/cases/animateLoading"
		},
		{
			id: 1,
			title: "百度语音识别",
			path: "/pages/cases/detectShake"
		},
		{
			id: 2,
			title: "海报生成",
			path: "/pages/cases/detectShake"
		},
		{
			id: 3,
			title: "设备晃动监听",
			path: "/pages/cases/detectShake"
		},
		{
			id: 4,
			title: "上传模块",
			path: "/pages/cases/detectShake"
		},
		{
			id: 5,
			title: "虚拟列表",
			path: "/pages/cases/detectShake"
		},
		{
			id: 6,
			title: "设备晃动监听",
			path: "/pages/cases/detectShake"
		},
		{
			id: 7,
			title: "设备晃动监听",
			path: "/pages/cases/detectShake"
		}
	]);
	const navPages = (params) => {
		uni.navigateTo({
			url: params.path
		});
	};
</script>
<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;
	}

	s .menu {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.menu-card {
		width: 200rpx;
		height: 200rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		/* 圆角效果 */
		text-align: center;
		line-height: 200rpx;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		/* 阴影效果 */
		box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.08),
			/* 主阴影 */
			0 2rpx 4rpx rgba(0, 0, 0, 0.04);
		/* 辅助阴影 */

		/* 可选：添加过渡动画 */
		transition: all 0.3s ease;
		margin: 20rpx 0;
	}

	/* 悬停效果增强（可选） */
	.menu-card:hover {
		box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.12), 0 4rpx 8rpx rgba(0, 0, 0, 0.06);
		transform: translateY(-4rpx);
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>