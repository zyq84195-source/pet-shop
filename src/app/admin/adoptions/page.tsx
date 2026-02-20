'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, CheckCircle, XCircle, Heart } from 'lucide-react';

interface Adoption {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_address: string;
  pet_experience: string | null;
  reason: string | null;
  status: string;
  created_at: string;
  users: { name: string; email: string } | null;
  pets: { name: string; species: string; breed: string | null } | null;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

const statusLabels: Record<string, string> = {
  pending: '待审核',
  approved: '已通过',
  rejected: '已拒绝',
  completed: '已完成',
};

export default function AdminAdoptionsPage() {
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAdoption, setSelectedAdoption] = useState<Adoption | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchAdoptions(token);
  }, [router, statusFilter]);

  const fetchAdoptions = async (token: string) => {
    setLoading(true);
    try {
      const url = statusFilter !== 'all' 
        ? `/api/admin/adoptions?status=${statusFilter}` 
        : '/api/admin/adoptions';
      
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
        setAdoptions(data);
      }
    } catch (error) {
      console.error('Error fetching adoptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (adoptionId: string, newStatus: string, petId?: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch('/api/admin/adoptions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adoptionId, status: newStatus, petId }),
      });

      if (response.ok) {
        setAdoptions(adoptions.map(adoption => 
          adoption.id === adoptionId ? { ...adoption, status: newStatus } : adoption
        ));
        if (selectedAdoption?.id === adoptionId) {
          setSelectedAdoption({ ...selectedAdoption, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating adoption:', error);
    }
  };

  const filteredAdoptions = adoptions.filter(adoption => 
    adoption.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adoption.pets?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adoption.applicant_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">领养申请</h1>
        <p className="text-gray-500">Adoption Applications</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索申请人或宠物..."
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
              <option value="pending">待审核</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
              <option value="completed">已完成</option>
            </select>
          </div>
        </div>
      </div>

      {/* Adoptions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : filteredAdoptions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            暂无领养申请
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">宠物</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">申请人</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">联系方式</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">申请时间</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAdoptions.map((adoption) => (
                  <tr key={adoption.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <div>
                          <p className="font-medium">{adoption.pets?.name || '未知'}</p>
                          <p className="text-sm text-gray-500">
                            {adoption.pets?.species} {adoption.pets?.breed && `· ${adoption.pets.breed}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{adoption.applicant_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{adoption.applicant_email}</p>
                      <p className="text-sm text-gray-500">{adoption.applicant_phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusColors[adoption.status]}`}>
                        {statusLabels[adoption.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(adoption.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedAdoption(adoption)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        >
                          详情
                        </button>
                        {adoption.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(adoption.id, 'approved')}
                              className="p-2 hover:bg-green-50 rounded"
                              title="通过"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => updateStatus(adoption.id, 'rejected')}
                              className="p-2 hover:bg-red-50 rounded"
                              title="拒绝"
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </button>
                          </>
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

      {/* Detail Modal */}
      {selectedAdoption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">领养申请详情</h2>
                <button
                  onClick={() => setSelectedAdoption(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold text-pink-800">宠物信息</span>
                </div>
                <p className="font-medium">{selectedAdoption.pets?.name}</p>
                <p className="text-sm text-pink-600">
                  {selectedAdoption.pets?.species} {selectedAdoption.pets?.breed && `· ${selectedAdoption.pets.breed}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">申请人</p>
                  <p className="font-medium">{selectedAdoption.applicant_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">状态</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${statusColors[selectedAdoption.status]}`}>
                    {statusLabels[selectedAdoption.status]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">邮箱</p>
                  <p className="font-medium">{selectedAdoption.applicant_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">电话</p>
                  <p className="font-medium">{selectedAdoption.applicant_phone}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">地址</p>
                <p className="bg-gray-50 p-3 rounded-lg">{selectedAdoption.applicant_address}</p>
              </div>

              {selectedAdoption.pet_experience && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">养宠经验</p>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedAdoption.pet_experience}</p>
                </div>
              )}

              {selectedAdoption.reason && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">领养理由</p>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedAdoption.reason}</p>
                </div>
              )}

              {selectedAdoption.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => updateStatus(selectedAdoption.id, 'approved')}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                  >
                    通过申请
                  </button>
                  <button
                    onClick={() => updateStatus(selectedAdoption.id, 'rejected')}
                    className="flex-1 py-3 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200"
                  >
                    拒绝申请
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
