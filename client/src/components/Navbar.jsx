import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
          <Activity size={24} />
          <span>Subscription Diet</span>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-6 mr-4">
                <Link to="/dashboard" className="text-slate-600 hover:text-primary font-medium transition-colors">Dashboard</Link>
                <Link to="/subscriptions" className="text-slate-600 hover:text-primary font-medium transition-colors">Subscriptions</Link>
              </div>
              <span className="text-slate-400 hidden lg:inline">|</span>
              <span className="text-slate-600 hidden sm:inline font-medium">Hello, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-slate-500 hover:text-red-500 transition-colors font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-primary">Login</Link>
              <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
