import { useState, useEffect } from 'react';
import api from '../services/api';
import SubscriptionList from '../components/SubscriptionList';
import SubscriptionForm from '../components/SubscriptionForm';
import SpendingChart from '../components/SpendingChart';
import { Plus, Wallet, PieChart as PieChartIcon, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({ totalMonthly: 0, categoryStats: {} });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subsRes, statsRes] = await Promise.all([
        api.get('/subscriptions'),
        api.get('/subscriptions/stats')
      ]);
      setSubscriptions(subsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingSub) {
        await api.put(`/subscriptions/${editingSub._id}`, formData);
      } else {
        await api.post('/subscriptions', formData);
      }
      setIsModalOpen(false);
      setEditingSub(null);
      fetchData();
    } catch (error) {
      console.error('Failed to save subscription', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await api.delete(`/subscriptions/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete subscription', error);
      }
    }
  };

  const openEditModal = (sub) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  if (loading && subscriptions.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Diet Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and optimize your recurring expenses.</p>
        </div>
        <button 
          onClick={() => { setEditingSub(null); setIsModalOpen(true); }}
          className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          <span>Add Subscription</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-xl text-primary">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Monthly Spending</p>
            <h3 className="text-2xl font-bold text-slate-900">${stats.totalMonthly.toFixed(2)}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-xl text-secondary">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Active Services</p>
            <h3 className="text-2xl font-bold text-slate-900">{subscriptions.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
            <PieChartIcon size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Top Category</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {Object.keys(stats.categoryStats).sort((a, b) => stats.categoryStats[b] - stats.categoryStats[a])[0] || 'None'}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Subscription List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Subscriptions</h2>
          <SubscriptionList 
            subscriptions={subscriptions} 
            onEdit={openEditModal} 
            onDelete={handleDelete} 
          />
        </div>

        {/* Right: Charts & Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Spending Breakdown</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <SpendingChart data={stats.categoryStats} />
          </div>
        </div>
      </div>

      {/* Subscription Form Modal */}
      <SubscriptionForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddOrUpdate}
        initialData={editingSub}
      />
    </div>
  );
};

export default Dashboard;
