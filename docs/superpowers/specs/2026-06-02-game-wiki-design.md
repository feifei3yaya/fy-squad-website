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

卡片使用 `bg-fy-panel border border-fy-green-dim/20 hud-corners` 样式，与项目现有面板风格一致。

### 4.2 子页面通用布局（/wiki/weapons 等）

采用 **左侧边栏 + 右侧内容区** 的文档式布局：

**左侧边栏（w-64）**：
- 按分类（如武器按阵营/Role，地图按地图名）组织的条目列表
- 当前选中条目高亮（`bg-fy-amber text-fy-dark`）
- sticky 定位，跟随滚动

**右侧内容区**：
- 选中条目的详细信息
- 以结构化卡片展示参数（数值 + 标签）
- 每条数据用 `data-label` + `data-value` 展示

移动端：侧边栏改为顶部下拉/折叠式。

### 4.3 各子页面内容规划

| 子页面 | 内容 | 数据来源 |
|--------|------|----------|
| 武器图鉴 | 各阵营武器列表，含伤害/射速/弹匣/射程等参数 | `src/data/wiki/weapons.ts` |
| 兵种手册 | 步枪兵/医疗兵/机枪手/反坦克兵/工兵/狙击手等兵种说明 | `src/data/wiki/classes.ts` |
| 载具百科 | 各阵营载具列表，含水陆空分类与参数 | `src/data/wiki/vehicles.ts` |
| 地图图鉴 | 全部地图列表，匹配 `squadmaps_images/` 中的缩略图 | `src/data/wiki/maps.ts` |
| 阵营档案 | 美军/俄军/英军/解放军等阵营介绍 | `src/data/wiki/factions.ts` |
| 模式规则 | RAAS/AAS/Invasion/Destruction 等模式详解 | `src/data/wiki/modes.ts` |

## 5. 数据结构

### 5.1 目录结构

```
src/
├─ data/
│  └─ wiki/
│     ├─ weapons.ts        # 武器数据
│     ├─ classes.ts        # 兵种数据
│     ├─ vehicles.ts       # 载具数据
│     ├─ maps.ts           # 地图数据
│     ├─ factions.ts       # 阵营数据
│     ├─ modes.ts          # 模式数据
│     └─ index.ts          # 统一导出 + 统计汇总
└─ pages/
   ├─ Wiki.tsx             # 百科大厅
   └─ wiki/
      ├─ Weapons.tsx       # 武器图鉴
      ├─ Classes.tsx       # 兵种手册
      ├─ Vehicles.tsx      # 载具百科
      ├─ Maps.tsx          # 地图图鉴
      ├─ Factions.tsx      # 阵营档案
      └─ Modes.tsx         # 模式规则
```

### 5.2 数据模型示例

```typescript
// weapons.ts
export interface Weapon {
  id: string;
  name: string;
  faction: string;
  type: string;
  damage: number;
  fireRate: number;
  magazineSize: number;
  range: string;
  description: string;
}

// maps.ts
export interface GameMap {
  id: string;
  name: string;
  nameZh: string;
  image: string;          // 引用 squadmaps 中的缩略图
  size: string;
  layers: string[];
  description: string;
}
```

### 5.3 数据规模

初期每类 5-20 条条目，覆盖 Squad 核心游戏内容：

| 类别 | 条目数 |
|------|--------|
| 武器 | ~15 |
| 兵种 | ~10 |
| 载具 | ~12 |
| 地图 | ~26（已有 squadmaps_images/ 资源） |
| 阵营 | ~4 |
| 模式 | ~4 |

## 6. 样式与组件

### 6.1 完全复用现有设计系统

- 页面框架：`bg-fy-dark min-h-screen` + `max-w-6xl mx-auto`
- 面板样式：`bg-fy-panel border border-fy-green-dim/20 hud-corners`
- 标题层级：`section-label` → `page-title` → `data-label` / `data-value`
- 按钮：`btn-amber`、`btn-outline`
- 颜色变量：`fy-amber`、`fy-dark`、`fy-panel`、`fy-surface`、`fy-green`、`fy-steel`
- 字体：`font-hud`（Rajdhani）、`font-body`（Noto Sans SC）、`font-mono`（JetBrains Mono）
- 图标：lucide-react（与项目其他页面一致）

### 6.2 新增公共组件

- `WikiSidebar.tsx`：通用侧边栏组件，接收条目列表 + 选中 ID + 点击回调
- `WikiLayout.tsx`：通用文档式布局容器，包含侧边栏 + 内容区的布局逻辑和响应式处理

## 7. 导航集成

在 Home.tsx 的 Nav 组件 `links` 数组中追加：

```typescript
{ to: '/wiki', label: '百科' }
```

同时同步更新 Footer 中的导航链接。

## 8. API / 数据层

- 当前阶段：所有百科数据通过静态 TypeScript 文件存储，页面直接 import
- 后续扩展：数据结构已预留后端对接能力，切换 API 时只需替换数据加载逻辑

## 9. 错误处理与空状态

- 每个子页面处理「暂无数据」的空状态展示
- 使用 404 路由兜底不存在的百科子页面

## 10. 验证计划

1. 所有新页面路由可正常访问
2. 百科大厅 6 张卡片点击跳转正确
3. 各子页面侧边栏导航正常切换
4. 移动端响应式布局正常
5. `npm run check` 类型检查通过
6. `npm run lint` 代码规范检查通过
7. `npm run build` 生产构建通过

## 11. 非目标 (Non-Goals)

- 不接入外部 Wiki API
- 不做内容编辑/管理后台
- 不做搜索/筛选功能（初期版本）
- 不修改现有 Guide 和 Tactics 页面的内容与结构
