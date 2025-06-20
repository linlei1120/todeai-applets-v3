<template>
	<view class="container">
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.updateShareMenu" name="Docs guide">
				<view>
					应用场景：
					<p>①设置动态消息，动态消息可再转发后动态修改内容以及设置推送提示；</p>
					<p>②设置群内消息不可转发；</p>
					<p>③根据用户状态生成动态分享卡片/控制分享权限/支持异步操作；</p>
					<p>④群聊场景中获取 ShareTicket</p>
					<p>⑤设置私密消息</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="setUpdateShare" icon="star-fill" type="success" text="更新转发属性"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showShareMenu" name="Docs guide">
				<view>
					应用场景：
					<p>①特定页面禁用分享到朋友圈；</p>
					<p>②根据用户状态生成动态分享卡片/控制分享权限/支持异步操作；</p>
					<p>③群聊场景中获取 ShareTicket</p>
				</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="shareMenuShow" type="success" text="转发分享设置"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.hideShareMenu" name="Docs guide">
				<view>
					应用场景：
					<p>①特定页面禁用分享到朋友圈；</p>
					<p>②根据用户状态生成动态分享卡片/控制分享权限/支持异步操作；</p>
					<p>③群聊场景中获取 ShareTicket</p>
				</view>
				<view>注意：暂只在 Android 平台支持</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="shareMenuHide" type="success" text="转发分享隐藏"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.showShareImageMenu" name="Docs guide">
				<view></view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="shareImage" type="success" text="图片消息分享"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.shareVideoMessage" name="Docs guide">
				<view></view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="shareVoide" type="success" text="视频消息分享"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.shareFileMessage" name="Docs guide">
				<view></view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="shareFlies" type="success" text="文件消息分享"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.onCopyUrl" name="Docs guide">
				<view>注意：暂只在 Android 平台支持</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="copyUrl" type="success" text="复制链接监听"></uv-button>
		<uv-collapse @change="change" @close="close" @open="open">
			<uv-collapse-item title="API接口： wx.offCopyUrl" name="Docs guide">
				<view>注意：暂只在 Android 平台支持</view>
			</uv-collapse-item>
		</uv-collapse>
		<uv-button @tap="offCopy" type="success" text="复制链接监听关闭"></uv-button>
		<uv-line margin="30" color="#2979ff"></uv-line>

		<!-- <button :dataset="{ id: 999 }" open-type="share">自定义分享按钮</button> -->
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
onLoad((option) => {
	copyUrl(); //进入页面时调用 wx.onCopyUrl 自定义 query
	console.log("option", option);
	// 可以在页面自定义转发配置完成时再隐藏功能，配置信息不会重置
	// shareMenuHide();
});
onUnload(() => {
	copyOff(); //退出页面时调用 wx.offCopyUrl，防止影响其它页面
});
/**
 * @desc Page页面级配置：自定义转发分享内容到会话
 **/
// onShareAppMessage((res) => {
// 	if (res.from === "button") {
// 		// 来自页面内分享按钮
// 		console.log(res.target);
// 	}
// 	return {
// 		title: "自定义分享标题",
// 		path: "/pages/test/test?id=123",
// 		imageUrl:
// 			"https://qdai.jinbang.minio.api.pyxshuzi.com/volunteer-prod/2025/05/26/6e6c08ae-c22f-4223-998d-333b90bf56d6_20250526181634A050_/PIx3oQ6lhH2Gf38f307c9e2ed9dd586a762291f63107.png"
// 	};
// });
/**
 * @desc Page页面级配置：自定义转发分享内容到朋友圈
 **/
// onShareTimeline((res) => {
// 	if (res.from === "button") {
// 		// 来自页面内分享按钮
// 		console.log(res.target);
// 	}
// 	return {
// 		title: "自定义分享标题",
// 		path: "/pages/test/test?id=123",
// 		imageUrl:
// 			"https://qdai.jinbang.minio.api.pyxshuzi.com/volunteer-prod/2025/05/26/6e6c08ae-c22f-4223-998d-333b90bf56d6_20250526181634A050_/PIx3oQ6lhH2Gf38f307c9e2ed9dd586a762291f63107.png"
// 	};
// });
/**
 * @desc 更新转发属性
 */
const setUpdateShare = () => {
	wx.shareAppMessageToGroup({
		title: "自定义分享标题",
		path: "/pages/index",
		imageUrl:
			"https://qdai.jinbang.minio.api.pyxshuzi.com/volunteer-prod/2025/05/26/6e6c08ae-c22f-4223-998d-333b90bf56d6_20250526181634A050_/PIx3oQ6lhH2Gf38f307c9e2ed9dd586a762291f63107.png",
		success: () => {
			console.log("shareAppMessageToGroup");
		}
	});
	console.log("setUpdateShare");
	// wx.updateShareMenu({
	// 	withShareTicket: true,
	// 	activityId: "1327_i0YEP3JMligRnmMOY2SMZnrnwBBAK2JHBK7c0wnjzrnmZqhIvmds1AcbDIs~",
	// 	templateInfo: {},
	// 	success() {
	// 		console.log("setUpdateShare成功");
	// 	},
	// 	fail() {
	// 		console.log("setUpdateShare失败");
	// 	}
	// });
	// wx.updateShareMenu({
	// 	// 属性1：注意：只有转发到群聊转发或私密消息中打开才可以获取到 shareTicket 返回值，单聊没有 shareTicket。
	// 	withShareTicket: true,
	// 	// 属性2：支持转发动态消息。动态消息对比普通消息：动态消息特点：
	// 	// ①、消息发出去之后，开发者可以通过后台接口修改部分消息内容。
	// 	// ②、消息有对应的提醒按钮，用户点击提醒按钮可以订阅提醒，开发者可以通过后台修改消息状态并推送一次提醒消息给订阅了提醒的用户
	// 	// ③、设置该属性后群内消息不可转发
	// 	isUpdatableMessage: true,
	// 	// 属性3：动态消息ID；需要根据服务端接口获取
	// 	activityId: "1327_i0YEP3JMligRnmMOY2SMZnrnwBBAK2JHBK7c0wnjzrnmZqhIvmds1AcbDIs~",
	// 	// 属性4：群待办消息的ID：需要根据服务端接口获取
	// 	toDoActivityId: "",
	// 	templateInfo: {
	// 		parameterList: [
	// 			{
	// 				name: "member_count",
	// 				value: "1"
	// 			},
	// 			{
	// 				name: "room_limit",
	// 				value: "3"
	// 			}
	// 		],
	// 		templateId: "21B034D08C5615B9889CE362BB957B1EE69A584B" //应用于组队场景
	// 	},
	// 	success: () => {
	// 		uni.showToast({
	// 			title: "设置动态消息成功"
	// 		});
	// 	}
	// });
};
/**
 * @desc 设置胶囊分享按钮是否可用
 */
const shareMenuShow = () => {
	// uni.showShareMenu({
	// 	title: "TodeAI测试的分享",
	// 	content: "TodeAI测试的分享内容",
	// 	imageUrl: "",
	// 	path: "",
	// 	success: (res) => {
	// 		uni.showToast({
	// 			title: "设置成功"
	// 		});
	// 	}
	// });
	// 微信官方API无法进行转发内容设置
	wx.showShareMenu({
		// 属性1：注意：只有转发到群聊中打开才可以获取到 shareTicket 返回值，单聊没有 shareTicket。转发私密消息时，群聊和单聊都可获取到 shareTicket
		withShareTicket: true,
		menus: ["shareAppMessage", "shareTimeline"],
		success: () => {
			uni.showToast({
				title: "设置成功"
			});
		}
	});
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
		return { query: "a=1&b=2" };
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
</style>
