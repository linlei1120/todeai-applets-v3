# 小程序聊天工具API

## 一、功能定位

聊天工具模式为小程序与微信聊天深度结合而生，助力实现**群问卷、拼单、任务**等场景，相比普通模式，开放 **聊天成员交互、内容发送、动态消息** 等专属能力，需基于**独立分包 + skyline 渲染**开发，也可被普通模式唤起。

![](https://res.wx.qq.com/op_res/Q7aL8rFfZ8uTLdWnPkvkDjbYhO0-L3GWYMr3Xs4rspav7HGBlHgwFsJvRq-60YyCbZI6zIInBHikQSZd1Mp5SQ)



> 当使用`skyline`等非`webview`渲染引擎时，必须将`lazyCodeLoading`设置为`requiredComponents`，否则会因配置不匹配导致编译错误。
>
> 在小程序的`app.json`中添加或修改`lazyCodeLoading`配置，示例如下：
>
> ```javascript
> {
>   ...
>   "lazyCodeLoading": "requiredComponents" // 新增配置
>   "subPackages": [
>     {
>       "root": "packageA",
>       "name": "chatTool",
>       "pages": [{
> 			"path": "pages/cases/chat",
> 			"style": {
> 				"navigationBarTitleText": "聊天工具API"
> 			}
>     	}],
>       "independent": true,
>       "renderer": "skyline",
>       "componentFramework": "glass-easel",
>     
>     }
>   ],
>   ...
> }
> ```
>
> 

## 二、核心配置（`app.json`）

### 1. 分包与聊天工具声明

```javascript
{
    "lazyCodeLoading": "requiredcomponents",
	"subPackages": [{
		"root": "packageA",
		"name": "chatTools",
		"pages": [{
			"path": "pages/cases/chat",
			"style": {
				"navigationBarTitleText": "聊天工具API"
			}
		}],
		"independent": true,
		"componentFramework": "glass-easel",
		"renderer": "skyline",	
	}],
	"chatTools": [{
		"root": "packageA",
		"entryPagePath": "pages/cases/chat",
		"desc": "群聊助手 - 提供图片、视频、文件分享等功能",
		"scopes": [
			"scope.userLocation"
		]
	}],
	"rendererOptions": {
		"skyline": {
			"disableABTest": true,
			"defaultDisplayBlock": true,
			"defaultContentBox": true,
			"tagNameStyleIsolation": "legacy",
			"sdkVersionBegin": "3.7.8",
			"sdkVersionEnd": "15.255.255"
		}
	}
}
```

## 三、模式进入与退出

### 1. 进入方式

- **选聊天唤起**：普通模式调用 `wx.openChatTool()`（不传 `聊天室id`），拉起聊天列表选群 / 单聊，绑定后进入。

  ```javascript
  wx.openChatTool({
      url: "/packageA/pages/cases/chat",
  })
  ```

- **直接绑定进入**：普通模式调用 `wx.openChatTool({ chatRoomId: '群opengid/单聊open_single_roomid' })`，直接绑定进入。

- **从聊天回流**：用户从聊天内工具入口（如分享的卡片）返回小程序，自动以聊天工具模式打开，保留绑定的聊天。

### 2. 退出方式

- **跳回非工具页**：在工具分包内，通过返回操作、`wx.navigateBack()`、`wx.switchTab()` 跳回主包 / 其他分包，触发退出。
- **重定向普通页**：`wx.reLaunch()` 打开主包 / 非工具页，或用户点击非工具入口，触发退出。
- **限制**：工具分包内无法用 `wx.navigateTo`/`wx.redirectTo` 跳非工具页，需先 `navigateBack` 退出再跳转。

### 3. 模式判定

通过 `wx.getApiCategory().apiCategory === 'chatTool'` 判断当前是否为聊天工具模式。

## 四、核心能力开发

### 1. 聊天成员能力

- 获取聊天室 ID

  - 进入工具前（如从群卡片打开）：`wx.getGroupEnterInfo()` 获取群 `opengid`，传给 `wx.openChatTool` 免选群。
  - 进入工具后：`wx.getChatToolInfo()` 获取绑定的 `opengid`/`open_single_roomid`、用户 `group_openid`（同用户不同群 ID 不同 ）。

- **选择成员**：`wx.selectGroupMembers()` 唤起选择器（单聊直接返回对方 `group_openid`）。

- **渲染头像昵称**：用 `<open-data-list>` + `<open-data-item>` 组件渲染聊天成员信息。

  ```javascript
  <open-data-list type="groupMembers" members="{{members}}">
      <view class="userinfo" slot:index>
          <open-data-item class="avatar" type="userAvatar" index="{{index}}" />
          <open-data-item class="name" type="userNickName" index="{{index}}" />
      </view>
  </open-data-list>
  ```

  

### 2. 内容发送能力

| 功能                        | 接口 / 方式                                                  | 说明                                     |
| --------------------------- | ------------------------------------------------------------ | :--------------------------------------- |
| 发小程序卡片                | `wx.shareAppMessageToGroup`                                  | 分享到绑定聊天                           |
| 提醒成员（@+ 文案）         | `wx.notifyGroupMembers`                                      | 格式：`@成员1 @成员2 请完成：[小程序链]` |
| 发文本                      | `<form bind:submitToGroup>` + `button form-type="submitToGroup"` | 提交输入框文本到聊天                     |
| 发图片 / 表情 / 视频 / 文件 | `wx.shareImageToGroup`/`wx.shareEmojiToGroup`/`wx.shareVideoToGroup`/`wx.shareFileToGroup` | 直接发送对应类型内容到聊天               |

```javascript
// 1、转发图片到聊天
wx.downloadFile({
    url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    success: (res) => {
        console.log(res);
        wx.shareImageToGroup({
            imagePath: res.tempFilePath,
            success(res2) {
                console.log('success', res2);
            },
            fail: (err2) => {
                console.log('fail', err2);
            }
        })
    },
    fail: (err) => {
        console.log(err);
    }
})
// 2、转发视频到聊天
wx.downloadFile({
    url: "https://videos.pexels.com/video-files/32049182/13661811_1080_1920_30fps.mp4",
    success(res) {
        console.log(res);
        // 下载完成后转发
        wx.shareVideoToGroup({
            videoPath: res.tempFilePath,
            success(res2) {
                console.log('success', res2);
            },
            fail: (err2) => {
                console.log('fail', err2);
            }
        })
    },
    fail: (err) => {
        console.log(err);
    }
})
// 3、转发文件到聊天
wx.downloadFile({
    url: "https://qdai.jinbang.minio.api.pyxshuzi.com/volunteer-prod/font/lottery_font.ttf", // 下载url
    success(res) {
        console.log(res);
        // 下载完成后转发
        wx.shareFileToGroup({
            filePath: res.tempFilePath,
            success(res2) {
                console.log('success', res2);
            },
            fail: (err2) => {
                console.log('fail', err2);
            }
        })
    },
    fail: (err) => {
        console.log(err);
    }
})
// 4、转发表情到聊天
wx.downloadFile({
    url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    success: (res) => {
        console.log(res);
        wx.shareEmojiToGroup({
            imagePath: res.tempFilePath,
            success(res2) {
                console.log('success', res2);
            },
            fail: (err2) => {
                console.log('fail', err2);
            }
        })
    },
    fail: (err) => {
        console.log(err);
    }
})
// 5、转发小程序卡片到聊天
wx.shareAppMessageToGroup({
    title: '转发小程序卡片到聊天',
    imageUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    success: (res) => {
        console.log(res);
    },
    fail: (err) => {
        console.log(err);
    }
})
// 6、选择聊天室成员
wx.selectGroupMembers({
    maxSelectCount: maxSelectCount.value,
    success: (res) => {
        console.log(res)
        members.value = res.members;
    },
    fail: (err) => {
        console.log(err);
    }
})
// 7、提醒用户完成任务
wx.notifyGroupMembers({
    title: '提醒用户完成任务',
    members: members.value,
    entrancePath: '/packageA/pages/cases/chat',
    type: 'complete', //participate-请参与 complet-请完成
})

// 8、发送文本到聊天
<form bind:submitToGroup="onSubmitToGroup">
    <label for="">发送文本:</label>
    <textarea v-model="shareText" />
    <button form-type="submitToGroup" need-show-entrance="{{true}}">发送</button>
</form>
```



### 3. 动态消息能力（卡片状态更新 + 系统通知）

1. **服务端创建 `activity_id`**：通过微信服务端接口生成，用于关联动态消息。

   https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-message-management/updatable-message/createActivityId.html

2. 前端声明动态卡片

   ```javascript
   wx.updateShareMenu({
     withShareTicket: true,
     isUpdatableMessage: true,
     activityId: 'xxx', // 服务端生成的 activity_id
     useForChatTool: true, // 标记用于聊天工具模式
     chooseType: 1, // 1=指定参与者；2=群内所有成员
     participant: ['group_openid1', 'group_openid2'], // chooseType=1 时必填
     templateInfo: {
       templateId: '4A68CBB88A92B0A9311848DBA1E94A199B166463' // 模板（区分完成/参与态）
     }
   });
   ```

3. **服务端更新状态**：通过 `setChatToolMsg` 接口（或云开发 `chattoolmsg.send`）更新活动状态 / 用户完成情况，触发卡片辅标题更新、聊天内系统消息（如 `alex 完成了 cindy 发布的 团建报名` ）。

   https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-message-management/updatable-message/setChatToolMsg.html

## 五、禁用能力适配

聊天工具模式下，以下能力不可用，需替换方案：

- **转发**：禁用 `button open-type=share`、右上角转发，改用 `wx.shareAppMessageToGroup` 等专属接口。
- **外跳**：`navigateToMiniProgram`（跳其他小程序）、`openEmbeddedMiniProgram`（嵌入小程序）等外跳接口禁用，需闭环在工具内。
- **广告**：`ad`/`ad-custom` 组件禁用，需移除或做模式判断隐藏。

## 六、开发流程总结

1. 配置独立分包 + skyline 渲染，声明 `chatTools` 信息。
2. 通过 `wx.openChatTool` 控制进入模式，区分工具内 / 外逻辑。
3. 用专属接口实现成员交互、内容发送、动态消息。
4. 规避禁用能力，做好模式判定与适配。