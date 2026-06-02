# 肥鸭战队(FY)官方社区网站 - 技术架构文档

## 1. 架构设计

- **前端框架**: React@18 + Vite
- **CSS框架**: Tailwind CSS v3
- **路由**: React Router v6
- **HTTP客户端**: Axios
- **图标**: Lucide React
- **图表**: Chart.js / Recharts
- **后端框架**: Spring Boot 3.x
- **ORM**: MyBatis-Plus
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **安全**: Spring Security, JWT

## 2. 路由定义

| 路由 | 用途 |
|------|------|
| / | 首页 |
| /about | 关于肥鸭 |
| /forum | 肥鸭论坛首页 |
| /forum/:boardId | 板块帖子列表 |
| /forum/post/:postId | 帖子详情 |
| /join | 加入肥鸭 |
| /server | FY服务器专区 |
| /sponsor | 赞助我们 |
| /guide | 游戏科普 |
| /tactics | 肥鸭战术库 |
| /events | 赛事活动 |
| /contact | 联系我们 |
| /links | 友情链接 |
| /profile | 个人中心 |
| /messages | 站内消息 |
| /login | 登录页 |
| /404 | 错误页面 |

## 3. API定义

### 用户相关
- POST /api/auth/login - 用户登录
- GET /api/auth/qq/callback - QQ登录回调
- GET /api/user/me - 获取当前用户
- PUT /api/user/profile - 更新用户信息

### 论坛相关
- GET /api/forum/boards - 获取板块列表
- GET /api/forum/posts - 获取帖子列表
- GET /api/forum/posts/:id - 获取帖子详情
- POST /api/forum/posts - 发布帖子

### 服务器相关
- GET /api/server/status - 获取服务器状态
- GET /api/server/trend - 获取24小时趋势
- GET /api/server/bans - 获取黑名单

### 赞助相关
- POST /api/sponsor/orders - 创建赞助订单
- GET /api/sponsor/records - 查询赞助记录
- GET /api/sponsor/rankings - 获取赞助榜单

## 4. 数据模型

核心表：user, board, post, reply, sponsor_record, join_application, server_status, ban_record, notification

**文档版本**: v1.0
**创建日期**: 2026-05-30