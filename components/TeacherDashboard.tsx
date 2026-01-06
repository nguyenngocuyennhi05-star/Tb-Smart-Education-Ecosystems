
import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  ClipboardList, 
  ShieldCheck, 
  Plus, 
  AlertCircle, 
  TrendingUp, 
  Copy, 
  X, 
  Check,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User, Class } from '../types';

const chartData = [
  { name: 'Khối 10', scores: 7.8 },
  { name: 'Khối 11', scores: 8.2 },
  { name: 'Khối 12', scores: 8.5 },
];

interface Props {
  user: User;
}

const TeacherDashboard: React.FC<Props> = ({ user }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classes, setClasses] = useState<Class[]>([
    { id: '1', name: 'Toán học nâng cao 12A', subject: 'Toán học', code: 'TB-MATH12', studentCount: 45, createdAt: '2023-09-01' },
    { id: '2', name: 'Vật lý Lượng tử cơ bản', subject: 'Vật lý', code: 'TB-PHYS02', studentCount: 38, createdAt: '2023-09-10' },
  ]);
  const [newClassName, setNewClassName] = useState('');
  const [newClassSubject, setNewClassSubject] = useState('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const generateClassCode = () => {
    return 'TB-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName || !newClassSubject) return;

    const newClass: Class = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClassName,
      subject: newClassSubject,
      code: generateClassCode(),
      studentCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setClasses([newClass, ...classes]);
    setNewClassName('');
    setNewClassSubject('');
    setShowCreateModal(false);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopyStatus(code);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="space-y-10 pb-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Trung tâm Quản trị</h2>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Chào mừng <span className="text-indigo-600 font-bold">{user.name}</span>. Hệ thống đã sẵn sàng.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform active:scale-95"
          >
            <Plus size={20} /> TẠO LỚP HỌC MỚI
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Tổng học sinh', value: '1,284', color: 'bg-indigo-100 text-indigo-600', trend: '+12%' },
          { icon: GraduationCap, label: 'GPA Trung bình', value: '8.15', color: 'bg-purple-100 text-purple-600', trend: '+0.5' },
          { icon: ClipboardList, label: 'Chuyên cần', value: '96.8%', color: 'bg-emerald-100 text-emerald-600', trend: 'Ổn định' },
          { icon: ShieldCheck, label: 'AI Security', value: 'Active', color: 'bg-slate-900 text-indigo-400', trend: 'Secure' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-4 rounded-2xl ${stat.color}`}><stat.icon size={24} /></div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Classes Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="text-indigo-600" /> Danh sách lớp học hoạt động
          </h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{classes.length} LỚP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600">
                   <BookOpen size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sĩ số</p>
                  <p className="text-lg font-black text-slate-900">{cls.studentCount}</p>
                </div>
              </div>
              
              <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{cls.name}</h4>
              <p className="text-sm text-slate-500 mb-6 font-medium">{cls.subject}</p>
              
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mã lớp mời học sinh</p>
                  <p className="text-lg font-mono font-black text-indigo-600 tracking-wider">{cls.code}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(cls.code)}
                  className={`p-3 rounded-xl transition-all ${
                    copyStatus === cls.code ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-indigo-600 shadow-sm'
                  }`}
                >
                  {copyStatus === cls.code ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 italic">Tạo ngày: {cls.createdAt}</span>
                <button className="flex items-center gap-1 text-sm font-black text-slate-900 group-hover:text-indigo-600">
                   Chi tiết lớp <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Hiệu suất học tập liên khối</h3>
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
              <TrendingUp size={16} /> Tăng trưởng 4.2%
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="scores" radius={[10, 10, 0, 0]} barSize={50}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#8b5cf6', '#ec4899'][index % 3]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10"><AlertCircle size={120} /></div>
          <h3 className="text-xl font-bold mb-6">Thông báo hệ thống</h3>
          <div className="space-y-4">
            {[
              { label: 'Duyệt đề thi khối 12', time: '14:00 Today', color: 'bg-red-500' },
              { label: 'Họp hội đồng sư phạm', time: '08:30 Tomorrow', color: 'bg-amber-500' },
              { label: 'Cập nhật AI Core v3', time: 'Weekend', color: 'bg-indigo-400' },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-md hover:bg-white/15 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <p className="text-sm font-bold">{item.label}</p>
                </div>
                <p className="text-[10px] text-white/50 ml-5 uppercase font-bold tracking-widest">{item.time}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-indigo-600 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
            XEM TẤT CẢ THÔNG BÁO
          </button>
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowCreateModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 border border-slate-100">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-8">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Tạo lớp học mới</h3>
              <p className="text-slate-500 font-medium">Khởi tạo không gian học tập thông minh trong tích tắc.</p>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tên lớp học</label>
                <input 
                  autoFocus
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="VD: Lớp Toán 12A1 Nâng Cao"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Môn học</label>
                <input 
                  required
                  value={newClassSubject}
                  onChange={(e) => setNewClassSubject(e.target.value)}
                  placeholder="VD: Toán học"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-bold"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform active:scale-95"
                >
                  XÁC NHẬN TẠO LỚP
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-black tracking-tighter">Mã mời sẽ được tự động tạo bởi Tb AI Core</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
