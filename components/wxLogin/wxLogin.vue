<template>
	<u-popup v-model="show" mode="bottom" borderRadius="44rpx" :closeable="true" @close="onClose">
		<view class="popupBox">
			<view class="h2 bold">获取您的昵称、头像</view>
			<view class="h3">获取用户头像、昵称，主要用于向用户提供具有辨识度的用户中心界面</view>
			<view class="form">
				<view class="input u-flex">
					<view class="h2">头像</view>
					<view class="info">
						<button class="avatar-wrapper button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<image class="avatar image" :src="avatarUrl||'/static/avatar.png'"></image>
							<u-icon name="arrow-right" size="32rpx" color="#999"></u-icon>
						</button> 
					</view>
				</view>
				<view class="input u-flex">
					<view class="h2">昵称</view>
					<view class="info">
						<input class="input" type="nickname" v-model="nickName" placeholder="请输入昵称" @blur="onBlur"/>
					</view>
				</view>
			</view>
			<view class="submit" :style="{background:PrimaryColor}" @click="submit">确定</view>
		</view>
		<!--自定义提示弹出层-->
		<u-top-tips ref="uTips"></u-top-tips>

	</u-popup>
</template>

<script>
const globalData = getApp().globalData;
import uPopup from '@/uview-ui/components/u-popup/u-popup.vue';
import uTopTips from '@/uview-ui/components/u-top-tips/u-top-tips.vue';
export default {
	components: {
				uPopup,
				uTopTips
			},
	data() {
        return {
			PrimaryColor: '#7966ff', //主题色
			avatarUrl:'',
			nickName:'',
			show:false,
			userInfo:null,
		}
	},
	watch:{
		showWxLogin(val){
			this.show = val
			if(val){
				this.avatarUrl = this.userInfo?this.userInfo.icon:'';
				this.nickName = this.userInfo?this.userInfo.nick:'匿名';
			}
		}
	},
	methods:{
		open(){
			this.userInfo = this.getLoginUserInfo();
			this.avatarUrl = this.userInfo?this.userInfo.icon:'';
			this.nickName = this.userInfo?this.userInfo.nick:'匿名';
			this.show = true;
		},
		onClose(){
			this.show = false;
		},
		onChooseAvatar(e){
			//该图片需要上传到自己服务器--此处没做处理
			this.avatarUrl = e.detail.avatarUrl
		},
		onBlur(e){
			this.nickName = e.detail.value
		},
		checkURL(URL){
			var str=URL;
			//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
			//下面的代码中应用了转义字符"\"输出一个字符"/"
			var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
			var objExp=new RegExp(Expression);
			if(objExp.test(str)==true){
				return true;
			}else{
				return false;
			}
		},
		async submit(){
			console.log(this.avatarUrl,this.nickName);
			var that = this
			if(!that.avatarUrl){
				this.$refs.uTips.show({title: '请上传头像~',type: 'error',duration: '1500'})
				return false;
			}
			if(!that.nickName){
				this.$refs.uTips.show({title: '请输入昵称~',type: 'error',duration: '1500'})
				return false;
			}
			if(that.avatarUrl == that.userInfo.icon && that.nickName == that.userInfo.nick){
				that.onClose()
				that.$emit('submit',true);
				return false;
			}
			var q_data = {
				nick:this.nickName,
				token:this.userInfo.token,
			}
			var uploadFile = '';
			if(that.checkURL(that.avatarUrl)){
				q_data.avatarUrl = this.avatarUrl;
			}else{
				uploadFile = this.avatarUrl
			}
			// TODO 上传到自己的服务器

		},
	},
}
</script>

<style lang="scss" scoped>
.popupBox{
	width: 100%;
	padding: 50rpx 40rpx 30rpx;
	.h2{
		color: #333;
		font-size: 32rpx;
	}
	.h3{
		font-size: 26rpx;
		color: #999;
		line-height: 1.4;
		padding-top: 14rpx;
	}
	.bold{
		font-weight: bold;
	}
	.form{
		margin-top: 30rpx;
		border-top: 1px solid #EFEFEF;
		.input{
			padding: 24rpx 0;
			border-bottom: 1px solid #EFEFEF;
			.info{
				flex:1;
				margin-left: 30rpx;
				.avatar-wrapper{
					width: 100%;
					height: 70rpx;
					display: flex;
					justify-content: space-between;
					.avatar{
						width: 70rpx;
						height: 70rpx;
						border-radius: 10rpx;
					}
				}
				.button{
					padding: 0;
					background-color: #fff;
					border: 0;
					tap-highlight-color: rgba(0,0,0,0);
					tap-highlight-color: transparent;
					-webkit-tap-highlight-color: rgba(0,0,0,0);
					-webkit-tap-highlight-color: transparent;
					border-radius: 0;
				}
				.button::after{
					border: 0;
					border-radius: 0;
				}
				.input{
					background: transparent;
					width: 100%;
					height: 70rpx;
					color: #333;
					font-size: 30rpx;
					border: none;
					border-radius: 0;
				}
			}
		}
	}
}
.submit{
	margin-top: 30rpx;
	width: 100%;
	height: 92rpx;
	border-radius: 10rpx;
	text-align: center;
	line-height: 92rpx;
	color: #fff;
	font-size: 32rpx;
	background: #E83F3C;
}
</style>