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

// GET /api/admin/adoptions - Get all adoption applications
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
      .from('adoptions')
      .select('*, users(name, email), pets(name, species, breed)')
      .order('created_at', { ascending: false });
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    return NextResponse.json({ error: 'Failed to fetch adoptions' }, { status: 500 });
  }
}

// PATCH /api/admin/adoptions - Update adoption status
export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const { adoptionId, status, petId } = await request.json();
    
    // Update adoption status
    const { data: adoption, error: adoptionError } = await supabase
      .from('adoptions')
      .update({ 
        status, 
      } as never)
      .eq('id', adoptionId)
      .select()
      .single();

    if (adoptionError) {
      return NextResponse.json({ error: adoptionError.message }, { status: 500 });
    }

    // If approved, update pet status to adopted
    if (status === 'approved' && petId) {
      await supabase
        .from('pets')
        .update({ status: 'adopted' } as never)
        .eq('id', petId);
    }

    return NextResponse.json(adoption);
  } catch (error) {
    console.error('Error updating adoption:', error);
    return NextResponse.json({ error: 'Failed to update adoption' }, { status: 500 });
  }
}
