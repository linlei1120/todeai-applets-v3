<script setup>
	import config from "./config";
	import {
		getToken
	} from "@/utils/auth";
	import {
		useConfigStore
	} from "@/store";
	import {
		getCurrentInstance
	} from "vue";
	import {
		onLaunch
	} from "@dcloudio/uni-app";

	const {
		proxy
	} = getCurrentInstance();

	onLaunch(() => {
		initApp();
	});

	// 初始化应用
	function initApp() {
		// 初始化应用配置
		initConfig();
		// 检查用户登录状态
		//#ifdef H5
		// checkLogin()
		//#endif
	}

	function initConfig() {
		wx.login({
			success(res) {
				if (res.code) {
					console.log("登录Code！", res);
				} else {
					console.log("登录失败！");
				}
			}
		});
		wx.checkSession({
			success() {
				console.log("checkSession未过期");
				//session_key 未过期，并且在本生命周期一直有效
			},
			fail() {
				console.log("checkSession过期");
				// session_key 已经失效，需要重新执行登录流程
				wx.login(); //重新登录
			}
		});
		useConfigStore().setConfig(config);
	}

	function checkLogin() {
		if (!getToken()) {
			proxy.$tab.reLaunch("/pages/login");
		}
	}
</script>

<style lang="scss">
	@import "@/static/scss/index.scss";
</style>