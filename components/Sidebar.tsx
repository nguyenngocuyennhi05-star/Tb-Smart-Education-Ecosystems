
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  BarChart2, 
  Settings, 
  UserCircle, 
  MessageSquare, 
  LogOut, 
  Sparkles, 
  Database, 
  ShieldCheck,
  Zap,
  Library,
  Sun,
  Moon
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user, darkMode, toggleDarkMode, onLogout }) => {
  const teacherMenu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Trung tâm Quản trị' },
    { id: 'quizzes', icon: FileText, label: 'Hệ thống Soạn đề AI' },
    { id: 'analytics', icon: Database, label: 'Cơ sở dữ liệu trường' },
    { id: 'courses', icon: Library, label: 'Quản lý khóa học' },
    { id: 'assistant', icon: ShieldCheck, label: 'Bảo mật & Trợ lý' },
  ];

  const studentMenu = [
    { id: 'dashboard', icon: Zap, label: 'Góc học tập' },
    { id: 'courses', icon: BookOpen, label: 'Bài học Video' },
    { id: 'analytics', icon: BarChart2, label: 'Năng lực cá nhân' },
    { id: 'assistant', icon: MessageSquare, label: 'Gia sư AI 24/7' },
  ];

  const menuItems = user.role === UserRole.TEACHER ? teacherMenu : studentMenu;

  return (
    <div className="w-64 bg-white dark:bg-slate-900 h-screen border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 overflow-y-auto transition-colors">
      <div className="p-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20">
            <span className="text-white font-black text-2xl">Tb</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Smart Edu</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ecosystem v2</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] font-bold text-slate-400 px-4 mb-4 uppercase tracking-[0.2em]">
          {user.role === UserRole.TEACHER ? 'Quản trị hệ thống' : 'Trình học tập'}
        </p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40 translate-x-1'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Giao diện</span>
           <button 
             onClick={toggleDarkMode}
             className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-amber-400"
           >
             {darkMode ? <Sun size={14} /> : <Moon size={14} />}
           </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] p-4 border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-900 dark:text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2.5 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
          >
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
