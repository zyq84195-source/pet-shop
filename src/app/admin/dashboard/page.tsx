'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  ShoppingCart, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalBookings: number;
  totalRevenue: number;
  pendingOrders: number;
  pendingBookings: number;
  recentOrders: Array<{
    id: string;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    users: { name: string; email: string } | null;
  }>;
  recentBookings: Array<{
    id: string;
    pet_name: string;
    pet_type: string;
    booking_date: string;
    booking_time: string;
    status: string;
    users: { name: string; email: string } | null;
  }>;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const statusLabels: Record<string, string> = {
  pending: '待处理',
  confirmed: '已确认',
  shipped: '已发货',
  delivered: '已完成',
  cancelled: '已取消',
  completed: '已完成',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchStats(token);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      
      if (response.ok) {
        setStats(data);
      } else {
        setError(data.error || '获取数据失败');
      }
    } catch {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">加载数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: '总用户',
      titleEn: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      change: '+12%',
      positive: true,
    },
    {
      title: '总订单',
      titleEn: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: 'from-emerald-500 to-green-500',
      bgLight: 'bg-emerald-50',
      change: '+8%',
      positive: true,
    },
    {
      title: '总预约',
      titleEn: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      gradient: 'from-purple-500 to-violet-500',
      bgLight: 'bg-purple-50',
      change: '+15%',
      positive: true,
    },
    {
      title: '总收入',
      titleEn: 'Total Revenue',
      value: `¥${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50',
      change: '+23%',
      positive: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={stat.title} 
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-slate-600 font-medium mt-1">{stat.title}</p>
              <p className="text-slate-400 text-sm">{stat.titleEn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-semibold text-amber-800">待处理订单</span>
          </div>
          <p className="text-4xl font-bold text-amber-600 mb-1">{stats.pendingOrders}</p>
          <p className="text-sm text-amber-600/70">Pending Orders</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-semibold text-blue-800">待确认预约</span>
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-1">{stats.pendingBookings}</p>
          <p className="text-sm text-blue-600/70">Pending Bookings</p>
        </div>
      </div>

      {/* Recent Orders & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">最近订单</h2>
                <p className="text-sm text-slate-500">Recent Orders</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Activity className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>暂无订单数据</p>
              </div>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="p-5 hover:bg-slate-50/50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {order.order_number?.slice(-2) || 'N/A'}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">{order.order_number || 'ORD-000'}</p>
                        <p className="text-sm text-slate-400">{order.users?.name || '未知用户'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">¥{order.total_amount?.toFixed(2) || '0.00'}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">最近预约</h2>
                <p className="text-sm text-slate-500">Recent Bookings</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentBookings.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>暂无预约数据</p>
              </div>
            ) : (
              stats.recentBookings.map((booking) => (
                <div key={booking.id} className="p-5 hover:bg-slate-50/50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {booking.pet_name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">{booking.pet_name} <span className="text-slate-400 font-normal">({booking.pet_type})</span></p>
                        <p className="text-sm text-slate-400">{booking.users?.name || '未知用户'} · {booking.booking_date}</p>
                      </div>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[booking.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {statusLabels[booking.status] || booking.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
