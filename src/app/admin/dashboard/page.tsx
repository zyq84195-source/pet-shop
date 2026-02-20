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
  ArrowDownRight
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
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
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
      color: 'bg-blue-500',
      change: '+12%',
      positive: true,
    },
    {
      title: '总订单',
      titleEn: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      change: '+8%',
      positive: true,
    },
    {
      title: '总预约',
      titleEn: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+15%',
      positive: true,
    },
    {
      title: '总收入',
      titleEn: 'Total Revenue',
      value: `¥${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+23%',
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
        <p className="text-gray-500">Dashboard Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-gray-400 text-xs">{stat.titleEn}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-800">待处理订单</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
          <p className="text-sm text-orange-600 mt-1">Pending Orders</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">待确认预约</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.pendingBookings}</p>
          <p className="text-sm text-blue-600 mt-1">Pending Bookings</p>
        </div>
      </div>

      {/* Recent Orders & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">最近订单</h2>
                <p className="text-sm text-gray-500">Recent Orders</p>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y">
            {stats.recentOrders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                暂无订单数据
              </div>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-gray-500">
                        {order.users?.name || '未知用户'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">¥{order.total_amount}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${statusColors[order.status]}`}>
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
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">最近预约</h2>
                <p className="text-sm text-gray-500">Recent Bookings</p>
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y">
            {stats.recentBookings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                暂无预约数据
              </div>
            ) : (
              stats.recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{booking.pet_name} ({booking.pet_type})</p>
                      <p className="text-sm text-gray-500">
                        {booking.users?.name || '未知用户'} · {booking.booking_date} {booking.booking_time}
                      </p>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${statusColors[booking.status]}`}>
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
