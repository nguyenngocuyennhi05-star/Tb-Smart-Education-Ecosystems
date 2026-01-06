
import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Target, 
  Zap,
  Lightbulb,
  ShieldAlert
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { User } from '../types';

interface Props {
  user: User;
}

const weakSubjectsData = [
  { name: 'Ngữ văn', value: 35, color: '#f43f5e' },
  { name: 'Vật lý', value: 25, color: '#f59e0b' },
  { name: 'Khác (Khá/Giỏi)', value: 40, color: '#10b981' },
];

const skillRadarData = [
  { subject: 'Toán', A: 85 },
  { subject: 'Lý', A: 62 },
  { subject: 'Hóa', A: 78 },
  { subject: 'Anh', A: 92 },
  { subject: 'Văn', A: 45 },
];

const StudentAnalytics: React.FC<Props> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Hồ sơ Năng lực AI</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Báo cáo chi tiết dựa trên 124 bài kiểm tra gần nhất.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-600 px-5 py-3 rounded-2xl text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30">
          <Zap size={18} fill="currentColor" />
          <span className="font-black text-sm uppercase tracking-widest italic">Hạng: Diamond I</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Weakness Analysis */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <ShieldAlert className="text-red-500" /> Vùng cần chú ý
            </h3>
            
            <div className="h-[250px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={weakSubjectsData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {weakSubjectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {weakSubjectsData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                  </div>
                  <span className={`text-xs font-black ${item.value > 30 ? 'text-red-500' : 'text-slate-500'}`}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/10 p-8 rounded-[3rem] border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-200 dark:shadow-none">
                 <Lightbulb size={24} />
               </div>
               <h4 className="font-black text-amber-800 dark:text-amber-400 uppercase tracking-tighter">Lời động viên AI</h4>
            </div>
            <p className="text-amber-900 dark:text-amber-200/80 font-medium leading-relaxed italic">
              "Chào {user.name}, môn Ngữ văn có thể đang làm khó bạn một chút, nhưng hãy nhớ rằng khả năng tư duy logic của bạn ở môn Anh văn là một lợi thế cực lớn để cấu trúc lại các luận điểm văn chương. Đừng bỏ cuộc, Tb tin bạn sẽ bứt phá!"
            </p>
          </div>
        </div>

        {/* Right Column: AI Action Plan */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Sparkles className="text-indigo-600" /> Lộ trình khắc phục (AI Generated)
              </h3>
              <div className="text-[10px] font-black bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
                Hiệu quả dự kiến: +1.5 GPA
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  subject: 'Ngữ văn', 
                  issue: 'Thiếu chiều sâu phân tích cảm xúc', 
                  plan: ['Xem 3 video giảng bài Chiếc thuyền ngoài xa', 'Luyện tập viết 5 đoạn văn nghị luận xã hội mỗi tuần', 'Sử dụng Tb Mindmap để hệ thống hóa ý chính'],
                  status: 'priority',
                  icon: AlertTriangle
                },
                { 
                  subject: 'Vật lý', 
                  issue: 'Hay sai sót ở phần bài tập Lượng tử', 
                  plan: ['Tập trung làm đề trắc nghiệm chủ đề Ánh sáng', 'Tham gia lớp bồi dưỡng buổi tối cùng GV AI', 'Xem lại các hằng số vật lý quan trọng'],
                  status: 'action',
                  icon: Target
                }
              ].map((item, idx) => (
                <div key={idx} className={`p-8 rounded-[2.5rem] border transition-all ${
                  item.status === 'priority' 
                    ? 'border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10' 
                    : 'border-amber-100 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-900/10'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <item.icon className={item.status === 'priority' ? 'text-red-500' : 'text-amber-500'} size={24} />
                    <h4 className="text-xl font-black">{item.subject}</h4>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vấn đề cốt lõi</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.issue}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cách khắc phục</p>
                    {item.plan.map((p, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={14} className="mt-1 flex-shrink-0 text-emerald-500" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-900 dark:bg-indigo-950 rounded-[2.5rem] text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-white/10 rounded-2xl"><Target size={24} className="text-indigo-400" /></div>
                 <div>
                   <h5 className="font-bold">Bắt đầu khóa ôn luyện ngay?</h5>
                   <p className="text-xs text-white/50">Hệ thống đã tự động soạn bộ đề 10 câu cho môn Văn.</p>
                 </div>
              </div>
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                 Thực hiện <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 h-[300px]">
              <h4 className="font-bold mb-4 text-center">So sánh năng lực toàn diện</h4>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                  <PolarGrid stroke="#f1f5f9" className="dark:opacity-10" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
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
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center gap-4 p-5 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <TrendingUp className="text-indigo-600" />
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tỉ lệ tiến bộ tháng qua</p>
                  <p className="text-2xl font-black text-indigo-600">+18.5%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <CheckCircle2 className="text-emerald-600" />
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Độ tập trung trung bình</p>
                  <p className="text-2xl font-black text-emerald-600">84/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
