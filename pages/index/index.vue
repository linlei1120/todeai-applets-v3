<template>
	<view class="container">
		<view class="tool_list">
			<view class="group_tool_wrap" v-for="item in list" :key="item.id" @click="handleJump(item)">
				<view class="tool_wrap">
					<view class="tool_info">
						<view class="tool_name">{{item.title}}</view>
						<view class="tool_hint">{{item.des}}</view>
					</view>
					 <image v-if="item.img" class="img" :src="item.img" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	const globalData = getApp().globalData;
	export default {
		components: {
			
		},
		data() {
			return {
				userInfo: null,
				list: [
					{id:1,title:'ai问答',des:'解你困惑，知你烦恼',img:'/static/img/nav/bill-sel.png',path:'/pages/index/aiChat',type:'URL'}
				]
			};
		},
		async onLoad(){
			this.userInfo = this.getLoginUserInfo();

		},
		onShareAppMessage: function() {
			let uid = this.userInfo?this.userInfo.uid:0;
			return {
				title: '我正在使用'+globalData.appName+',ai问答,ai绘画...它帮我解决了日常生活中的很多问题,你也快来试试吧~',
				imageUrl: '/static/logo.png',
				path: '/pages/index/index?pid='+uid
			}
		},
		onShareTimeline: function() {
			let uid = this.userInfo?this.userInfo.uid:0;
			return {
				title: '我正在使用'+globalData.appName+',ai问答,ai绘画...它帮我解决了日常生活中的很多问题,你也快来试试吧~',
				imageUrl: '/static/logo.png',
				path: '/pages/index/index?pid='+uid
			}
		},
		methods: {
			handleJump(item) {
				switch (item.type) {
					case 'URL':
						uni.navigateTo({
							url: item.path+"?id="+item.id+"&price="+item.price+"&title="+item.title,
						})
						break
					case 'WEAPP':
						uni.navigateToMiniProgram({
							appId: item.appid,
							path: item.path,
						})
						break
					case 'WEBVIEW':
						uni.navigateTo({
							url: '/pages/main/webview/webview?url=' + encodeURIComponent(item.path)
						})
						break
				}
			}
		}
	}
</script>

<style lang="scss">
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
		padding:calc(var(--status-bar-height) + 80rpx) 32rpx 32rpx;
		._header{
			display: flex;
			align-items: center;
			._image{
				width: 96rpx;
				margin-right: 24rpx;
			}
			._title{
				font-weight: bold;
			}
		}
		._des{
			font-size:24rpx;
			color:#999;
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
				.img{
					width: 60rpx;
				}
			}
		}
	}
</style>
