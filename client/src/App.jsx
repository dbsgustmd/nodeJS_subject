import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SubscriptionListPage from './pages/SubscriptionListPage';
import AddSubscriptionPage from './pages/AddSubscriptionPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscriptions" 
                element={
                  <ProtectedRoute>
                    <SubscriptionListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscriptions/add" 
                element={
                  <ProtectedRoute>
                    <AddSubscriptionPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscriptions/edit/:id" 
                element={
                  <ProtectedRoute>
                    <AddSubscriptionPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/signup" element={<Navigate to="/register" />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Subscription Diet. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
