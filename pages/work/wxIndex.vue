<template>
	<view class="container">
		<view class="tool_list">
			<view class="group_tool_wrap" v-for="item in list" :key="item.id" @click="handleJump(item)">
				<view class="tool_wrap">
					<view class="tool_info">
						<view class="tool_name">{{ item.title }}</view>
						<view class="tool_hint">{{ item.des }}</view>
					</view>
					<image v-if="item.img" class="img" :src="item.img" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script setup>
import { ref, reactive } from "vue";
const list = reactive([
	{
		id: 1,

		title: "设备API",
		des: "解你困惑，知你烦恼",
		img: "/static/img/nav/bill-sel.png",
		path: "/pages/wxExample/device",
		type: "URL"
	},
	{
		id: 2,
		title: "路由导航API",
		des: "解你困惑，知你烦恼",
		img: "/static/img/nav/logo.png",
		path: "/pages/wxExample/wxNavigate",

		type: "URL"
	},
	{
		id: 3,
		title: "跳转API",
		des: "解你困惑，知你烦恼",
		img: "/static/img/nav/logo.png",
		path: "/pages/cases/navigateModule",

		type: "URL"
	},
	{
		id: 4,
		title: "聊天工具API",
		des: "解你困惑，知你烦恼",
		img: "/static/img/nav/logo.png",
		path: "/pages/cases/chat",

		type: "URL"
	},
	{
		id: 5,
		title: "转发分享API",
		des: "解你困惑，知你烦恼",
		img: "/static/img/nav/bill-sel.png",
		path: "/pages/wxExample/wxShare",
		type: "URL"
	},
	{
		id: 6,
		title: "界面相关API",
		des: "解你困惑，知你烦恼",
		img: "/static/img/nav/bill-sel.png",
		path: "/pages/wxExample/wxInterface/list",
		type: "URL"
	}
	// {
	// 	id: 6,
	// 	title: "跳转相关API",
	// 	des: "解你困惑，知你烦恼",
	// 	img: "/static/img/nav/bill-sel.png",
	// 	path: "/pages/cases/navigateModule",
	// 	type: "URL"
	// },
	// {
	// 	id: 7,
	// 	title: "聊天工具API",
	// 	des: "解你困惑，知你烦恼",
	// 	img: "/static/img/nav/bill-sel.png",
	// 	path: "/pages/cases/chat",
	// 	type: "URL"
	// }

]);
const handleJump = (item) => {
	console.log(item.path);
	switch (item.type) {
		case "URL":
			uni.navigateTo({
				url: item.path
			});
			break;
		case "WEAPP":
			uni.navigateToMiniProgram({
				appId: item.appid,
				path: item.path
			});
			break;
		case "WEBVIEW":
			uni.navigateTo({
				url: "/pages/main/webview/webview?url=" + encodeURIComponent(item.path)
			});
			break;
	}
};

// const globalData = getApp().globalData;
// export default {
// 	components: {},
// 	data() {
// 		return {
// 			userInfo: null,
// 			list: [
// 				{
// 					id: 1,
// 					title: "ai问答",
// 					des: "解你困惑，知你烦恼",
// 					img: "/static/img/nav/bill-sel.png",
// 					path: "/pages/index/aiChat",
// 					type: "URL"
// 				},
// 				{
// 					id: 2,
// 					title: "ai抽签",
// 					des: "解你困惑，知你烦恼",
// 					img: "/static/img/nav/bill-sel.png",
// 					path: "/pages/cases/appletsSway",
// 					type: "URL"
// 				},
// 				{
// 					id: 3,
// 					title: "陀螺仪",
// 					des: "解你困惑，知你烦恼",
// 					img: "/static/img/nav/bill-sel.png",
// 					path: "/pages/cases/gyroscope",
// 					type: "URL"
// 				},
// 				{
// 					id: 4,
// 					title: "自定义字体",
// 					des: "解你困惑，知你烦恼",
// 					img: "/static/img/nav/bill-sel.png",
// 					path: "/pages/cases/fontCustom",
// 					type: "URL"
// 				},
// 				{
// 					id: 5,
// 					title: "小程序转发",
// 					des: "解你困惑，知你烦恼",
// 					img: "/static/img/nav/bill-sel.png",
// 					path: "/pages/cases/shareMoudel",
// 					type: "URL"
// 				}
// 			]
// 		};
// 	},
// 	onLoad() {
// 		this.userInfo = this.getLoginUserInfo();
// 	},
// 	onShareAppMessage: function () {
// 		let uid = this.userInfo ? this.userInfo.uid : 0;
// 		return {
// 			title: "我正在使用" + globalData.appName + ",ai问答,ai绘画...它帮我解决了日常生活中的很多问题,你也快来试试吧~",
// 			imageUrl: "/static/logo.png",
// 			path: "/pages/index/index?pid=" + uid
// 		};
// 	},
// 	onShareTimeline: function () {
// 		let uid = this.userInfo ? this.userInfo.uid : 0;
// 		return {
// 			title: "我正在使用" + globalData.appName + ",ai问答,ai绘画...它帮我解决了日常生活中的很多问题,你也快来试试吧~",
// 			imageUrl: "/static/logo.png",
// 			path: "/pages/index/index?pid=" + uid
// 		};
// 	},
// 	methods: {
// 		handleJump(item) {
// 			switch (item.type) {
// 				case "URL":
// 					uni.navigateTo({
// 						url: item.path + "?id=" + item.id + "&price=" + item.price + "&title=" + item.title
// 					});
// 					break;
// 				case "WEAPP":
// 					uni.navigateToMiniProgram({
// 						appId: item.appid,
// 						path: item.path
// 					});
// 					break;
// 				case "WEBVIEW":
// 					uni.navigateTo({
// 						url: "/pages/main/webview/webview?url=" + encodeURIComponent(item.path)
// 					});
// 					break;
// 			}
// 		}
// 	}
// };
</script>

<style lang="scss" scoped>
page {
	background-color: #f3f3f3;
	box-sizing: border-box;
	letter-spacing: 0;
	word-wrap: break-word;
}

.form {
	background-color: #fff;
	border-bottom-left-radius: 30rpx;
	border-bottom-right-radius: 30rpx;
	padding: calc(var(--status-bar-height) + 80rpx) 32rpx 32rpx;

	._header {
		display: flex;
		align-items: center;

		._image {
			width: 96rpx;
			margin-right: 24rpx;
		}

		._title {
			font-weight: bold;
		}
	}

	._des {
		font-size: 24rpx;
		color: #999;
	}
}

.tool_list {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 20rpx;
	align-items: stretch;

	.group_tool_wrap {
		height: 188rpx;
		width: 49%;
		border-radius: 10rpx;
		background-color: #fff;
		box-shadow: 2px 2px 5px #f8f8f8;
		margin-top: 20rpx;
		position: relative;

		.tool_wrap {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			padding: 30rpx;

			.tool_info {
				flex: 1;

				.tool_name {
					font-size: 28rpx;
					font-weight: 600;
					color: #333;
				}

				.tool_hint {
					margin-top: 15rpx;
					font-size: 18rpx;
					font-weight: 500;
					color: #999;
				}
			}

			.img {
				width: 60rpx;
			}
		}
	}
}
</style>
