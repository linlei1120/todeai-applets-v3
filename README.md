# TodeAI 移动端应用

## 项目简介

TodeAI移动端是一个基于uni-app框架开发的跨平台移动应用，支持H5、微信小程序、Android和iOS多端部署。该项目提供了完整的用户管理、工作台、微信工具集等功能模块，采用Vue 3 + Pinia的现代化技术栈，为用户提供流畅的移动端体验。

## 技术栈

### 核心框架
- **uni-app**: 跨平台应用开发框架
- **Vue 3**: 现代化JavaScript前端框架
- **Pinia**: Vue 3官方推荐的状态管理库

### 样式与UI
- **SCSS**: CSS预处理器
- **UV-UI**: 基于uni-app的UI组件库
- **原生组件**: 基于uni-app的跨平台组件系统

### 开发工具
- **HBuilderX**: DCloud推荐的IDE
- **ES6+**: 现代JavaScript语法支持

### 第三方插件
- **z-paging**: 分页组件
- **z-tabs**: 标签页组件
- **uni-transition**: 过渡动画组件
- **uni-popup**: 弹窗组件

## 功能模块

### 🔐 用户认证模块
- 用户登录/注册
- 密码修改
- 权限管理
- 登录状态持久化

### 👤 个人中心模块
- 个人信息管理
- 头像上传/修改
- 账户设置
- 帮助中心
- 关于我们

### 💼 工作台模块
- 工作台首页
- 任务管理
- 数据统计
- 工具集合

### 🛠️ WX工具模块
- 微信相关工具集
- 设备接口调用
- 振动功能
- 简单模块示例

### 🎯 案例展示模块
- 晃动检测功能
- 设备能力演示
- 交互效果展示

### 🔧 通用模块
- WebView浏览器
- 文本浏览器
- 通用工具函数

## 项目目录结构

```
todeai-applets-v3/
├── api/                    # API接口管理
│   ├── system/            # 系统相关接口
│   └── login.js           # 登录接口
├── components/            # 自定义组件
│   ├── chat-input-bar/    # 聊天输入组件
│   ├── chat-item/         # 聊天消息组件
│   ├── model/             # 模态框组件
│   ├── uni-section/       # 页面区块组件
│   ├── user-model/        # 用户模态框
│   └── wxLogin/           # 微信登录组件
├── common/                # 公共资源
├── global/                # 全局配置
├── pages/                 # 页面文件
│   ├── cases/             # 案例演示页面
│   ├── common/            # 通用页面
│   ├── index/             # 首页相关
│   ├── mine/              # 个人中心页面
│   ├── work/              # 工作台页面
│   ├── wxExample/         # 微信功能示例
│   ├── index.vue          # 应用首页
│   ├── login.vue          # 登录页面
│   └── register.vue       # 注册页面
├── plugins/               # 插件管理
│   ├── auth.js            # 认证插件
│   ├── modal.js           # 模态框插件
│   ├── tab.js             # 标签页插件
│   └── index.js           # 插件入口
├── static/                # 静态资源
│   ├── font/              # 字体文件
│   ├── icon/              # 图标资源
│   ├── images/            # 图片资源
│   ├── scss/              # 样式文件
│   └── tabbar/            # 底部导航图标
├── store/                 # 状态管理
│   ├── modules/           # 状态模块
│   │   ├── user.js        # 用户状态
│   │   ├── config.js      # 配置状态
│   │   └── dict.js        # 字典状态
│   └── index.js           # store入口文件
├── uni_modules/           # uni-app插件模块
│   ├── uv-ui/             # UV-UI组件库
│   ├── z-paging/          # 分页组件
│   ├── z-tabs/            # 标签页组件
│   ├── uni-popup/         # 弹窗组件
│   └── ...                # 其他UI组件
├── utils/                 # 工具函数
│   ├── auth.js            # 认证工具
│   ├── common.js          # 通用工具
│   ├── constant.js        # 常量定义
│   ├── dict.js            # 字典管理
│   ├── errorCode.js       # 错误码定义
│   ├── permission.js      # 权限管理
│   ├── request.js         # 网络请求封装
│   ├── storage.js         # 本地存储
│   ├── upload.js          # 文件上传
│   └── validate.js        # 表单验证
├── App.vue                # 应用入口组件
├── config.js              # 应用配置文件
├── main.js                # 应用入口文件
├── manifest.json          # 应用配置清单
├── pages.json             # 页面路由配置
├── permission.js          # 全局权限配置
├── template.h5.html       # H5页面模板
├── uni.scss               # 全局样式文件
└── index.html             # 入口HTML文件
```

## 平台支持

### 📱 移动端
- **Android**: 支持原生App打包
- **iOS**: 支持原生App打包

### 🌐 Web端
- **H5**: 支持浏览器访问
- **微信小程序**: 支持微信生态部署

## 开发环境搭建

### 环境要求
- Node.js >= 12.0.0
- HBuilderX 或 VSCode + uni-app插件
- Git

### 安装步骤

1. **克隆项目**
```bash
git clone [项目地址]
cd todeai-applets-v3
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **配置环境**
- 修改 `config.js` 中的API地址
- 配置 `manifest.json` 中的应用信息

4. **运行项目**
```bash
# H5开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# App开发
在HBuilderX中运行到手机或模拟器
```

## 配置说明

### API配置
在 `config.js` 中配置后端API地址：
```javascript
export default {
  baseUrl: 'https://your-api-domain.com',
  // 其他配置...
}
```

### 小程序配置
在 `manifest.json` 的 `mp-weixin` 节点配置小程序appid：
```json
{
  "mp-weixin": {
    "appid": "your-wxapp-id"
  }
}
```

## 核心依赖说明

### UI组件库
- **UV-UI**: 完整的uni-app UI组件库，提供丰富的基础组件
- **uni-ui**: uni-app官方UI组件库
- **z-paging**: 强大的分页组件，支持下拉刷新和上拉加载
- **z-tabs**: 灵活的标签页组件

### 状态管理
- **Pinia**: Vue 3官方推荐的状态管理库
- 支持模块化状态管理
- 提供TypeScript支持

### 网络请求
- 基于uni.request封装的请求库
- 支持请求拦截器和响应拦截器
- 统一错误处理机制

## 开发规范

### 代码规范
- 使用ES6+语法
- 遵循Vue 3 Composition API规范
- 组件命名采用PascalCase
- 文件命名采用kebab-case

### 目录规范
```
pages/
├── 模块名/
│   ├── index.vue          # 模块首页
│   ├── detail.vue         # 详情页
│   └── components/        # 模块专用组件
```

### 组件开发规范
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 导入依赖
import { ref, reactive } from 'vue'

// 响应式数据
const data = ref('')

// 方法定义
const handleClick = () => {
  // 处理逻辑
}
</script>

<style lang="scss" scoped>
// 样式定义
</style>
```

## API接口规范

### 请求格式
```javascript
// GET请求
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/list',
    method: 'get',
    params
  })
}

// POST请求
export function createItem(data) {
  return request({
    url: '/api/create',
    method: 'post',
    data
  })
}
```

### 响应格式
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    // 响应数据
  }
}
```

## 状态管理使用

### Store结构
```javascript
// store/modules/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {}
  }),
  
  getters: {
    isLogin: (state) => !!state.token
  },
  
  actions: {
    setToken(token) {
      this.token = token
    }
  }
})
```

### 在组件中使用
```javascript
import { useUserStore } from '@/store'

const userStore = useUserStore()
const isLogin = userStore.isLogin
```

## 组件使用指南

### UV-UI组件使用
```vue
<template>
  <!-- 按钮组件 -->
  <uv-button type="primary" @click="handleClick">
    点击按钮
  </uv-button>
  
  <!-- 输入框组件 -->
  <uv-input 
    v-model="inputValue" 
    placeholder="请输入内容"
  />
  
  <!-- 弹窗组件 -->
  <uv-popup v-model:show="showPopup">
    <view class="popup-content">
      弹窗内容
    </view>
  </uv-popup>
</template>
```

### 自定义组件使用
```vue
<template>
  <!-- 聊天输入组件 -->
  <chat-input-bar 
    @send="handleSend"
    placeholder="请输入消息"
  />
</template>
```

## 部署指南

### H5部署
1. 构建项目
```bash
npm run build:h5
```

2. 将 `unpackage/dist/build/h5` 目录部署到Web服务器

### 小程序部署
1. 构建项目
```bash
npm run build:mp-weixin
```

2. 使用微信开发者工具打开 `unpackage/dist/build/mp-weixin` 目录
3. 上传代码到微信小程序后台

### App打包
1. 在HBuilderX中打开项目
2. 选择"发行" -> "原生App-云打包"
3. 配置打包参数并提交打包

## 常见问题

### Q: 如何添加新页面？
A: 
1. 在 `pages` 目录下创建页面文件
2. 在 `pages.json` 中配置路由
3. 如需底部导航，在 `tabBar` 中添加配置

### Q: 如何使用自定义组件？
A: 
1. 在 `components` 目录下创建组件
2. 在页面中直接使用，无需导入注册

### Q: 如何处理跨域问题？
A: 
1. H5端：配置代理或后端设置CORS
2. App端：无跨域限制
3. 小程序端：配置服务器域名白名单

### Q: 如何调试不同平台？
A: 
- H5：浏览器开发者工具
- 小程序：微信开发者工具
- App：HBuilderX真机调试

## 性能优化

### 代码优化
- 使用懒加载减少首屏加载时间
- 合理使用缓存机制
- 优化图片资源大小

### 包体积优化
- 按需引入UI组件
- 移除未使用的依赖
- 启用代码压缩

### 运行时优化
- 合理使用v-if和v-show
- 避免频繁的DOM操作
- 使用虚拟列表处理大量数据

## 项目特性

- ✅ **跨平台支持**: 一套代码，多端运行
- ✅ **现代化技术栈**: Vue 3 + Pinia + SCSS
- ✅ **模块化架构**: 清晰的目录结构和模块划分
- ✅ **完整的用户系统**: 登录/注册/权限管理
- ✅ **丰富的组件库**: 自定义组件和uni-app生态
- ✅ **工具集成**: 微信能力调用和设备接口
- ✅ **响应式设计**: 适配不同屏幕尺寸

## 更新日志

### v1.2.0 (2024-xx-xx)
- 新增WX工具模块
- 优化用户体验
- 修复已知问题

### v1.1.0 (2024-xx-xx)
- 新增工作台功能
- 完善个人中心
- 性能优化

### v1.0.0 (2024-xx-xx)
- 项目初始化
- 基础功能实现

## 版本信息

- **当前版本**: v1.2.0
- **uni-app版本**: Vue 3
- **兼容性**: 支持iOS 9.0+, Android 5.0+

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 [LICENSE](./LICENSE) 许可证。

## 联系方式

如有问题或建议，欢迎联系开发团队。

## 技术支持

- 📧 邮箱: support@todeai.com
- 🌐 官网: https://todeai.com
- 📱 QQ群: 123456789

---

**TodeAI移动端团队** © 2024
