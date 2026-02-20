'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  Settings,
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
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!mounted) {
    return null;
  }

  if (pathname === '/admin/login') {
    return children;
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
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'text-white/40'}`}>{item.labelEn}</div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-8 bg-white/50 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
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
              <p className="text-sm text-slate-500">
                {navItems.find(item => item.href === pathname)?.labelEn || 'Admin Dashboard'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl transition"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-md">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-700">Admin</p>
                  <p className="text-xs text-slate-400">管理员</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 transition">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">设置</span>
                  </Link>
                  <hr className="my-2 border-slate-100" />
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

        {/* Page content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
