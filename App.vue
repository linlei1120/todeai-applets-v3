<script setup>
import config from "./config";
import { getToken } from "@/utils/auth";
import { useConfigStore } from "@/store";
import { getCurrentInstance } from "vue";
import { onLaunch } from "@dcloudio/uni-app";

const { proxy } = getCurrentInstance();

onLaunch((option) => {
	console.log("onLaunch", option);
	initApp();
	wx.getShareInfo({
		shareTicket: option.shareTicket,
		success: (res) => {
			console.log("获取转发分享信息成功", res);
			//参考响应参数
			//cloudID: "93_Vu1Jk7EEdqubuSJSbsKzMifIlEAUuoBsyKvtJIJyKZ_ZdhbcbVhHO4L66Js" //敏感数据对应的云 ID，开通云开发的小程序才会返回
			// encryptedData: "9zbJiTUzDnmXktoSN+6a0XgKVL5RI0RBgbXbxBTFCNGtqvUd9VYi/j4LbuO93nAsFdZB8wA6G8+lF7Z8rM4D/lbQbdIlfNUXOfZNazX+t7hW9skDJ4nIpq6O6g+eneXLR683hvUCMigN03fHMEG1Bg=="
			// errMsg: "getShareInfo:ok"
			// iv: "OoO51sAIOpNPSFDDtv9KxA=="
		}
	});
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
