# Pet Shop Website - Deployment Guide

## 🚀 Quick Start (Vercel + Supabase - 免费部署)

### Step 1: 创建 GitHub 仓库

```bash
# 在 pet-shop 目录下执行
cd C:\Users\zyq15\pet-shop

# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 在 GitHub 创建新仓库后执行
git remote add origin https://github.com/你的用户名/pet-shop.git
git branch -M main
git push -u origin main
```

### Step 2: 注册免费服务

1. **Vercel** (前端托管)
   - 访问: https://vercel.com
   - 使用 GitHub 登录
   - 点击 "New Project"
   - 选择你的 pet-shop 仓库
   - 点击 "Deploy"

2. **Supabase** (数据库 + 存储)
   - 访问: https://supabase.com
   - 使用 GitHub 登录
   - 创建新项目
   - 记录以下信息:
     - Project URL
     - Anon Key
     - Service Role Key (用于后端)

### Step 3: 配置环境变量

在 Vercel 项目设置中添加:

```
NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Anon Key
SUPABASE_SERVICE_ROLE_KEY=你的Service Role Key
```

---

## 📦 Vercel CLI 部署 (可选)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd C:\Users\zyq15\pet-shop
vercel

# 生产部署
vercel --prod
```

---

## 🗄️ Supabase 数据库配置

在 Supabase SQL Editor 中执行:

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 订单表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  total_amount DECIMAL(10, 2),
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 订单项表
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id VARCHAR(50),
  quantity INTEGER,
  price DECIMAL(10, 2)
);

-- 预约表
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  service_id VARCHAR(50),
  pet_name VARCHAR(100),
  pet_type VARCHAR(50),
  booking_date DATE,
  booking_time VARCHAR(10),
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 领养申请表
CREATE TABLE adoptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  pet_id VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  application_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Row Level Security (RLS)

```sql
-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoptions ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的数据
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid()::text = user_id::text);
```

---

## 🌐 部署成功后

你的网站将可通过以下地址访问:
- Vercel 默认域名: `your-project.vercel.app`
- 可在 Vercel 设置中添加自定义域名

---

## 💰 升级到付费方案

当业务增长后:
1. 升级 Supabase Pro ($25/月)
2. 使用阿里云/腾讯云服务器
3. 配置微信/支付宝支付
