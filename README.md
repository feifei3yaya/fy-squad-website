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

## 本地启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

### 3. 构建生产包

```bash
npm run build
```

### 4. 类型检查

```bash
npm run check
```

### 5. Lint 检查

```bash
npm run lint
```

## 部署提醒

项目使用 `BrowserRouter`，部署到静态服务器时**必须配置路由回退（Fallback）**，否则刷新子路由会出现 404。

### Nginx 配置示例

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
