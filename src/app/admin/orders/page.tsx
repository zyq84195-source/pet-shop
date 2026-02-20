'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  shipping_address: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  users: { name: string; email: string } | null;
  items: Array<{ productId: string; quantity: number; price: number }>;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  pending: '待处理',
  confirmed: '已确认',
  shipped: '已发货',
  delivered: '已完成',
  cancelled: '已取消',
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchOrders(token);
  }, [router, statusFilter]);

  const fetchOrders = async (token: string) => {
    setLoading(true);
    try {
      const url = statusFilter !== 'all' 
        ? `/api/admin/orders?status=${statusFilter}` 
        : '/api/admin/orders';
      
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
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.users?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
        <p className="text-gray-500">Orders Management</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索订单号、用户名或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部状态</option>
              <option value="pending">待处理</option>
              <option value="confirmed">已确认</option>
              <option value="shipped">已发货</option>
              <option value="delivered">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            暂无订单数据
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">订单号</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">用户</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">金额</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">创建时间</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{order.order_number}</td>
                    <td className="px-6 py-4">
                      <div>{order.users?.name || '未知'}</div>
                      <div className="text-sm text-gray-500">{order.users?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">¥{order.total_amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[order.status]}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="查看详情"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(order.id, 'confirmed')}
                              className="p-2 hover:bg-blue-50 rounded-lg"
                              title="确认订单"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => updateStatus(order.id, 'cancelled')}
                              className="p-2 hover:bg-red-50 rounded-lg"
                              title="取消订单"
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(order.id, 'shipped')}
                            className="p-2 hover:bg-purple-50 rounded-lg"
                            title="标记发货"
                          >
                            <Truck className="w-4 h-4 text-purple-600" />
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button
                            onClick={() => updateStatus(order.id, 'delivered')}
                            className="p-2 hover:bg-green-50 rounded-lg"
                            title="确认送达"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">订单详情</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">订单号</p>
                  <p className="font-medium">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">状态</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${statusColors[selectedOrder.status]}`}>
                    {statusLabels[selectedOrder.status]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">用户</p>
                  <p className="font-medium">{selectedOrder.users?.name || '未知'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">邮箱</p>
                  <p className="font-medium">{selectedOrder.users?.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">电话</p>
                  <p className="font-medium">{selectedOrder.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">创建时间</p>
                  <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">收货地址</p>
                <p className="bg-gray-50 p-3 rounded-lg">{selectedOrder.shipping_address || '-'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">订单商品</p>
                <div className="bg-gray-50 rounded-lg divide-y">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-3 flex justify-between">
                      <span>商品 {item.productId}</span>
                      <span>x{item.quantity}</span>
                      <span>¥{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">总计</span>
                  <span className="text-xl font-bold text-indigo-600">
                    ¥{selectedOrder.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">备注</p>
                  <p className="bg-yellow-50 p-3 rounded-lg text-sm">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
