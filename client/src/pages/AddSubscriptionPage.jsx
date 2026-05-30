import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Save, PlusCircle, Check, X } from 'lucide-react';

const CATEGORIES = ['엔터테인먼트', '공과금', '소프트웨어', '교육', '건강', '음식', '금융', '기타'];

const AddSubscriptionPage = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    price: '',
    category: '엔터테인먼트',
    nextBillingDate: new Date().toISOString().split('T')[0],
    autoRenew: true,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const fetchSubscription = async () => {
        try {
          setFetching(true);
          const { data } = await api.get(`/subscriptions`);
          const subscription = data.find(s => s._id === id);
          if (subscription) {
            setFormData({
              ...subscription,
              nextBillingDate: subscription.nextBillingDate.split('T')[0],
            });
          } else {
            setError('구독 정보를 찾을 수 없습니다.');
          }
        } catch (err) {
          setError('구독 상세 정보를 가져오는 데 실패했습니다.');
        } finally {
          setFetching(false);
        }
      };
      fetchSubscription();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (isEdit) {
        await api.put(`/subscriptions/${id}`, payload);
      } else {
        await api.post('/subscriptions', payload);
      }
      navigate('/subscriptions');
    } catch (err) {
      setError(err.response?.data?.message || '구독 정보를 저장하는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>뒤로가기</span>
        </button>
        <h1 className="text-2xl font-bold text-slate-900">
          {isEdit ? '구독 수정하기' : '새 구독 추가하기'}
        </h1>
        <div className="w-20"></div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 flex items-center gap-2">
          <X size={18} />
          {error}
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">서비스 이름</label>
              <input 
                type="text"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all"
                placeholder="예: 넷플릭스, 스포티파이, 쿠팡 와우 등"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">월 결제 금액 (원)</label>
              <input 
                type="number"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">카테고리</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">다음 결제일</label>
              <input 
                type="date"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all"
                value={formData.nextBillingDate}
                onChange={(e) => setFormData({ ...formData, nextBillingDate: e.target.value })}
              />
            </div>

            <div className="flex flex-col justify-end space-y-4">
              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <input 
                  type="checkbox"
                  id="autoRenew"
                  className="w-5 h-5 text-primary border-slate-300 rounded-lg cursor-pointer"
                  checked={formData.autoRenew}
                  onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
                />
                <label htmlFor="autoRenew" className="text-sm font-semibold text-slate-700 cursor-pointer">자동 갱신 활성화</label>
              </div>
              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <input 
                  type="checkbox"
                  id="isActive"
                  className="w-5 h-5 text-primary border-slate-300 rounded-lg cursor-pointer"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 cursor-pointer">구독 중인 서비스</label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button 
              type="button"
              onClick={() => navigate('/subscriptions')}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              취소
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isEdit ? <Save size={20} /> : <PlusCircle size={20} />}
                  <span>{isEdit ? '구독 정보 업데이트' : '구독 추가하기'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionPage;
