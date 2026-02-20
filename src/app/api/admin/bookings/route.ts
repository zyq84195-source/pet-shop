import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  
  if (!adminSecret || !authHeader) {
    return false;
  }
  
  const token = authHeader.replace('Bearer ', '');
  return token === adminSecret;
}

// GET /api/admin/bookings - Get all bookings
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  
  if (!supabase) {
    return NextResponse.json([]);
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = supabase
      .from('bookings')
      .select('*, users(name, email), services(name, name_zh)')
      .order('date', { ascending: true });
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// PATCH /api/admin/bookings - Update booking status
export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const { bookingId, status } = await request.json();
    
    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status, 
      } as never)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
