## 微信授权登录

微信小程序2022-10最新版授权
注意：  
1.此登录组件用了uview弹窗组件u-popup和图标组件u-icon，没安装uview可自行更改  
2.此登录组件本人设计的是全局可弹窗，所以用到了vuex，需vuex设置showWxLogin参数，this.setShowWxLogin(true)全局打开弹窗。如果不需要全局弹窗，可单独引入组件将showWxLogin放props自行更改。
     
不多说了，开干  
引用组件和vuex--注意组件的路径
```
import { mapState, mapMutations } from 'vuex';
import fLogin from '@/components/module/f-wxLogin/f-wxLogin.vue';
```

vuex需在main.js中全局引入
```
import store from '@/store'
Vue.prototype.$store = store;
```

vuex的store中定义显示弹窗参数
```
export const state = {
    showWxLogin:false,//控制是否打开登录弹窗
};
```

vuex的store中定义打开关闭登录弹窗方法
```
setLoginPopupShow(state, data){
	state.showWxLogin = data
}
```

