<template>
	<view class="chat">
		<view class="create-active">
			<button @click="createActivity">创建活动</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const title = ref("");

	const createActivity = () => {
		wx.openChatTool({
			url: "/packageA/pages/cases/chat",
		})
	}
</script>

<style style="scss" scoped>

</style>