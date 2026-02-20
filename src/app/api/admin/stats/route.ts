import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Verify admin token
function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  
  if (!adminSecret || !authHeader) {
    return false;
  }
  
  const token = authHeader.replace('Bearer ', '');
  return token === adminSecret;
}

// GET /api/admin/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  
  if (!supabase) {
    // Return mock data if Supabase not configured
    return NextResponse.json({
      totalUsers: 0,
      totalOrders: 0,
      totalBookings: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      pendingBookings: 0,
      recentOrders: [],
      recentBookings: [],
    });
  }

  try {
    const [
      usersCount,
      ordersCount,
      bookingsCount,
      ordersSum,
      pendingOrders,
      pendingBookings,
      recentOrders,
      recentBookings,
    ] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('total_amount').eq('status', 'delivered'),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('orders').select('id, order_number, total_amount, status, created_at, users(name, email)').order('created_at', { ascending: false }).limit(5),
      supabase.from('bookings').select('id, pet_name, pet_type, booking_date, booking_time, status, users(name, email)').order('created_at', { ascending: false }).limit(5),
    ]);

    const totalRevenue = ordersSum.data?.reduce((sum: number, order: { total_amount: number }) => sum + order.total_amount, 0) || 0;

    return NextResponse.json({
      totalUsers: usersCount.count || 0,
      totalOrders: ordersCount.count || 0,
      totalBookings: bookingsCount.count || 0,
      totalRevenue,
      pendingOrders: pendingOrders.count || 0,
      pendingBookings: pendingBookings.count || 0,
      recentOrders: recentOrders.data || [],
      recentBookings: recentBookings.data || [],
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
