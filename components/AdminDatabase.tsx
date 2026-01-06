
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  UserCheck, 
  UserX, 
  MoreHorizontal, 
  Users, 
  GraduationCap, 
  BookOpen,
  Briefcase,
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';

const students = [
  { id: 'S-102', name: 'Nguyễn Thùy Linh', class: '12A1', gpa: 9.2, status: 'Online', attendance: '98%' },
  { id: 'S-205', name: 'Trần Minh Quân', class: '12A1', gpa: 7.8, status: 'Offline', attendance: '92%' },
  { id: 'S-044', name: 'Phạm Hồng Anh', class: '12A2', gpa: 8.5, status: 'Online', attendance: '95%' },
  { id: 'S-312', name: 'Lê Hoàng Long', class: '11B3', gpa: 6.4, status: 'Busy', attendance: '88%' },
];

const teachers = [
  { id: 'T-001', name: 'Thầy Trần Hùng', subject: 'Toán học', exp: '15 năm', rating: 4.9, status: 'Giảng dạy' },
  { id: 'T-002', name: 'Cô Mai Lan', subject: 'Vật lý', exp: '8 năm', rating: 4.8, status: 'Giảng dạy' },
  { id: 'T-003', name: 'Thầy Nguyễn Du', subject: 'Ngữ văn', exp: '12 năm', rating: 5.0, status: 'Vắng mặt' },
  { id: 'T-004', name: 'Dr. Sarah Wilson', subject: 'Tiếng Anh', exp: '10 năm', rating: 4.9, status: 'Giảng dạy' },
];

const classes = [
  { id: 'C-12A1', name: 'Lớp 12A1', mainTeacher: 'Thầy Trần Hùng', count: 45, room: 'A102', performance: 'Xuất sắc' },
  { id: 'C-12A2', name: 'Lớp 12A2', mainTeacher: 'Cô Mai Lan', count: 42, room: 'A103', performance: 'Khá' },
  { id: 'C-11B3', name: 'Lớp 11B3', mainTeacher: 'Thầy Nguyễn Du', count: 38, room: 'B205', performance: 'Trung bình' },
  { id: 'C-10C1', name: 'Lớp 10C1', mainTeacher: 'Thầy Gia Bảo', count: 40, room: 'C301', performance: 'Khá' },
];

const AdminDatabase: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'students' | 'teachers' | 'classes'>('students');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Cơ sở dữ liệu trường</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Quản lý toàn bộ nhân sự và hạ tầng giáo dục</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm text-slate-700 dark:text-slate-300 hover:shadow-lg transition-all">
          <Download size={18} /> TẢI BÁO CÁO CSV
        </button>
      </div>

      {/* Custom Tabs */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-[1.5rem] w-fit border border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveSubTab('students')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === 'students' ? 'bg-white dark:bg-indigo-600 shadow-md text-indigo-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <GraduationCap size={18} /> Học sinh
        </button>
        <button 
          onClick={() => setActiveSubTab('teachers')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === 'teachers' ? 'bg-white dark:bg-indigo-600 shadow-md text-indigo-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Briefcase size={18} /> Giáo viên
        </button>
        <button 
          onClick={() => setActiveSubTab('classes')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === 'classes' ? 'bg-white dark:bg-indigo-600 shadow-md text-indigo-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <BookOpen size={18} /> Lớp học
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder={`Tìm kiếm ${activeSubTab === 'students' ? 'học sinh' : activeSubTab === 'teachers' ? 'giáo viên' : 'lớp học'}...`} 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white" 
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded-2xl font-bold text-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <Filter size={18} /> BỘ LỌC
          </button>
        </div>

        <div className="overflow-x-auto">
          {activeSubTab === 'students' && (
            <table className="w-full">
              <thead className="bg-slate-50/50 dark:bg-slate-800/30">
                <tr>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Học sinh</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Khối Lớp</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Điểm GPA</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Chuyên cần</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-xs">{s.id}</div>
                        <p className="font-black text-slate-900 dark:text-white">{s.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-400">{s.class}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg font-black text-xs ${s.gpa >= 8 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'}`}>{s.gpa}</span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-bold">{s.attendance}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${s.status === 'Online' ? 'bg-emerald-500' : s.status === 'Offline' ? 'bg-slate-300' : 'bg-amber-500'}`}></div>
                        <span className="text-xs font-black text-slate-600 dark:text-slate-400">{s.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-all"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSubTab === 'teachers' && (
            <table className="w-full">
              <thead className="bg-slate-50/50 dark:bg-slate-800/30">
                <tr>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Giáo viên</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Môn giảng dạy</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thâm niên</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Đánh giá</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-black text-xs">{t.id}</div>
                        <p className="font-black text-slate-900 dark:text-white">{t.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-400">{t.subject}</td>
                    <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-bold">{t.exp}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-black">{t.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-black ${t.status === 'Giảng dạy' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-all"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSubTab === 'classes' && (
            <table className="w-full">
              <thead className="bg-slate-50/50 dark:bg-slate-800/30">
                <tr>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lớp học</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">GV Chủ nhiệm</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Sĩ số</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Phòng học</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thành tích</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {classes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-5 font-black text-slate-900 dark:text-white">{c.name}</td>
                    <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-400">{c.mainTeacher}</td>
                    <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-bold">{c.count} HS</td>
                    <td className="px-6 py-5 font-bold text-indigo-600 dark:text-indigo-400">{c.room}</td>
                    <td className="px-6 py-5">
                       <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                         c.performance === 'Xuất sắc' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' :
                         c.performance === 'Khá' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'
                       }`}>
                         {c.performance}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-all"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDatabase;
