<!-- z-paging聊天输入框 -->

<template>
	<view class="chat-input-bar-container">
		<view class="chat-input-bar">
			<view class="avatar-item" @click="handleOpen">
				<image class="avatar" src="/static/avatar.png"></image>
			</view>
			<view class="chat-input-container">
				<!-- :adjust-position="false"必须设置，防止键盘弹窗自动上顶，交由z-paging内部处理 -->
				<input :focus="focus" class="chat-input" v-model="msg" :adjust-position="false" confirm-type="send" type="text" placeholder="请输入内容" @confirm="sendClick" />
			</view>
			<!-- 表情图标（如果不需要切换表情面板则不用写） -->
			<view class="chat-input-send" :class="sendState?'chat-input-send-disabled':''" @click="sendClick">
				<text class="chat-input-send-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chat-input-bar",
		props: {
			sendState: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				msg: '',
				
				// 当前input focus（如果不需要切换表情面板则不用写）
				focus: false,
				// 当前表情/键盘点击后的切换类型，为空字符串代表展示表情logo但是不展示不展示表情面板（如果不需要切换表情面板则不用写）
				emojiType: '',
			};
		},
		methods: {
			// 点击了发送按钮
			sendClick() {
				if(this.sendState) return false;
				if (!this.msg.length) return false;
				this.$emit('send', this.msg);
			},
			setMsg(msg){
				this.msg = msg;
			},
			handleOpen(){
				this.$emit('handleOpen');
			},
			// 更新了键盘高度（如果不需要切换表情面板则不用写）
			updateKeyboardHeightChange(res) {
				
			},
			// 用户尝试隐藏键盘，此时如果表情面板在展示中，应当隐藏表情面板，如果是键盘在展示中不用处理，z-paging内部已经处理（如果不需要切换表情面板则不用写）
			hidedKeyboard() {
				
			},
		}
	}
</script>

<style scoped>
	.chat-input-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-top: solid 1px #f5f5f5;
		background-color: #f8f8f8;
		
		padding: 10rpx 20rpx;
	}
	.chat-input-container {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 15rpx;
		background-color: white;
		border-radius: 10rpx;
	}
	.chat-input {
		flex: 1;
		font-size: 28rpx;
	}
	.avatar{
		width: 54rpx;
		height: 54rpx;
		border-radius: 54rpx;
		margin-right: 16rpx;
	}

	.chat-input-send {
		background-color: #007AFF;
		margin: 10rpx 10rpx 10rpx 20rpx;
		border-radius: 10rpx;
		width: 110rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
	.chat-input-send-text {
		color: white;
		font-size: 26rpx;
	}
	.chat-input-send-disabled{
		background-color: #656262;
		opacity: 0.4;
	}
</style>