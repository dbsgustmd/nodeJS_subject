import { Trash2, Edit3, Calendar, Tag, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { calculateDDay } from '../utils/dateUtils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge tailwind classes safely
const cn = (...inputs) => twMerge(clsx(inputs));

const SubscriptionList = ({ subscriptions, onEdit, onDelete }) => {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">등록된 구독 서비스가 없습니다. 첫 번째 구독을 추가해 보세요!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {subscriptions.map((sub) => {
        const dday = calculateDDay(sub.nextBillingDate);
        
        // Translate D-Day text
        let ddayText = dday.text;
        if (ddayText === 'Today') ddayText = '오늘';
        else if (ddayText === 'Expired') ddayText = '만료됨';

        return (
          <div 
            key={sub._id}
            className={cn(
              "bg-white p-6 rounded-3xl border flex flex-col justify-between hover:shadow-xl hover:shadow-slate-100 transition-all duration-300",
              !sub.isActive ? 'opacity-60 border-slate-100 bg-slate-50/50' : 'border-slate-100 shadow-sm'
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg bg-primary shadow-lg shadow-blue-100"
                >
                  {sub.serviceName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-lg">{sub.serviceName}</h3>
                    {sub.autoRenew ? (
                      <CheckCircle2 size={16} className="text-green-500" title="자동 갱신 활성화" />
                    ) : (
                      <XCircle size={16} className="text-slate-400" title="자동 갱신 비활성화" />
                    )}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 space-x-3 mt-0.5">
                    <span className="flex items-center"><Tag size={14} className="mr-1 text-slate-400" /> {sub.category}</span>
                    <span className="flex items-center font-medium">
                      <Calendar size={14} className="mr-1 text-slate-400" /> 
                      {new Date(sub.nextBillingDate).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* D-Day Badge */}
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-black uppercase tracking-tight flex items-center gap-1",
                dday.variant === 'today' && "bg-orange-100 text-orange-600 border border-orange-200",
                dday.variant === 'upcoming' && "bg-blue-50 text-primary border border-blue-100",
                dday.variant === 'expired' && "bg-red-50 text-red-500 border border-red-100"
              )}>
                <Clock size={12} />
                {ddayText}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-5 border-t border-slate-50">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-slate-900">{sub.price.toLocaleString()}</span>
                <span className="text-slate-600 text-sm ml-1 font-bold">원</span>
                <span className="text-slate-400 text-xs ml-1">/월</span>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => onEdit(sub)}
                  className="p-2.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-xl transition-all"
                  title="수정"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(sub._id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="삭제"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionList;
