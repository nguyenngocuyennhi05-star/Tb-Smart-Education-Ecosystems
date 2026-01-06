
import React from 'react';
// Import 'Users' from lucide-react to fix reference error
import { Trophy, Target, Clock, Zap, Star, ChevronRight, PlayCircle, BookCheck, BrainCircuit, Flame, Medal, Users } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { User } from '../types';

const skillData = [
  { subject: 'Toán', A: 85 },
  { subject: 'Lý', A: 70 },
  { subject: 'Hóa', A: 90 },
  { subject: 'Anh', A: 95 },
  { subject: 'Văn', A: 65 },
];

const leaderboard = [
  { rank: 1, name: 'Nguyễn Thùy Linh', class: '12A1', score: 4850, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh' },
  { rank: 2, name: 'Trần Minh Quân', class: '12A1', score: 4720, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quan' },
  { rank: 3, name: 'Phạm Hồng Anh', class: '12A2', score: 4500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anh' },
  { rank: 4, name: 'Lê Hoàng Long', class: '11B3', score: 4280, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Long' },
  { rank: 5, name: 'Bùi Gia Bảo', class: '10C1', score: 4100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bao' },
];

const quizTopics = [
  { id: 'math', name: 'Toán học 12', desc: 'Đạo hàm & Tích phân', icon: '📐', color: 'from-blue-500 to-indigo-600' },
  { id: 'physics', name: 'Vật lý 12', desc: 'Sóng ánh sáng & Lượng tử', icon: '⚛️', color: 'from-purple-500 to-pink-600' },
  { id: 'english', name: 'Tiếng Anh', desc: 'IELTS Academic Vocab', icon: '🇬🇧', color: 'from-emerald-500 to-teal-600' },
  { id: 'it', name: 'Tin học', desc: 'Cấu trúc dữ liệu AI', icon: '💻', color: 'from-slate-700 to-slate-900' },
  { id: 'history', name: 'Lịch sử VN', desc: 'Giai đoạn 1945 - 1975', icon: '🇻🇳', color: 'from-red-500 to-orange-600' },
];

interface Props {
  user: User;
  onStartQuiz: (topic: string) => void;
}

const StudentDashboard: React.FC<Props> = ({ user, onStartQuiz }) => {
  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            Góc học tập của <span className="text-indigo-600">{user.name}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 transition-colors">
            <Flame size={18} className="text-orange-500 animate-bounce" /> 
            Chuỗi 5 ngày học tập chăm chỉ! Đừng dừng lại nhé.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-slate-900 p-3 pr-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shadow-inner">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thành tựu</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">2,750 XP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Learning Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Featured Quizzes */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold flex items-center gap-3 dark:text-white">
                <BrainCircuit className="text-indigo-600" /> Đấu trường AI
              </h3>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                5 Thử thách đang chờ
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizTopics.map((topic, index) => (
                <div 
                  key={topic.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="bg-white dark:bg-slate-900 p-7 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                  onClick={() => onStartQuiz(topic.name)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      {topic.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Độ khó</span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`h-1 w-4 rounded-full ${i <= 2 ? 'bg-indigo-500' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">{topic.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">{topic.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-bold">5 CÂU</span>
                       <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-bold">+100 XP</span>
                    </div>
                    <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                       Bắt đầu <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group border border-transparent dark:border-indigo-900/50">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-50"></div>
                <div className="absolute -right-12 -top-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <Medal size={200} />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="p-4 bg-white/10 rounded-2xl w-fit mb-6">
                    <BookCheck size={32} className="text-indigo-400" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Đề xuất cá nhân</h4>
                  <p className="text-sm text-white/60 mb-8 leading-relaxed">
                    Hệ thống AI vừa nhận thấy bạn cần luyện tập thêm phần <b>Tích Phân</b>.
                  </p>
                  <button className="mt-auto w-full py-4 bg-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                    Nhận đề thi riêng <PlayCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl"><Target size={20} /></div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">Mục tiêu ngày</h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">50% Hoàn thành</span>
               </div>
               <div className="space-y-4">
                 {[
                   { task: 'Luyện 20 từ IELTS', done: true },
                   { task: 'Làm 1 bài thi Toán', done: false },
                   { task: 'Xem video Vật lý', done: false }
                 ].map((t, i) => (
                   <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                     t.done ? 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800 opacity-60' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 cursor-pointer'
                   }`}>
                     <div className="flex items-center gap-4">
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                         t.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200 dark:border-slate-700'
                       }`}>
                         {t.done && <Star size={12} className="text-white" fill="white" />}
                       </div>
                       <span className={`text-sm font-bold ${t.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>{t.task}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold dark:text-white">Phân tích năng lực</h3>
                 <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                   <Zap size={18} />
                 </div>
              </div>
              <div className="w-full h-[220px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#f1f5f9" className="dark:opacity-10" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                    <Radar 
                      name="Năng lực" 
                      dataKey="A" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fill="#6366f1" 
                      fillOpacity={0.15} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-400 font-medium italic text-center px-4 leading-relaxed">
                "Năng lực Ngoại ngữ đang dẫn đầu, hãy bứt phá hơn ở các môn tự nhiên."
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Column: Leaderboard with Fixed Footer */}
        <div className="relative">
          <div className="sticky top-28 space-y-0 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
            {/* Leaderboard Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
                <Trophy className="text-amber-500" /> Bảng vàng
              </h3>
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                <Users size={12} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">1.2k+</span>
              </div>
            </div>
            
            <div className="px-8 mb-6">
              <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full">
                <div className="h-full w-1/3 bg-indigo-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Leaderboard List */}
            <div className="px-4 pb-4 space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {leaderboard.map((student, idx) => (
                <div 
                  key={student.rank} 
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className={`flex items-center justify-between p-4 rounded-[2rem] transition-all animate-in slide-in-from-right-4 ${
                    student.rank === 1 
                      ? 'bg-gradient-to-r from-amber-50 to-amber-100/30 dark:from-amber-900/10 dark:to-amber-900/5 border border-amber-200/50 dark:border-amber-900/30' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-4 border-white dark:border-slate-900 shadow-md ${
                        student.rank === 1 ? 'bg-amber-500 text-white' : 
                        student.rank === 2 ? 'bg-slate-400 text-white' : 
                        student.rank === 3 ? 'bg-orange-400 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}>
                        {student.rank}
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-tight truncate">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end text-indigo-600 dark:text-indigo-400">
                       <Zap size={14} fill="currentColor" />
                       <p className="text-sm font-black">{student.score.toLocaleString()}</p>
                    </div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">XP</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-50 dark:border-slate-800 text-center">
              <button className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mx-auto hover:gap-3 transition-all uppercase tracking-widest">
                XEM TOÀN BỘ <ChevronRight size={14} />
              </button>
            </div>

            {/* Rank Up Card - Fixed at bottom of this container */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-950 p-7 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                 <Zap size={100} />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-1">Thăng hạng!</h4>
                <p className="text-[11px] text-indigo-100/80 mb-6 leading-relaxed">
                  Bạn đang đứng thứ <b>142</b>. Chỉ cần <b>240 XP</b> nữa để lọt vào Top 100!
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs shadow-xl hover:shadow-white/10 transition-all transform active:scale-95 uppercase tracking-widest">
                  CHINH PHỤC NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
