<template>
	<view>
		<u-popup ref="uPopup" :show="show" :round="10" mode="bottom" @close="close" closeable>
			<view class="UPOP">
				<view class="title ">我的</view>
				<view class="margin">
					<view class="userInfo-box">
						<view class="userInfo" @click="recordClick">
							<image class="avatar image" :src="userInfo&&userInfo.icon?userInfo.icon:'/static/avatar.png'"></image>
							<view class="info">
								<view class="name ">{{userInfo?userInfo.nick:'登录/注册'}}</view>
								<view class="award u-light-color">剩余<text class="span ">{{userInfo?userInfo.integral:0}}</text>积分</view>
							</view>
						</view>
					</view>
					<view class="stat ">
						<view class="have ">{{'该服务每次消耗：'+chatIntegral+'积分'}}</view>
					</view>
					<view class="videoAd">
						<view class="info ">
							<view class="inviteTitle ">每日签到获取积分</view>
							<view class="award ">奖励<text class="span ">{{signIntegral}}</text>积分</view>
						</view>
						<view class="btn" @click="signClick">签到</view>
					</view>
					<u-line></u-line>
					<view class="invite">
						<view class="info ">
							<view class="inviteTitle ">邀请新的小伙伴来体验</view>
							<view class="award ">奖励<text class="span ">{{inviteIntegral}}</text>积分/个，每天最多<text class="span ">{{10}}</text>人</view>
							<view class="hint ">提示：点击右上角<text class="more ">···</text>可分享朋友圈邀请</view>
						</view>
						<view class="btn">
							<text>邀请朋友</text>
							<button class="button" open-type="share"></button>
						</view>
					</view>
					<u-line></u-line>
					<view class="videoAd">
						<view class="info">
							<view class="videoAdTitle ">看视频广告攒次数</view>
							<view class="award ">奖励<text class="span ">{{adIntegral}}</text>积分/次</view>
						</view>
						<view class="btn" @click="adClick">观看视频</view>
					</view>
				</view>
				<u-button open-type='contact' color="#7966ff" :plain="true" text="咨询客服(意见反馈)">咨询客服(意见反馈)</u-button>
			</view>
		</u-popup>
		<models v-if="downShow" :title="downTitle" :btnText="'看广告领 '+adIntegral+' 积分'" :authorize="false" @close="downShow = false" @save="adClick"></models>
		<models v-if="loginShow"
				:ad="true"
				title="为了更好的玩机体验，快去授权登录吧"
				btnText="授权登录"
				@save="getUserInfo"
				@close="loginShow = false"></models>

		<models v-if="signShow"
				:authorize="false"
				:ad="true"
				:title="signTitle"
				btnText="知道了"
				closeText=" "
				@save="signShow = false"></models>
		<wxLogin ref="wxLogin" @submit="submitLogin"></wxLogin>

		<u-top-tips ref="uTips" z-index="99999"></u-top-tips>
	</view>
</template>

<script>
	import {connectWebSocket} from "../../common/useSocket";

	const globalData = getApp().globalData;
	import G from '../../global/global.json';
	import models from '@/components/model/model.vue';
	import wxLogin from '@/components/wxLogin/wxLogin.vue';
	export default {
		name:"user-model",
		components:{models,wxLogin},
		props:{
			chatIntegral:{	//显示的内容
				type: [Number,String],
				default: 1
			}
		},
		data() {
			return {
				// 签到
				isSign: false,
				signShow: false,
				signTitle: '',
				signIntegral: 0,
				inviteIntegral: 0,
				adIntegral: 0,
				// 登录弹窗
				loginShow: false,
				downShow: false,
				downTitle: '',
				show: false,

				userInfo:null,
			};
		},
		methods:{
			open(type){
				this.userInfo = this.getLoginUserInfo();
				if(type === 'login'){
					this.loginShow = true;
				}else{
					this.getConfig();
					this.show = true;
					this.$refs.uPopup.open();
				}
			},
			close() {
				this.show = false;
				this.$emit('save');
			},
			getConfig(){

			},
			signClick(){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			},
			recordClick(){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			},
			adClick(){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			},
			adLoad(){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			},
			userIntegral(){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			},
			// 登录
			getUserInfo(){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			},
			submitLogin(e){
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
				this.$emit('save');
			},
			//登录后提交服务器获取进一步信息
			wxloginres(code) {
				this.$refs.uTips.show({title: '模板功能，仅供参考！',type: 'error',duration: '1500'});
			}
		}
	}
</script>

<style lang="scss">
	.UPOP {
		padding: 30rpx;

		.title {
			align-items: center;
			display: flex;
			font-size: 30rpx;
			font-weight: 450;
			height: 90rpx;
			justify-content: center;
		}

		.margin {
			margin: auto;
			.userInfo-box{
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
			}
			.userInfo {
				align-items: center;
				display: flex;
				margin-bottom: 30rpx;
				.info {
					color: #3a3a3a;
					display: flex;
					flex-direction: column;
					font-size: 29rpx;
					justify-content: center;
					.name {
						font-size: 40rpx;
						font-weight: 500;
					}

				}
				.avatar{
					width: 100rpx;
					height: 100rpx;
					border-radius: 100rpx;
					margin-right: 30rpx;
				}
			}
			.stat {
				align-items: center;
				color: #7966ff;
				display: flex;
				font-size: 27rpx;
				margin-bottom: 30rpx;

				.free,
				.have {
					background-color: rgba(81, 181, 237, .1);
					border-radius: 7rpx;
					padding: 13rpx;
				}

				.free {
					margin-left: 30rpx;
				}
			}

			.invite {
				align-items: center;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				margin-top: 15rpx;
				.info {
					line-height: 50rpx;

					.inviteTitle {
						color: #3a3a3a;
						font-size: 30rpx;
						font-weight: 450;
					}

					.award {
						color: #3a3a3a;
						font-size: 28rpx;
					}

					.award .span {
						color: #7966ff;
						margin-left: 10rpx;
						margin-right: 10rpx;
					}

					.hint {
						align-items: center;
						color: #ababab;
						display: flex;
						font-size: 25rpx;
					}

					.hint .more {
						font-size: 40rpx;
						margin-left: 5rpx;
						margin-right: 5rpx;
					}

				}

				.btn {
					align-items: center;
					background-color: rgba(81, 181, 237, .1);
					border-radius: 50rpx;
					color: #7966ff;
					display: flex;
					font-size: 28rpx;
					height: 60rpx;
					justify-content: center;
					padding-left: 25rpx;
					padding-right: 25rpx;
					position: relative;

					.button {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
				}
			}

			.videoAd {
				align-items: center;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				margin-top: 15rpx;

				.info {
					line-height: 50rpx;

					.videoAdTitle {
						color: #3a3a3a;
						font-size: 30rpx;
						font-weight: 450;
					}

					.award {
						color: #3a3a3a;
						font-size: 28rpx;
					}

					.award .span {
						color: #7966ff;
						margin-left: 10rpx;
						margin-right: 10rpx;
					}
				}

				.btn {
					align-items: center;
					background-color: rgba(81, 181, 237, .1);
					border-radius: 50rpx;
					color: #7966ff;
					display: flex;
					font-size: 28rpx;
					height: 60rpx;
					justify-content: center;
					padding-left: 25rpx;
					padding-right: 25rpx;
					position: relative;
				}
			}
		}
	}
	/* 按钮样式处理 */
	.button {
		font-size: 28rpx;
	}

	/* 取消按钮默认的边框线效果 */
	.button:after {
		border: none;
	}

	/* 设置图片默认样式，取消默认尺寸 */
	.image {
		display: block;
		height: auto;
		width: auto;
	}

	/* 输入框默认字体大小 */
	.input {
		font-size: 28rpx;
	}

	/* 列式弹性盒子 */
	.flex_col {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	/* 行式弹性盒子 */
	.flex_row {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}

	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow {
		width: 0;
		flex-grow: 1;
	}

	.flex_row .flex_grow {
		flex-grow: 1;
	}
</style>