import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = ['Entertainment', 'Utilities', 'Software', 'Education', 'Health', 'Food', 'Finance', 'Other'];

const SubscriptionForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    price: '',
    category: 'Entertainment',
    nextBillingDate: new Date().toISOString().split('T')[0],
    autoRenew: true,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        nextBillingDate: initialData.nextBillingDate.split('T')[0],
      });
    } else {
      setFormData({
        serviceName: '',
        price: '',
        category: 'Entertainment',
        nextBillingDate: new Date().toISOString().split('T')[0],
        autoRenew: true,
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? 'Edit Subscription' : 'Add Subscription'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Name</label>
            <input 
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. Netflix, Spotify"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
              <input 
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Next Billing Date</label>
              <input 
                type="date"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.nextBillingDate}
                onChange={(e) => setFormData({ ...formData, nextBillingDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox"
                id="autoRenew"
                className="w-4 h-4 text-primary border-slate-300 rounded"
                checked={formData.autoRenew}
                onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
              />
              <label htmlFor="autoRenew" className="text-sm font-medium text-slate-700">Auto-renew</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox"
                id="isActive"
                className="w-4 h-4 text-primary border-slate-300 rounded"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Is Active</label>
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
