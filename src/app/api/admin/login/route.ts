import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    // 如果没有配置环境变量，使用默认密码
    const validPassword = adminSecret || 'petshop2024';

    if (password === validPassword) {
      return NextResponse.json({ 
        success: true, 
        token: validPassword,
        message: 'Login successful' 
      });
    }

    return NextResponse.json({ 
      error: '密码错误，请重试' 
    }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: '登录失败，请重试' }, { status: 500 });
  }
}
