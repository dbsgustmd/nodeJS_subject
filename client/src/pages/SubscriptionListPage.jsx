import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import SubscriptionList from '../components/SubscriptionList';
import { Plus, Search, Filter } from 'lucide-react';
import { getKoreanCategory } from '../utils/categoryMapping';

const SubscriptionListPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('전체');
  
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/subscriptions');
      // Map categories to Korean
      const mappedData = data.map(sub => ({
        ...sub,
        category: getKoreanCategory(sub.category)
      }));
      setSubscriptions(mappedData);
    } catch (error) {
      console.error('Failed to fetch subscriptions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('이 구독 서비스를 삭제하시겠습니까?')) {
      try {
        await api.delete(`/subscriptions/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete subscription', error);
      }
    }
  };

  const handleEdit = (sub) => {
    navigate(`/subscriptions/edit/${sub._id}`);
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '전체' || sub.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['전체', ...new Set(subscriptions.map(sub => sub.category))];

  if (loading && subscriptions.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">구독 목록</h1>
          <p className="text-slate-500 mt-1">이용 중이거나 중지된 서비스를 관리하세요.</p>
        </div>
        <Link 
          to="/subscriptions/add"
          className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          <span>구독 추가하기</span>
        </Link>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            placeholder="서비스 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              className="pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white appearance-none transition-all cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <SubscriptionList 
        subscriptions={filteredSubscriptions} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default SubscriptionListPage;
