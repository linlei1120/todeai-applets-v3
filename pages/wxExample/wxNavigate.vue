<template>
	<view class="container">
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.navigateTo" name="Docs guide">
				<view>保留当前页面，跳转到应用内的某个页面。</view>
				<view>注意：小程序中页面栈最多十层。</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navNavigateTo" type="success" text="页面跳转"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.navigateBack" name="Docs guide">
				<view></view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navNavigateBack" type="success" text="页面返回"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.switchTab" name="Docs guide">
				<view>
					<p>跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面；</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navSwitchTab" type="success" text="tabBar页面跳转"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showShareMenu" name="Docs guide">
				<view>
					特点：
					<p>关闭所有页面，打开到应用内的某个页面</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navReLaunch" type="success" text="路由重置跳转"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.hideShareMenu" name="Docs guide">
				<view>
					<p>关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="navRedirectTo" type="success" text="关闭当前页跳转"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.rewriteRoute" name="Docs guide">
				<view>重写正在进行中的路由事件，与redirectTo()效果相似但实现原理不同，前者不会渲染原页面，后者会先按顺序渲染原页面再进行重置</view>
				<view>
					应用场景：
					<p>①页面未找到的情况下，回到小程序主页或自定义页面</p>
					<p>②将失效页面重写引导到新页面（如活动物料失效，重写跳转到新活动）</p>
					<p>③用户身份变更后的界面重置为指定页面</p>
				</view>
				<view>注意：基础库 3.8.0 起</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button icon="star-fill" @tap="navRewriteRoute" type="success" text="路由重写"></uv-button>

		<view>自定义路由：wx.router</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad,
		onUnload,
		onShareAppMessage,
		onShareTimeline
	} from "@dcloudio/uni-app";

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

	onLoad((option) => {
		console.log("option", option);
	});
	onUnload(() => {});
	const navSwitchTab = () => {
		wx.switchTab({
			url: "/pages/mine/index",
			success() {
				uni.showToast({
					title: "tabbar跳转成功"
				});
			}
		});
	};
	const navReLaunch = () => {
		wx.reLaunch({
			url: "/pages/wxExample/wxShare?id=1"
		});
	};
	const navRedirectTo = () => {
		wx.redirectTo({
			url: "/pages/wxExample/wxShare?id=1"
		});
	};
	const navNavigateTo = () => {
		wx.navigateTo({
			url: "/pages/wxExample/wxShare?id=1"
		});
	};
	const navNavigateBack = () => {
		wx.navigateBack({
			// url: 'C?id=1'
			delta: 2
		});
	};
	const navRewriteRoute = () => {};
	/**
	 * @desc 转发动态消息到微信联调中
	 */
	const shareDynamicMessage = () => {
		// 模拟动态消息的活动ID，实际应用中需要从服务端获取
		const activityId = "1327_bkU7UKry/nvzrLxXY2SMZnrnwBBAK2JHBK7c0_CplGvRFKQ05MhzyxwRK4vbYqRtETjIvUoZ8UW_z7Zy";

		wx.updateShareMenu({
			// 支持转发动态消息
			isUpdatableMessage: true,
			// 动态消息ID，需要根据服务端接口获取
			activityId: activityId,
			// 注意：只有转发到群聊中打开才可以获取到 shareTicket 返回值
			withShareTicket: true,
			// 动态消息模板信息
			templateInfo: {
				parameterList: [{
						name: "member_count",
						value: "1"
					},
					{
						name: "room_limit",
						value: "10"
					},
					{
						name: "path",
						value: "pages/wxExample/share"
					},
					{
						name: "version_type",
						value: "develop"
					}
				]
			},
			success: (res) => {
				console.log("动态消息设置成功:", res);
				uni.showToast({
					title: "动态消息设置成功",
					icon: "success"
				});
			},
			fail: (err) => {
				console.error("动态消息设置失败:", err);
				uni.showToast({
					title: "动态消息设置失败",
					icon: "none"
				});
			}
		});
	};
	/**
	 * @desc 私密消息验证
	 * */
	const authPrivate = () => {
		wx.authPrivateMessage({
			shareTicket: "xxxxxx",
			success(res) {
				console.log("authPrivateMessage success", res);
				// res
				// {
				//   errMsg: 'authPrivateMessage:ok'
				//   valid: true
				//   iv: 'xxxx',
				//   encryptedData: 'xxxxxx'
				// }s
			},
			fail(res) {
				console.log("authPrivateMessage fail", res);
			}
		});
	};
	/**
	 * @desc 更新动态消息内容（模拟服务端更新）
	 */
	const updateDynamicMessage = () => {
		// 这个功能需要配合服务端接口使用
		// 实际应用中需要调用服务端接口来更新动态消息内容
		uni.showModal({
			title: "提示",
			content: "动态消息内容更新需要配合服务端接口实现，当前为演示模式",
			showCancel: false,
			confirmText: "了解"
		});
		console.log("更新动态消息内容（需要服务端支持）");
	};

	/**
	 * @desc 更新转发属性
	 */
	const setUpdateShare = () => {
		wx.updateShareMenu({
			// 属性1：注意：只有转发到群聊转发或私密消息中打开才可以获取到 shareTicket 返回值，单聊没有 shareTicket。
			withShareTicket: true,
			// 属性2：支持转发动态消息。动态消息对比普通消息：
			// ①、消息发出去之后，开发者可以通过后台接口修改部分消息内容。
			// ②、消息有对应的提醒按钮，用户点击提醒按钮可以订阅提醒，开发者可以通过后台修改消息状态并推送一次提醒消息给订阅了提醒的用户
			// ③、设置该属性后群内消息不可转发
			isUpdatableMessage: true,
			// 属性3：动态消息ID；需要根据服务端接口获取
			activityId: "1327_bkU7UKry/nvzrLxXY2SMZnrnwBBAK2JHBK7c0_CplGvRFKQ05MhzyxwRK4vbYqRtETjIvUoZ8UW_z7Zy",
			// 属性4：群待办消息的ID：需要根据服务端接口获取
			templateInfo: {
				parameterList: [{
						name: "member_count",
						value: "1"
					},
					{
						name: "room_limit",
						value: "3"
					}
				],
				templateId: "21B034D08C5615B9889CE362BB957B1EE69A584B" //应用于组队场景
			},
			success: () => {
				uni.showToast({
					title: "设置动态消息成功"
				});
			}
		});
	};
	/**
	 * @desc 设置胶囊分享按钮是否可用
	 */
	const shareMenuShow = () => {
		uni.showShareMenu({
			title: "TodeAI测试的分享",
			content: "TodeAI测试的分享内容",
			imageUrl: "",
			path: "",
			success: (res) => {
				uni.showToast({
					title: "设置成功"
				});
			}
		});
		s;
		// 微信官方API无法进行转发内容设置
		// wx.showShareMenu({
		// 	// 属性1：注意：只有转发到群聊中打开才可以获取到 shareTicket 返回值，单聊没有 shareTicket。转发私密消息时，群聊和单聊都可获取到 shareTicket
		// 	withShareTicket: true,
		// 	menus: ["shareAppMessage", "shareTimeline"],
		// 	success: () => {
		// 		uni.showToast({
		// 			title: "设置成功"
		// 		});
		// 	}
		// });
	};
	const shareMenuHide = () => {
		wx.hideShareMenu({
			menus: ["shareAppMessage", "shareTimeline"],
			success: () => {
				uni.showToast({
					title: "设置隐藏成功"
				});
			}
		});
	};
	/**
	 * @desc 转发分享图片消息
	 */
	const shareImage = () => {
		wx.downloadFile({
			url: "https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg",
			success: (res) => {
				wx.showShareImageMenu({
					path: res.tempFilePath
				});
			}
		});
	};
	/**
	 * @desc 视频转发分享
	 */
	const shareVoide = async () => {
		// callback 写法
		wx.downloadFile({
			url: "https://cdn.coverr.co/videos/coverr-temp-da2xinteriorboothat202505231700-mp4-4615/720p.mp4", // 下载url
			success(res) {
				console.log(res);
				// 下载完成后转发
				wx.shareVideoMessage({
					videoPath: res.tempFilePath,
					success() {},
					fail: console.error
				});
			},
			fail: console.error
		});
		// async await 写法
		// const res = await wx.downloadFile({
		// 	url: "https://cdn.coverr.co/videos/coverr-temp-da2xinteriorboothat202505231700-mp4-4615/720p.mp4" // 下载url
		// });
		// console.log(res);
		// // 下载完成后转发
		// await wx.shareVideoMessage({
		// 	videoPath: tempFilePath
		// });
	};
	/**
	 * @desc 文件转发分享
	 */
	const shareFlies = async () => {
		// callback 写法
		wx.downloadFile({
			url: "https://qdai.jinbang.minio.pyxshuzi.com/volunteer-prod/upload/excel/1748426870318.xlsx", // 下载url
			success(res) {
				console.log("shareFlies", res);
				// 下载完成后转发
				wx.shareFileMessage({
					filePath: res.tempFilePath,
					success() {},
					fail: console.error
				});
			},
			fail: console.error
		});

		// async await 写法
		// const { tempFilePath } = await wx.downloadFile({
		// 	url: URL // 下载url
		// });
		// // 下载完成后转发
		// await wx.shareFileMessage({
		// 	filePath: res.tempFilePath
		// });
	};
	/**
	 * @desc 复制链接操作监听:需要在页面加载时进行注册
	 */
	const copyUrl = () => {
		wx.onCopyUrl(() => {
			console.log("点击复制链接触发");
			//在进入页面时调用 wx.onCopyUrl 自定义 query，退出页面时调用 wx.offCopyUrl，防止影响其它页面
			return {
				query: "a=1&b=2"
			};
		});
	};
	/**
	 * @desc 复制链接监听关闭
	 */
	const copyOff = () => {
		wx.offCopyUrl();
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 30rpx;
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
			margin-bottom: 30rpx;

			.uv-button {
				flex: 1;
			}
		}

		.tips {
			background: rgba(255, 255, 255, 0.1);
			border-radius: 15rpx;
			padding: 25rpx;
			border: 1px solid rgba(255, 255, 255, 0.2);

			.tip-text {
				display: block;
				font-size: 28rpx;
				font-weight: bold;
				color: #ffffff;
				margin-bottom: 15rpx;
			}

			.tip-item {
				display: block;
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.9);
				line-height: 1.6;
				margin-bottom: 8rpx;
				padding-left: 10rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>