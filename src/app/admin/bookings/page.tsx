'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Eye, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface Booking {
  id: string;
  pet_name: string;
  pet_type: string;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: string;
  created_at: string;
  users: { name: string; email: string } | null;
  services: { name: string; name_zh: string | null } | null;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  pending: '待确认',
  confirmed: '已确认',
  completed: '已完成',
  cancelled: '已取消',
};

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchBookings(token);
  }, [router, statusFilter]);

  const fetchBookings = async (token: string) => {
    setLoading(true);
    try {
      const url = statusFilter !== 'all' 
        ? `/api/admin/bookings?status=${statusFilter}` 
        : '/api/admin/bookings';
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId: string, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ));
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.pet_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.users?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">预约管理</h1>
        <p className="text-gray-500">Bookings Management</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索宠物名、类型或用户..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">全部状态</option>
              <option value="pending">待确认</option>
              <option value="confirmed">已确认</option>
              <option value="completed">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Grid */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          暂无预约数据
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{booking.pet_name}</h3>
                  <p className="text-sm text-gray-500">{booking.pet_type}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${statusColors[booking.status]}`}>
                  {statusLabels[booking.status]}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(booking.booking_date)} {booking.booking_time}</span>
                </div>
                <div className="text-gray-600">
                  <span className="text-gray-400">服务：</span>
                  {booking.services?.name_zh || booking.services?.name || '未知服务'}
                </div>
                <div className="text-gray-600">
                  <span className="text-gray-400">用户：</span>
                  {booking.users?.name || '未知'}
                </div>
              </div>

              {booking.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  {booking.notes}
                </div>
              )}

              {booking.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    确认
                  </button>
                  <button
                    onClick={() => updateStatus(booking.id, 'cancelled')}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  >
                    取消
                  </button>
                </div>
              )}
              {booking.status === 'confirmed' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateStatus(booking.id, 'completed')}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    完成服务
                  </button>
                  <button
                    onClick={() => updateStatus(booking.id, 'cancelled')}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
