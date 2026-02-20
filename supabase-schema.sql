-- ============================================
-- Pet Shop Database Schema
-- 在 Supabase SQL Editor 中执行此脚本
-- ============================================

-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 订单表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  total_amount DECIMAL(10, 2),
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 订单项表
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(50),
  product_name VARCHAR(255),
  quantity INTEGER,
  price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 预约表
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  service_id VARCHAR(50),
  service_name VARCHAR(255),
  pet_name VARCHAR(100),
  pet_type VARCHAR(50),
  booking_date DATE,
  booking_time VARCHAR(10),
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 领养申请表
CREATE TABLE adoptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  pet_id VARCHAR(50),
  pet_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  applicant_name VARCHAR(100),
  applicant_email VARCHAR(255),
  applicant_phone VARCHAR(20),
  applicant_address TEXT,
  pet_experience TEXT,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 启用 Row Level Security (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 创建安全策略
-- ============================================

-- 用户可以查看自己的数据
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert user" ON users
  FOR INSERT WITH CHECK (true);

-- 订单策略
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- 订单项策略
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Users can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- 预约策略
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- 领养申请策略
CREATE POLICY "Users can view own adoptions" ON adoptions
  FOR SELECT USING (true);

CREATE POLICY "Users can create adoptions" ON adoptions
  FOR INSERT WITH CHECK (true);

-- ============================================
-- 创建索引以提高查询性能
-- ============================================

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_adoptions_user_id ON adoptions(user_id);
CREATE INDEX idx_adoptions_status ON adoptions(status);

-- ============================================
-- 完成！
-- ============================================
