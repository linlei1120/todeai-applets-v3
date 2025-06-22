<template>
	<view class="activity">
		<button v-for="item in list" @click="shareToChat(item.id)">{{item.label}}</button>
		<view>最多可选人数:<uv-input type="text" v-model="maxSelectCount"></uv-input></view>
		<open-data-list type="groupMembers" members="{{members}}">
			<view class="userinfo" slot:index>
				<open-data-item class="avatar" type="userAvatar" index="{{index}}" />
				<open-data-item class="name" type="userNickName" index="{{index}}" />
			</view>
		</open-data-list>
		<form bind:submitToGroup="onSubmitToGroup">
			<label for="">发送文本:</label>
			<textarea v-model="shareText" />
			<button form-type="submitToGroup" need-show-entrance="{{true}}">发送</button>
		</form>
		<button @click="back">退出</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const maxSelectCount = ref(2);
	const members = ref([]);
	const list = ref([{
			label: "转发图片到聊天",
			id: 1,
		}, {
			label: "转发视频到聊天",
			id: 2,
		}, {
			label: "转发文件到聊天",
			id: 3,
		}, {
			label: "转发表情到聊天",
			id: 4,
		}, {
			label: "转发小程序卡片到聊天",
			id: 5,
		},
		{
			label: "选择聊天室成员",
			id: 6,
		},
		{
			label: "提醒用户完成任务",
			id: 7,
		},
	])
	const shareText = ref("");
	// 聊天工具相关API
	const shareToChat = (id) => {
		switch (id) {
			case 1:
				wx.downloadFile({
					url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
					success: (res) => {
						console.log(res);
						wx.shareImageToGroup({
							imagePath: res.tempFilePath,
							success(res2) {
								console.log('success', res2);
							},
							fail: (err2) => {
								console.log('fail', err2);
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
				break;
			case 2:
				wx.downloadFile({
					url: "https://videos.pexels.com/video-files/32049182/13661811_1080_1920_30fps.mp4",
					success(res) {
						console.log(res);
						// 下载完成后转发
						wx.shareVideoToGroup({
							videoPath: res.tempFilePath,
							success(res2) {
								console.log('success', res2);
							},
							fail: (err2) => {
								console.log('fail', err2);
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
				break;
			case 3:
				wx.downloadFile({
					url: "https://qdai.jinbang.minio.api.pyxshuzi.com/volunteer-prod/font/lottery_font.ttf", // 下载url
					success(res) {
						console.log(res);
						// 下载完成后转发
						wx.shareFileToGroup({
							filePath: res.tempFilePath,
							success(res2) {
								console.log('success', res2);
							},
							fail: (err2) => {
								console.log('fail', err2);
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
				break;
			case 4:
				wx.downloadFile({
					url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
					success: (res) => {
						console.log(res);
						wx.shareEmojiToGroup({
							imagePath: res.tempFilePath,
							success(res2) {
								console.log('success', res2);
							},
							fail: (err2) => {
								console.log('fail', err2);
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
				break;
			case 5:
				wx.shareAppMessageToGroup({
					title: '转发小程序卡片到聊天',
					imageUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err);
					}
				})
				break;
			case 6:
				wx.selectGroupMembers({
					maxSelectCount: maxSelectCount.value,
					success: (res) => {
						console.log(res)
						members.value = res.members;
					},
					fail: (err) => {
						console.log(err);
					}
				})
				break;
			case 7:
				wx.notifyGroupMembers({
					title: '提醒用户完成任务',
					members: members.value,
					entrancePath: '/packageA/pages/cases/chat',
					type: 'complete', //participate-请参与 complet-请完成
				})
				break;
		}
	}
	// 进入聊天工具前获取聊天室ID
	const getGroupEnterInfo = () => {
		wx.getGroupEnterInfo({
			success: (res) => {
				wx.openChatTool({
					url: "/packageA/pages/cases/chat",
					roomid: res.openId
				})
			},
			fail: (err) => {
				console.log(err)
			}
		})
	};
	// 获取聊天工具模式下的群聊信息。
	const getChatToolInfo = () => {
		wx.getChatToolInfo({
			success(res) {
				console.log(res);
			},
			fail(err) {
				console.log(err);
			}
		})
	}
	// 判断是否在聊天工具模式
	const getApiCateGory = () => {
		console.log('当前模式：', wx.getApiCategory());
		return wx.getApiCategory() === 'chatTool'
	}
	//退出当前模式
	const back = () => {
		wx.reLaunch({
			url: "/pages/cases/chat"
		})
	}

	onLoad(() => {
		// 判断是否在聊天工具模式
		if (!getApiCateGory()) {
			getGroupEnterInfo();
		} else {
			getChatToolInfo();
		}
	})
</script>

<style style="scss" scoped>
	.userinfo {
		width: 100%;

		.avatar {
			height: 100rpx;
			width: 100rpx;
		}

		.name {
			width: 100rpx;
		}
	}
</style>