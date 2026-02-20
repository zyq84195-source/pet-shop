-- Pet Shop Database Schema for Supabase
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255),
  description TEXT,
  description_zh TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image_url TEXT,
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pets Table
CREATE TABLE IF NOT EXISTS pets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  age VARCHAR(50),
  gender VARCHAR(20),
  color VARCHAR(100),
  size VARCHAR(50),
  description TEXT,
  description_zh TEXT,
  image_url TEXT,
  images TEXT[],
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'pending', 'adopted')),
  vaccinated BOOLEAN DEFAULT FALSE,
  neutered BOOLEAN DEFAULT FALSE,
  good_with_kids BOOLEAN DEFAULT TRUE,
  good_with_pets BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255),
  description TEXT,
  description_zh TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(50),
  image_url TEXT,
  category VARCHAR(100),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  order_number VARCHAR(50) UNIQUE DEFAULT 'ORD' || to_char(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('order_seq')::TEXT, 4, '0'),
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT,
  phone VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order sequence
CREATE SEQUENCE IF NOT EXISTS order_seq;

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  pet_name VARCHAR(255) NOT NULL,
  pet_type VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(20) NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adoptions Table
CREATE TABLE IF NOT EXISTS adoptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(50) NOT NULL,
  applicant_address TEXT NOT NULL,
  pet_experience TEXT,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart Table (for persistent cart)
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_adoptions_user_id ON adoptions(user_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_pet_id ON adoptions(pet_id);
CREATE INDEX IF NOT EXISTS idx_pets_status ON pets(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Users: Anyone can read, only own data can be updated
CREATE POLICY "Users are publicly readable" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Bookings: Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Adoptions: Users can only see their own adoptions
CREATE POLICY "Users can view own adoptions" ON adoptions FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create adoptions" ON adoptions FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Cart: Users can only manage their own cart
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own cart" ON cart_items FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own cart" ON cart_items FOR DELETE USING (auth.uid()::text = user_id::text);

-- Functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_adoptions_updated_at BEFORE UPDATE ON adoptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (id, name, name_zh, description, description_zh, price, original_price, image_url, category, stock, rating, reviews, featured) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Premium Dog Food', '优质狗粮', 'High-quality nutrition for your dog', '为您的爱犬提供高质量营养', 49.99, 59.99, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', 'food', 100, 4.8, 256, true),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Cat Scratching Post', '猫抓板', 'Durable scratching post for cats', '耐用的猫咪抓板', 29.99, NULL, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', 'accessories', 50, 4.5, 128, true),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Pet Grooming Kit', '宠物美容套装', 'Complete grooming kit for all pets', '适用于所有宠物的完整美容套装', 79.99, 99.99, 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', 'grooming', 30, 4.9, 89, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample pets
INSERT INTO pets (id, name, species, breed, age, gender, color, size, description, description_zh, image_url, status, vaccinated, neutered) VALUES
('d4e5f6a7-b8c9-0123-def0-123456789012', 'Luna', 'cat', 'Persian', '2 years', 'female', 'White', 'medium', 'A gentle and loving Persian cat', '一只温柔可爱的波斯猫', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', 'available', true, true),
('e5f6a7b8-c9d0-1234-ef01-234567890123', 'Max', 'dog', 'Golden Retriever', '3 years', 'male', 'Golden', 'large', 'Friendly and energetic Golden Retriever', '友好活泼的金毛猎犬', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', 'available', true, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample services
INSERT INTO services (id, name, name_zh, description, description_zh, price, duration, image_url, category) VALUES
('f6a7b8c9-d0e1-2345-f012-345678901234', 'Full Grooming', '全套美容', 'Complete grooming service including bath, haircut, and nail trim', '全套美容服务，包括洗澡、剪毛和修剪指甲', 89.99, '2-3 hours', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', 'grooming'),
('a7b8c9d0-e1f2-3456-0123-456789012345', 'Pet Boarding', '宠物寄养', 'Safe and comfortable boarding for your pets', '为您的宠物提供安全舒适的寄养服务', 45.00, 'per day', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 'boarding')
ON CONFLICT (id) DO NOTHING;
