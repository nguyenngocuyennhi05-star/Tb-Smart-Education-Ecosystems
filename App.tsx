
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import QuizGenerator from './components/QuizGenerator';
import SmartAssistant from './components/SmartAssistant';
import Courses from './components/Courses';
import Login from './components/Login';
import AdminDatabase from './components/AdminDatabase';
import StudentAnalytics from './components/StudentAnalytics';
import QuizPlayer from './components/QuizPlayer';
import { User, UserRole } from './types';
import { Search, Bell, Menu, Sparkles, Settings as SettingsIcon, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (activeQuiz) {
    return (
      <QuizPlayer 
        topic={activeQuiz} 
        userName={user.name} 
        onClose={() => setActiveQuiz(null)} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user.role === UserRole.TEACHER 
          ? <TeacherDashboard user={user} /> 
          : <StudentDashboard user={user} onStartQuiz={setActiveQuiz} />;
      case 'quizzes':
        return user.role === UserRole.TEACHER 
          ? <QuizGenerator /> 
          : <StudentDashboard user={user} onStartQuiz={setActiveQuiz} />;
      case 'analytics':
        return user.role === UserRole.TEACHER 
          ? <AdminDatabase /> 
          : <StudentAnalytics user={user} />;
      case 'courses':
        return <Courses />;
      case 'assistant':
        return <SmartAssistant />;
      default:
        return user.role === UserRole.TEACHER 
          ? <TeacherDashboard user={user} /> 
          : <StudentDashboard user={user} onStartQuiz={setActiveQuiz} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {!isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(true)}
        ></div>
      )}

      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          onLogout={() => {
            setUser(null);
            setActiveTab('dashboard');
          }}
        />
      </div>

      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <header className="flex items-center justify-between mb-10 sticky top-0 py-4 bg-inherit backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="max-w-md w-full relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={user.role === UserRole.TEACHER ? "Tìm kiếm quản trị..." : "Tìm kiếm bài học..."} 
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-white dark:bg-slate-900 text-slate-500 dark:text-amber-400 hover:shadow-md rounded-2xl transition-all border border-slate-200 dark:border-slate-800"
              title="Chế độ bảo vệ mắt"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                user.role === UserRole.TEACHER ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
              }`}>
                {user.role === UserRole.TEACHER ? 'Admin Faculty' : 'Premium Student'}
              </span>
            </div>
            
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <img src={user.avatar} alt="pfp" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm" />
            </div>
          </div>
        </header>

        <div className="animate-in fade-in zoom-in-95 duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
