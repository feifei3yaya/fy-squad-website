# P0 保守收口设计文档 (Spec)

## 1. 背景与上下文

项目是一个基于 React + TS + Vite 的“肥鸭战队社区官网”原型。目前页面视觉完成度较高，但存在明显的工程欠账，包括默认模板痕迹、未使用代码与依赖、以及部署配置缺失。

## 2. 设计目标

通过“保守收口”策略，在不影响当前业务展示和资源结构的前提下，消除明显的工程残留，确保项目具备交付级的清洁度和稳定的构建状态。

## 3. 修改范围

### 3.1 模板信息收口
- **文件**: `index.html`
- **变更**:
  - `lang="en"` -> `lang="zh-CN"`
  - `<title>My Trae Project</title>` -> `<title>肥鸭战队社区官网</title>`
  - 更新 description meta 标签为项目描述。

### 3.2 冗余代码清理
- **删除文件**:
  - `src/components/Empty.tsx` (明确未使用)
  - `src/hooks/useTheme.ts` (明确未使用)
  - `src/lib/utils.ts` (仅被 Empty.tsx 使用，若 Empty.tsx 删除则该文件也无业务引用)

### 3.3 依赖精简
- **文件**: `package.json`
- **变更**: 移除 `framer-motion` 和 `zustand`。这两者在当前源码中无引用，且页面动画均由 CSS 实现。

### 3.4 部署文档增强
- **文件**: `README.md`
- **变更**: 在“部署提醒”章节明确增加关于 `BrowserRouter` 路由回退（Fallback）的配置说明（针对 Nginx/Vercel 等平台）。

## 4. 验证计划

1. **环境恢复**: 执行 `npm install` 确保依赖同步。
2. **代码检查**: 执行 `npm run lint` 验证无语法或规范错误。
3. **类型检查**: 执行 `npm run check` 验证 TS 类型定义正确性。
4. **构建验证**: 执行 `npm run build` 确保生产环境包可正常生成。

## 5. 非目标 (Non-Goals)

- 不进行 `src/assets/` 素材的大规模迁移或删除。
- 不修改页面 UI 布局或业务逻辑。
- 不进行后端 API 接入。
- 不改动当前已正常运行的资源引用路径。
