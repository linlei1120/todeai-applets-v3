import G from './global.json';
import md5 from './md5.js';

exports.install = function (Vue, options) {
	//获得玩家登录信息
	Vue.prototype.getLoginUserInfo = function (){
		var ret = null;
		try{
			var result = uni.getStorageSync('USERINFO');
			if(result!="undefined"){
				var userInfo = JSON.parse(result);
				ret = userInfo
			}
		}catch(e){
			//TODO handle the exception
		}
		return ret;
	};
	// 生成唯一id存在用户设备中，用来做统计使用
	Vue.prototype.getUuid = function(){
		var Uuid = uni.getStorageSync('USERUNIID');
		if(!Uuid){
			Uuid = Number(Math.random().toString().substr(3,20) + Date.now()).toString(36);
			uni.setStorage({
				key: 'USERUNIID',
				data: Uuid,//0游客 1用户
				success: function () {
				},
				fail:function(){
				}
			});
		}
		return Uuid;
	};
    // 发送请求
	Vue.prototype.request = function(data){
		// 游览器指纹id，当作客户端用户id
		var Uuid = this.getUuid();
		if(data.data.data){
			var tdata = JSON.parse(data.data.data);
		}else{
			var tdata={};
		}
		var spid  = getApp().globalData.spid;
		tdata.Uuid = Uuid;
		tdata.ChannelNo = spid;//渠道编号，用于统计使用
		tdata.appName = getApp().globalData.appName;
		data.data.lang = getApp().globalData.language;
		// #ifdef APP-PLUS
		   tdata.plat ='and';
		   tdata.dtoken = getApp().globalData.appToken;
		//#endif
		// #ifndef APP-PLUS
		   tdata.plat ='H5'
		//#endif
		var token = '';
		var userInfo = this.getLoginUserInfo();
		if(userInfo != null){
			token = userInfo.token;
		}
		tdata.token  = token;
		tdata._ts = Date.parse( new Date() ).toString().substr(0,10);
		tdata._sign = this.getSign(tdata);
		data.data.data = JSON.stringify(tdata);
		uni.request(data);
	};
	//接口签名
	Vue.prototype.getSign = function (params){
		var keys = Object.keys(params),
		  i, len = keys.length;
		
		keys.sort();
		var newObj=[];
		var j=0;
		for (i = 0; i < len; i++) {
			var k = keys[i];
			if(params[k])
			{
				j++;
				if(typeof params[k] === 'boolean'){ // bool值提交到后台会转成数字，导致验签不通过
					newObj[j]=1;
				}else{
					newObj[j]=params[k];
				}
			}
		}
		var signStr = newObj.join("#")+"#"+getApp().globalData.app_sign_key;
		return md5(signStr.substr(1));
	};
	/**
	 * 操作失败
	 * **/
	Vue.prototype.operError = function (){
		uni.showToast({
			title: '操作错误',
			icon:'none',
			duration:1500
		});
		setTimeout(function(){
			uni.switchTab({
				url: '/pages/index/index'
			});
		},1500);
	};
};