# 游戏百科功能设计文档 (Spec)

## 1. 背景与上下文

项目已有「游戏指南」（面向新手入门）和「战术库」（战队战术分享），缺失一个系统化的游戏知识库。需要新增一个「游戏百科」模块，全面覆盖 Squad 的武器、兵种、载具、地图、阵营、模式等核心数据。

## 2. 设计目标

- 提供一个结构清晰、可扩展的游戏知识库
- 所有百科数据通过独立 TypeScript 文件集中管理，便于后续接入后端
- 保持与现有页面（Guide、Tactics）的功能边界清晰
- 完全复用项目现有的设计语言（`hud-corners`、`panel`、`section-label`、`page-title` 等）

## 3. 路由设计

```
/wiki                    → 百科大厅（卡片入口）
/wiki/weapons            → 武器图鉴
/wiki/classes            → 兵种手册
/wiki/vehicles           → 载具百科
/wiki/maps               → 地图图鉴
/wiki/factions           → 阵营档案
/wiki/modes              → 模式规则
```

在 `App.tsx` 中新增 7 条 Route。导航栏（Home.tsx 的 Nav 组件）新增「百科」链接。

## 4. 页面设计

### 4.1 百科大厅（/wiki）

6 张大型卡片组成的网格入口，采用 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 响应式布局。

每张卡片结构：
- 图标（lucide-react，每种分类不同图标）
- 中文标题（武器图鉴、兵种手册、载具百科、地图图鉴、阵营档案、模式规则）
- 英文副标题
- 条目数量统计
- hover 时卡片上浮 + 边框高亮
- 底部「浏览全部 →」链接

### 4.2 子页面通用布局（/wiki/weapons 等）

采用 **左侧边栏 + 右侧内容区** 的文档式布局

## 5. 数据结构

```
src/
├─ data/
│  └─ wiki/
│     ├─ weapons.ts
│     ├─ classes.ts
│     ├─ vehicles.ts
│     ├─ maps.ts
│     ├─ factions.ts
│     ├─ modes.ts
│     └─ index.ts
└─ pages/
   ├─ Wiki.tsx
   └─ wiki/
      ├─ Weapons.tsx 等
```

## 6. 样式与组件

完全复用现有设计系统 + 新增 WikiSidebar.tsx 和 WikiLayout.tsx 公共组件