// Supabase Client Configuration
// 将此文件用于 Supabase 数据库连接

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (for API routes)
export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Helper functions
export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createOrder(orderData: {
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  shippingAddress: string;
}) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId,
      total_amount: orderData.totalAmount,
      shipping_address: orderData.shippingAddress,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}

export async function createBooking(bookingData: {
  userId: string;
  serviceId: string;
  petName: string;
  petType: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: bookingData.userId,
      service_id: bookingData.serviceId,
      pet_name: bookingData.petName,
      pet_type: bookingData.petType,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      notes: bookingData.notes,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createAdoption(adoptionData: {
  userId: string;
  petId: string;
  applicationData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    petExperience: string;
    reason: string;
  };
}) {
  const { data, error } = await supabase
    .from('adoptions')
    .insert({
      user_id: adoptionData.userId,
      pet_id: adoptionData.petId,
      application_data: adoptionData.applicationData,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
