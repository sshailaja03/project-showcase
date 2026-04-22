import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { Terminal } from 'lucide-react';
import FloatingTechElements from '../components/FloatingTechElements';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden z-10">
      <FloatingTechElements />
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-space-card border border-space-border mb-4">
          <Terminal size={32} className="text-space-glow" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">Dev<span className="text-space-glow">Link</span></h1>
        <p className="text-gray-400 max-w-md">The zero-gravity portfolio platform for developers to showcase their universe of code.</p>
      </div>

      <div className="w-full max-w-md h-[450px]">
        <TiltCard>
          <div className="flex flex-col h-full transform-gpu translate-z-10" style={{ transform: 'translateZ(30px)' }}>
            <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Welcome Back' : 'Join DevLink'}</h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-space-dark border border-space-border rounded-lg px-4 py-2 focus:outline-none focus:border-space-glow transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-space-dark border border-space-border rounded-lg px-4 py-2 focus:outline-none focus:border-space-glow transition-colors"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-space-glow hover:bg-space-glow/80 text-white font-bold py-3 rounded-lg transition-colors shadow-glow"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-space-glow hover:underline font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};

export default Home;
