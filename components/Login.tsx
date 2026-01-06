
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { GraduationCap, ShieldCheck, ArrowRight, Sparkles, User as UserIcon } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const mockUser: User = {
      id: role === UserRole.TEACHER ? 'T-' + Math.floor(Math.random() * 1000) : 'S-' + Math.floor(Math.random() * 1000),
      name: name,
      role: role,
      email: name.toLowerCase().replace(/\s/g, '') + '@tb-edu.vn',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}-${role}`
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">Tb</div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Smart Edu</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">Chào mừng bạn!</h2>
          <p className="text-slate-500 mb-8">Nhập thông tin để truy cập hệ sinh thái</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Họ và tên của bạn</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  required
                  type="text"
                  placeholder="VD: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole(UserRole.TEACHER)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  role === UserRole.TEACHER ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <ShieldCheck size={24} className={role === UserRole.TEACHER ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="text-xs font-bold">Giáo viên</span>
              </button>

              <button
                type="button"
                onClick={() => setRole(UserRole.STUDENT)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  role === UserRole.STUDENT ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <GraduationCap size={24} className={role === UserRole.STUDENT ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="text-xs font-bold">Học sinh</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Vào ứng dụng <ArrowRight size={20} />
            </button>
          </form>
        </div>

        <div className="hidden md:block relative bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-white">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                <Sparkles size={14} /> Tb v2.5 Smart Tech
              </div>
              <h3 className="text-4xl font-bold leading-tight">Biến dữ liệu thành <br/> thành tựu học tập</h3>
              <p className="text-indigo-100 text-lg leading-relaxed">Dành riêng cho những người dẫn đầu trong giáo dục hiện đại.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
