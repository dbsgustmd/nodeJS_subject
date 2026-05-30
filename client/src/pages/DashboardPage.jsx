import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SpendingChart from '../components/SpendingChart';
import { Wallet, PieChart as PieChartIcon, TrendingDown, ArrowRight, Activity } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalMonthly: 0, categoryStats: {} });
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsRes, statsRes] = await Promise.all([
          api.get('/subscriptions'),
          api.get('/subscriptions/stats')
        ]);
        setSubscriptionCount(subsRes.data.length);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const topCategory = Object.keys(stats.categoryStats).sort((a, b) => stats.categoryStats[b] - stats.categoryStats[a])[0] || '없음';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="text-primary" />
            대시보드
          </h1>
          <p className="text-slate-500 mt-1">구독 다이어트 진행 상황을 확인하세요.</p>
        </div>
        <Link 
          to="/subscriptions" 
          className="inline-flex items-center justify-center space-x-2 bg-white text-slate-700 px-5 py-2.5 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
        >
          <span>모든 구독 보기</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-blue-50 flex items-center space-x-4">
          <div className="bg-blue-50 p-4 rounded-2xl text-primary">
            <Wallet size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">월 지출액</p>
            <h3 className="text-3xl font-black text-slate-900">{stats.totalMonthly.toLocaleString()}원</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-green-50 flex items-center space-x-4">
          <div className="bg-green-50 p-4 rounded-2xl text-secondary">
            <TrendingDown size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">이용 중인 서비스</p>
            <h3 className="text-3xl font-black text-slate-900">{subscriptionCount}개</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-purple-50 flex items-center space-x-4">
          <div className="bg-purple-50 p-4 rounded-2xl text-purple-600">
            <PieChartIcon size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">주요 카테고리</p>
            <h3 className="text-3xl font-black text-slate-900">{topCategory}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">지출 분포</h2>
          <SpendingChart data={stats.categoryStats} />
        </div>

        <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">지출 최적화 팁</h2>
            <p className="text-blue-100 opacity-90">
              정기적으로 구독 서비스를 검토하면 연간 평균 20만원 이상을 절약할 수 있습니다. 최근 30일 동안 이용하지 않은 서비스부터 정리해 보세요.
            </p>
          </div>
          <div className="mt-8">
            <Link 
              to="/subscriptions/add" 
              className="inline-block bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              새 구독 추가하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
