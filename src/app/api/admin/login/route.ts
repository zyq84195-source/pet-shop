import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    if (!adminSecret) {
      return NextResponse.json({ error: 'Admin login not configured' }, { status: 500 });
    }

    if (password === adminSecret) {
      return NextResponse.json({ 
        success: true, 
        token: adminSecret,
        message: 'Login successful' 
      });
    }

    return NextResponse.json({ 
      error: 'Invalid password' 
    }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
