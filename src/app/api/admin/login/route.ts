import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ 
        error: '请输入密码' 
      }, { status: 400 });
    }

    // 默认密码列表（始终有效）
    const defaultPasswords = ['petshop2024', 'pet-shop-admin-2024-secret'];
    
    // 环境变量中配置的密码
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    
    // 检查密码是否匹配
    const isValidDefault = defaultPasswords.includes(password);
    const isValidEnv = adminSecret && password === adminSecret;
    
    if (isValidDefault || isValidEnv) {
      return NextResponse.json({ 
        success: true, 
        token: password,
        message: 'Login successful' 
      });
    }

    return NextResponse.json({ 
      error: '密码错误',
      debug: {
        hasEnvKey: !!adminSecret,
        inputLength: password?.length || 0
      }
    }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: '登录失败，请重试' }, { status: 500 });
  }
}
