<template>
	<view>
		<!-- use-chat-record-mode：开启聊天记录模式 -->
		<!-- use-virtual-list：开启虚拟列表模式 -->
		<!-- cell-height-mode：设置虚拟列表模式高度不固定 -->
		<!-- safe-area-inset-bottom：开启底部安全区域适配 -->
		<!-- bottom-bg-color：设置slot="bottom"容器的背景色，这里设置为和chat-input-bar的背景色一致 -->
		<z-paging ref="paging" v-model="talkList" use-chat-record-mode use-virtual-list cell-height-mode="dynamic" safe-area-inset-bottom bottom-bg-color="#f8f8f8"

				  @query="getHistoryMsg" @keyboardHeightChange="keyboardHeightChange" @hidedKeyboard="hidedKeyboard">

			<!-- style="transform: scaleY(-1)"必须写，否则会导致列表倒置！！！ -->
			<!-- 注意不要直接在chat-item组件标签上设置style，因为在微信小程序中是无效的，请包一层view -->
			<template #cell="{item,index}">
				<view style="transform: scaleY(-1)">
					<chat-item :item="item"></chat-item>
				</view>
			</template>

			<!-- 底部聊天输入框 -->
			<template #bottom>
				<chat-input-bar ref="inputBar" @send="send" @handleOpen="handleopen"/>
			</template>
		</z-paging>

		<user-model ref="userModel" :chatIntegral="chatIntegral" @save="updateUserInfo"></user-model>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	const globalData = getApp().globalData;

	import chatInputBar from '@/components/chat-input-bar/chat-input-bar.vue'
	import chatItem from '@/components/chat-item/chat-item.vue'
	import userModel from '@/components/user-model/user-model.vue'
	export default {
		components:{chatInputBar,chatItem,userModel},
		data() {
			return {
				// 签到
				isSign: false,
				signShow: false,
				signTitle: '',
				signIntegral: 0,
				inviteIntegral: 0,
				adIntegral: 0,
				chatIntegral: 0,
				// 登录弹窗
				loginShow: false,
				talkList: [],
				content: '',
				downShow: false,
				downTitle: '',
				show: false,

				socketState:false,
				sendState:false,
				isTyping:false,
				currentMassage:{},
				currentIndex:0,
				currentContent:'',
				typingInterval:50,
				userInfo:null,
				imitateMsgList:[
					{is_end:false,result:'你好，这是一条模拟消息回复。'},
					{is_end:false,result:'请问有什么问题我可以为您解答吗？'},
					{is_end:false,result:'我可以协助您完成范围广泛的任务并提供有关各种主题的信息，比如回答问题，提供定义和解释及建议，如果您有任何具体需要帮助，可以随时问我，'},
					{is_end:true,result:'我很乐意为您提供帮助。'},
				],
				imitateIndex:0
			}
		},
		onLoad(options) {
			this.userInfo = this.getLoginUserInfo();
		},
		methods: {
			updateUserInfo(){
				this.userInfo = this.getLoginUserInfo();
			},
			// 获取历史消息
			getHistoryMsg() {
				let get = async () => {
					let data = [{
						content: globalData.appName+'为您服务：\n1. 知乎百度答题、做作业题目\n2. 写代码、写文案、写论文，写小说\n3. 文案润色、翻译、写诗作词\n4. 扮演面试官、扮演书籍电影角色\n例1：写一篇工作日报我是行政\n例2：帮我写作业，题目是xxx\n例3：把下文翻译成英文：xxx\n例4：写一出能活的短视频剧本\n例5：英文写物理相关的论文\n或者可以问我其他问题\n越完整的描述，我越精确', // 消息内容
						type: 0,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
						state: 0,
						icon:'/static/logo.png',
						end:true
					}];
					this.$refs.paging.complete(data);
				}
				get();
			},
			// 监听键盘高度改变，请不要直接通过uni.onKeyboardHeightChange监听，否则可能导致z-paging内置的键盘高度改变监听失效（如果不需要切换表情面板则不用写）
			keyboardHeightChange(res) {
				this.$refs.inputBar.updateKeyboardHeightChange(res);
			},
			// 用户尝试隐藏键盘，此时如果表情面板在展示中，应当通知chatInputBar隐藏表情面板（如果不需要切换表情面板则不用写）
			hidedKeyboard() {
				this.$refs.inputBar.hidedKeyboard();
			},
			socketInit(){
				connectWebSocket(G.ws);
				this.$Socket.eventPatch.onOpen((msg,sk)=>{        //监听是否连接成功
					this.$data.socketState = true;
					this.onmessage(); 		// 监听消息接
				});
				this.$Socket.eventPatch.onClose((msg,sk)=>{        //监听是否连接成功
					this.$data.socketState = false;
				});
			},
			onmessage(){
				var that = this;
				//当websocket收到后端发送的消息时，触发
				this.$Socket.eventPatch.onMsg((msg,sk)=>{    //监听是否接受消息
					that.$data.socketState = true;
					if(msg.type === 'message'){
						if(msg.code == 200){
							if(msg.data.type === 'deduct'){
								// 积分扣除成功
								that.userInfo.integral = that.userInfo.integral - parseInt(msg.data.integral);
								uni.setStorage({
									key: 'USERINFO',
									data: JSON.stringify(that.userInfo),
								});
							}else{
								that.$data.currentMassage = msg.data;
								that.$data.currentContent += msg.data.result;

								that.startTyping();
							}
						}else{
							that.$refs.uTips.show({title: msg.msg,type: 'error',duration: '2300'});
							that.talkList[0].content = msg.msg;
							that.talkList[0].end = true;
							that.$data.currentIndex = 0;
							that.$data.currentContent = '';
							that.$data.sendState = false;
							if(msg.code === '3030'){
								setTimeout(function(){
									that.$refs.userModel.open('login');
								},2300);
							}
						}
					}
				});
			},
			startTyping() {
				if (this.isTyping) return;
				var that = this;
				this.isTyping = true;
				setTimeout(() => {
					if (this.currentIndex <= this.currentContent.length) {
						that.talkList[0].state = 1;
						that.talkList[0].content = this.currentContent.substring(0, this.currentIndex++);
						that.$forceUpdate()
						// 	// 设置当前滚动的位置
						//that.setPageScrollTo();
						this.isTyping = false;
						this.startTyping();
					} else {
						if(that.$data.currentMassage.is_end){
							that.talkList[0].end = true;
							that.$data.currentIndex = 0;
							that.$data.currentContent = '';
							that.$data.sendState = false;
						}
						this.isTyping = false;
					}
				}, this.typingInterval);
			},
			handleopen() {
				this.$refs.userModel.open('base');
			},
			send(msg){
				var that = this;
				that.content = msg;
				if(this.$data.sendState){
					return false;
				}
				/*if(!that.userInfo){
					this.$refs.userModel.open('login');
					return false;
				}*/
				if (!that.content) {
					that.$refs.uTips.show({title: '请输入有效的内容',type: 'error',duration: '2300'});
					return false;
				}
				/*if(this.chatIntegral > 0){
					var integral = this.userInfo.integral
					if(integral < this.chatIntegral){
						that.$refs.uTips.show({title: '提问需要 '+this.chatIntegral+' 积分,当前积分不足！',type: 'error',duration: '1500'});
						setTimeout(function(){
							that.$refs.userModel.open('base');
						},1500);
						return false;
					}
				}*/
				that.$refs.inputBar.setMsg('');
				/*if(!this.$data.socketState){
					this.socketInit();
				}*/
				that.$data.sendState = true;
				that.talkList.unshift({
					content: that.content, // 消息内容
					type: 1 ,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
					state: 1,
					icon:(this.userInfo&&this.userInfo.icon?this.userInfo.icon:'/static/avatar.png'),
				})
				that.talkList.unshift({
					content: '', // 消息内容
					type: 0 ,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
					state: 0,
					end:false,
					icon:'/static/logo.png',
				})
				this.$forceUpdate()

				this.imitateIndex = 0;
				this.toSend();
			},
			// 发送信息
			toSend() {
				const that = this;
				var times = Math.floor(Math.random() * 2000) + 500;
				// 模拟接收消息
				setTimeout(function(){
					that.currentMassage = that.imitateMsgList[that.imitateIndex];
					that.currentContent += that.currentMassage.result;
					that.startTyping();
					if(that.imitateIndex >= that.imitateMsgList.length-1){
						that.imitateIndex = 0;
					}else{
						that.imitateIndex ++;
						that.toSend();
					}
				},times);
				/*
				if(!this.$data.socketState){
					setTimeout(function(){
						that.toSend();
					},200);
					return false;
				}
				let messages = [];
				for(var i=that.talkList.length-1;i>0;i--){
					if(that.talkList[i].state == 1){
						messages.push({
							content: that.talkList[i].content,
							role: that.talkList[i].type==1?'user':'assistant'
						});
					}
				}
				that.content = '';

				this.$Socket.nsend({
					type:'message',
					token:this.userInfo.token,
					id:this.$data.id,
					integral:this.$data.chatIntegral,
					data:messages
				});*/
			}
		}
	}
</script>

<style lang="scss">

	page {
		background-color: #f3f3f3;
		font-size: 28rpx;
		box-sizing: border-box;
		color: #333;
		letter-spacing: 0;
		word-wrap: break-word;
	}
</style>
