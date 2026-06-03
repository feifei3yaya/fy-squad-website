# 肥鸭战队社区官网

一个基于 React + TypeScript + Vite 构建的战队社区官网前端项目，主题围绕《战术小队（Squad）》社区展示、服务器信息、论坛入口、加入申请与战队宣传。

## 项目概览

- 项目定位：战队官网与社区门户前端
- 当前状态：前端页面已具备较完整展示效果，整体更偏静态展示站 / 原型站
- 主要目标：统一战队形象展示、承载服务器信息、论坛入口、招募与联络功能
- 当前特点：视觉资源较丰富，页面完成度较高，但业务后端尚未接入

## 技术栈

- React 18
- TypeScript
- Vite 6
- React Router
- Tailwind CSS
- lucide-react

补充说明：

- 构建配置见 `vite.config.ts`
- 路由入口见 `src/App.tsx`
- 样式主题见 `tailwind.config.js` 与 `src/index.css`

## 页面结构

当前已注册的主要页面如下：

- `/`：首页
- `/about`：关于战队
- `/forum`：论坛
- `/join`：加入申请
- `/server`：服务器信息
- `/sponsor`：赞助
- `/guide`：新手指南
- `/tactics`：战术库
- `/events`：活动
- `/contact`：联系
- `/links`：友情链接
- `/profile`：个人中心
- `/messages`：消息中心
- `/login`：登录
- `*`：404 页面

## 目录结构

```text
.
├─ public/                 # 直接通过 URL 访问的静态资源
│  ├─ images/
│  └─ videos/
├─ src/                    # 前端源码
│  ├─ assets/              # 源码侧资源
│  │  ├─ images/
│  │  ├─ videos/
│  │  └─ squadmaps/
│  ├─ components/          # 公共组件
│  ├─ hooks/               # 自定义 hooks
│  ├─ lib/                 # 工具函数
│  ├─ pages/               # 页面级组件
│  ├─ App.tsx              # 路由入口
│  ├─ index.css            # 全局样式
│  └─ main.tsx             # 应用入口
├─ dist/                   # 构建产物
├─ docs/                   # 项目文档
├─ encoding-skill/         # 编码修复工具
├─ package.json
├─ tailwind.config.js
└─ vite.config.ts
```

## 本地启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认会启动本地 Vite 开发服务。

### 3. 构建生产包

```bash
npm run build
```

### 4. 本地预览构建产物

```bash
npm run preview
```

### 5. 类型检查

```bash
npm run check
```

### 6. Lint 检查

```bash
npm run lint
```

## 资源说明

当前项目存在两套资源组织方式：

- `public/`：适合通过 `/images/...`、`/videos/...` 直接引用的资源
- `src/assets/`：适合通过模块化导入管理的资源

建议后续统一资源使用规范，避免维护时出现路径混乱。

## 当前已知问题

- 当前大部分页面数据仍为硬编码展示数据
- 登录、加入申请、联系表单、论坛等尚未接入真实后端
- `README` 之前为默认模板，现已改为项目说明版本
- 项目中存在少量未完全接入的依赖与代码
- 图片与视频资源较多，后续需要做性能优化
- 当前使用 `BrowserRouter`，若部署到普通静态服务器，需要配置路由回退，否则刷新子路由可能出现 404

## 开发建议

- 优先处理资源路径、文档、部署规则等基础工程问题
- 其次补齐数据层与接口层，完成从展示站到业务站的转化
- 最后进行性能、体验和后台管理能力建设

更详细的收口任务请查看：

- `docs/PROJECT_CLEANUP_CHECKLIST.md`

## 部署提醒

项目使用 `BrowserRouter`，部署到静态服务器时**必须配置路由回退（Fallback）**，否则刷新子路由（如 `/about`、`/forum`）会出现 404。

### Nginx 配置示例

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Vercel 配置

在项目根目录创建 `vercel.json`：

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify 配置

在项目根目录创建 `_redirects`（放在 `public/` 目录下）：

```text
/*    /index.html   200
```

### 通用提醒

- 正确发布 `dist/` 目录
- 校验 `public/` 内图片与视频是否完整可访问
- 首次部署后逐页检查所有一级路由是否正常

## 备注

- `encoding-skill/` 为辅助处理终端乱码问题的工具目录，不属于官网核心业务代码
- `.trae/` 目录主要保存规则、需求与过程文档
