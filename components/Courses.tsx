
import React from 'react';
import { Book, Clock, PlayCircle, Star, Users } from 'lucide-react';

const Courses: React.FC = () => {
  const courses = [
    { title: 'Toán học 12: Đạo hàm & Tích phân', instructor: 'Thầy Trần Hùng', students: 1240, rating: 4.9, progress: 65, color: 'bg-blue-500' },
    { title: 'Vật lý Nguyên tử nâng cao', instructor: 'Cô Mai Lan', students: 850, rating: 4.8, progress: 20, color: 'bg-indigo-500' },
    { title: 'Tiếng Anh: IELTS Masterclass', instructor: 'Dr. Sarah', students: 3200, rating: 5.0, progress: 90, color: 'bg-emerald-500' },
    { title: 'Lập trình Python cho Giáo dục', instructor: 'Admin Tb', students: 560, rating: 4.7, progress: 0, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Kho khóa học thông minh</h2>
          <p className="text-slate-500">Tiếp cận học liệu mọi lúc, mọi nơi</p>
        </div>
        <div className="flex gap-2">
          {['Tất cả', 'Của tôi', 'Phổ biến'].map(t => (
            <button key={t} className="px-4 py-2 text-sm font-medium rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all">{t}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {courses.map((course, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className={`h-40 ${course.color} relative flex items-center justify-center p-8`}>
              <Book className="text-white opacity-20 absolute -right-4 -bottom-4" size={100} />
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                <PlayCircle className="text-white" size={40} />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">Course</span>
                <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                  <Star size={14} fill="currentColor" /> {course.rating}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">By <span className="font-medium text-slate-700">{course.instructor}</span></p>
              
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1"><Users size={14} /> {course.students}</div>
                <div className="flex items-center gap-1"><Clock size={14} /> 12h 30m</div>
              </div>

              {course.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>PROGRESS</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: `${course.progress}%`}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
