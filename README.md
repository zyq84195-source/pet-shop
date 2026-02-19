# 🐾 Paws & Love 宠物店网站

一个现代化的宠物店网站，支持宠物领养、商品购买、服务预约等功能。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 访问地址

- 英文版: http://localhost:3000/en
- 中文版: http://localhost:3000/zh

## 📦 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **国际化**: next-intl
- **数据库**: Supabase (PostgreSQL)

## 🌐 部署指南

### 方案一：Vercel + Supabase（推荐，免费）

详见 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 方案二：Docker 部署

```bash
# 构建镜像
docker build -t pet-shop .

# 运行容器
docker run -d -p 3000:3000 pet-shop

# 或使用 docker-compose
docker-compose up -d
```

## 📁 项目结构

```
pet-shop/
├── src/
│   ├── app/[locale]/     # 页面路由
│   ├── components/       # UI 组件
│   ├── data/             # Mock 数据
│   ├── i18n/             # 国际化配置
│   ├── lib/              # 工具函数
│   └── types/            # TypeScript 类型
├── public/               # 静态资源
└── package.json
```

## 🔧 环境变量

复制 `.env.example` 为 `.env.local` 并填入实际值：

```bash
cp .env.example .env.local
```

## 📱 功能模块

| 模块 | 功能 |
|------|------|
| 宠物领养 | 浏览、筛选、申请领养 |
| 商城购物 | 商品浏览、购物车、结账 |
| 服务预约 | 预约美容、寄养、医疗 |
| 信息展示 | 关于我们、联系方式、FAQ |

## 🚀 快速部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/pet-shop)

## 📄 License

MIT
