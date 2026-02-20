import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Helper to check if URL is valid
function isValidSupabaseUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Client-side Supabase client
export const supabase: SupabaseClient | null = isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side Supabase client with service role
export const createServerClient = (): SupabaseClient | null => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isValidSupabaseUrl(supabaseUrl) || !serviceRoleKey) {
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// User functions
export async function getUser(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data;
}

export async function createUser(userData: {
  email: string;
  name: string;
  phone?: string;
}) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  return data;
}

// Order functions
export async function createOrder(orderData: {
  userId: string;
  items: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  shippingAddress: string;
  phone?: string;
  notes?: string;
}) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId,
      items: orderData.items,
      total_amount: orderData.totalAmount,
      shipping_address: orderData.shippingAddress,
      phone: orderData.phone,
      notes: orderData.notes,
      status: 'pending',
    })
    .select()
    .single();
  if (error) {
    console.error('Error creating order:', error);
    return null;
  }
  return data;
}

export async function getOrders(userId?: string) {
  if (!supabase) return [];
  let query = supabase.from('orders').select('*, users(name, email)');
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();
  if (error) {
    console.error('Error updating order:', error);
    return null;
  }
  return data;
}

// Booking functions
export async function createBooking(bookingData: {
  userId: string;
  serviceId: string;
  petName: string;
  petType: string;
  date: string;
  time: string;
  notes?: string;
}) {
  if (!supabase) return null;
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
    } as never)
    .select()
    .single();
  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }
  return data;
}

export async function getBookings(userId?: string) {
  if (!supabase) return [];
  let query = supabase.from('bookings').select('*, users(name, email)');
  if (userId) {
    query = query.eq('user_id', userId);
  }
  const { data, error } = await query.order('booking_date', { ascending: true });
  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
  return data;
}

export async function updateBookingStatus(bookingId: string, status: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', bookingId)
    .select()
    .single();
  if (error) {
    console.error('Error updating booking:', error);
    return null;
  }
  return data;
}

// Adoption functions
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
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('adoptions')
    .insert({
      user_id: adoptionData.userId,
      pet_id: adoptionData.petId,
      applicant_name: adoptionData.applicationData.name,
      applicant_email: adoptionData.applicationData.email,
      applicant_phone: adoptionData.applicationData.phone,
      applicant_address: adoptionData.applicationData.address,
      pet_experience: adoptionData.applicationData.petExperience,
      reason: adoptionData.applicationData.reason,
      status: 'pending',
    })
    .select()
    .single();
  if (error) {
    console.error('Error creating adoption:', error);
    return null;
  }
  return data;
}

export async function getAdoptions() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('adoptions')
    .select('*, users(name, email)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching adoptions:', error);
    return [];
  }
  return data;
}

export async function updateAdoptionStatus(adoptionId: string, status: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('adoptions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', adoptionId)
    .select()
    .single();
  if (error) {
    console.error('Error updating adoption:', error);
    return null;
  }
  return data;
}

// Admin functions
export async function getDashboardStats() {
  if (!supabase) {
    return {
      totalUsers: 0,
      totalOrders: 0,
      totalBookings: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      pendingBookings: 0,
    };
  }

  const [usersCount, ordersCount, bookingsCount, ordersSum, pendingOrders, pendingBookings] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total_amount').eq('status', 'completed'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  const totalRevenue = ordersSum.data?.reduce((sum: number, order: { total_amount: number }) => sum + order.total_amount, 0) || 0;

  return {
    totalUsers: usersCount.count || 0,
    totalOrders: ordersCount.count || 0,
    totalBookings: bookingsCount.count || 0,
    totalRevenue,
    pendingOrders: pendingOrders.count || 0,
    pendingBookings: pendingBookings.count || 0,
  };
}

export async function getAllUsers() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data;
}
