<!-- z-paging聊天item -->

<template>
	<view class="chat-item">
		<view :class="{'chat-container':true,'chat-location-me':item.type==1}">
			<view class="chat-icon-container">
				<image class="chat-icon" :src="item.icon" mode="aspectFill" />
			</view>
			<view class="chat-content-container">
				<view class="chat-text-container-super" :style="[{justifyContent:item.type==1?'flex-end':'flex-start'}]">
					<view :class="{'chat-text-container':true,'chat-text-container-me':item.type==1}">
						<view class="bubble">
							<view :class="{'chat-text':true,'chat-text-me':item.type==1}">
								<view v-if="item.content">
									<!--<view v-html="item.content"></view>-->
									<!--<rich-text space="nbsp" :nodes="item.content"></rich-text>-->
									<text space="nbsp" user-select="true">{{item.content}}
										<text v-if="item.type==0 && !item.end" class="cursor">|</text>
									</text>
								</view>
								<view v-else><u-loading></u-loading></view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chat-item",
		props: {
			item: {
				type: Object,
				default: function() {
					return {
						time: '',
						icon: '',
						name: '',
						content: '',
						isMe: false
					}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 预览图片
			showPic(msg){
				let imagesUrl = [msg.data.url];
				uni.previewImage({
					urls:imagesUrl
				});
			},
			downloadFile(data)
			{
				// #ifdef H5
					window.open(data.data.url,'_blank');
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.chat-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	.chat-time {
		padding: 4rpx 0rpx;
		text-align: center;
		font-size: 22rpx;
		color: #aaaaaa;
	}
	.chat-container {
		display: flex;
		flex-direction: row;
	}
	.chat-location-me {
		flex-direction: row-reverse;
		text-align: right;
	}
	.chat-icon-container {
		margin-top: 12rpx;
	}
	.chat-icon{
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		background-color: #eeeeee;
	}
	.chat-content-container {
		width: 100%;
		margin: 0rpx 15rpx;
	}
	.chat-user-name{
		font-size: 26rpx;
		color: #888888;
	}
	.chat-text-container {
		text-align: left;
		background-color: #ffffff;
		border-radius: 16rpx;
		padding: 16rpx 30rpx;
		margin-top: 10rpx;
		max-width: calc(100% - 58rpx);

	}
	.chat-text-container-me {
		background-color: #007AFF;
	}
	.chat-text-container-super {
		display: flex;
		flex-direction: row;
		width: auto;
	}
	.chat-text {
		font-size: 28rpx;
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
		/* #ifdef APP-NVUE */
		max-width: 500rpx;
		/* #endif */
	}
	.chat-text-me {
		color: white;
	}
	.img{
		/* #ifndef APP-NVUE */
		max-width: 500rpx;
		/* #endif */
	}
	.bubble{
		width: 100%;
		.iconfont {
			font-size:42rpx;
			margin-right: 8rpx;
		}
	}
	.chat-text-container{
		.bubble{
			color: #333;
			.iconfont {
				color:#333;
			}
		}
	}
	.chat-text-container-me{
		.bubble{
			color:#FFFFFF;
			.iconfont {
				color:#FFFFFF;
			}
		}
	}
	.cursor {
		margin-right: 5px;
		animation: blink 0.7s step-end infinite;
		font-size: 16px;
		display: inline-block;
	}

	@keyframes blink {
		from, to { opacity: 0; }
		50% { opacity: 1; }
	}
</style>