'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Calendar, 
  Heart,
  BarChart3,
  LogOut,
  Menu,
  X,
  PawPrint,
  Bell,
  ChevronDown
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: '仪表板', labelEn: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
  { href: '/admin/orders', label: '订单管理', labelEn: 'Orders', icon: ShoppingCart, color: 'from-green-500 to-emerald-500' },
  { href: '/admin/bookings', label: '预约管理', labelEn: 'Bookings', icon: Calendar, color: 'from-purple-500 to-violet-500' },
  { href: '/admin/adoptions', label: '领养申请', labelEn: 'Adoptions', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { href: '/admin/users', label: '用户管理', labelEn: 'Users', icon: Users, color: 'from-orange-500 to-amber-500' },
  { href: '/admin/analytics', label: '数据分析', labelEn: 'Analytics', icon: BarChart3, color: 'from-indigo-500 to-blue-500' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // 检查登录状态
    try {
      const token = localStorage.getItem('adminToken');
      setLoggedIn(!!token);
    } catch {
      setLoggedIn(false);
    }
    setChecked(true);
  }, []);

  // 跳转到登录页
  useEffect(() => {
    if (checked && !loggedIn && !isLoginPage) {
      window.location.href = '/admin/login';
    }
  }, [checked, loggedIn, isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  // 加载中
  if (!checked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // 登录页面
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 未登录
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-slate-900 to-slate-800 transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 shadow-2xl
      `}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-lg">Pet Shop</span>
              <p className="text-xs text-white/50">管理后台</p>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive ? `bg-gradient-to-r ${item.color} text-white shadow-lg` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'text-white/40'}`}>{item.labelEn}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      <div className="lg:ml-72">
        <header className="bg-white/80 backdrop-blur-lg shadow-sm h-20 flex items-center px-6 sticky top-0 z-30 border-b border-slate-200/50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-700 transition p-2 -ml-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 lg:flex-none">
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-slate-800">
                {navItems.find(item => item.href === pathname)?.label || '管理后台'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
              <Bell className="w-5 h-5" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl transition"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-md">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 w-full transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">退出登录</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
