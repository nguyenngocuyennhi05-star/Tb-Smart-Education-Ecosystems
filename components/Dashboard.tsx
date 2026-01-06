
import React from 'react';
import { 
  Users, 
  GraduationCap, 
  FileCheck, 
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', active: 400, scores: 85 },
  { name: 'Tue', active: 300, scores: 88 },
  { name: 'Wed', active: 200, scores: 82 },
  { name: 'Thu', active: 278, scores: 90 },
  { name: 'Fri', active: 189, scores: 95 },
  { name: 'Sat', active: 239, scores: 87 },
  { name: 'Sun', active: 349, scores: 89 },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f97316'];

const StatsCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      <div className="flex items-center gap-1 mt-2 text-emerald-600">
        <TrendingUp size={14} />
        <span className="text-xs font-semibold">{trend}</span>
      </div>
    </div>
    <div className={`p-3 rounded-2xl ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, Dr. Sarah</h2>
          <p className="text-slate-500">Here is what is happening in your ecosystem today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
            Create Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          icon={Users} 
          label="Active Students" 
          value="1,284" 
          trend="+12% from last month" 
          color="bg-indigo-100 text-indigo-600"
        />
        <StatsCard 
          icon={GraduationCap} 
          label="Average Grade" 
          value="8.4" 
          trend="+2.1% improvement" 
          color="bg-purple-100 text-purple-600"
        />
        <StatsCard 
          icon={FileCheck} 
          label="Tasks Completed" 
          value="142" 
          trend="89% completion rate" 
          color="bg-emerald-100 text-emerald-600"
        />
        <StatsCard 
          icon={Clock} 
          label="Engagement Time" 
          value="4.2h" 
          trend="+15% session length" 
          color="bg-amber-100 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Platform Engagement</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm px-3 py-1 outline-none text-slate-600">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Learning Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Bar dataKey="scores" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
                <Tooltip cursor={{fill: '#f8fafc'}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                Mathematics
              </span>
              <span className="font-semibold">82%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                Physics
              </span>
              <span className="font-semibold">74%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                Biology
              </span>
              <span className="font-semibold">91%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-lg">Recent Course Activities</h3>
          <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Quantum Physics Intro', prof: 'Dr. Nils Bohr', students: 45, progress: 65, status: 'Active' },
                { name: 'Modern Architecture', prof: 'L. Wright', students: 28, progress: 82, status: 'Active' },
                { name: 'Organic Chemistry II', prof: 'Dr. Marie Curie', students: 56, progress: 41, status: 'Scheduled' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-slate-500">{row.prof}</td>
                  <td className="px-6 py-4 text-slate-500">{row.students}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: `${row.progress}%`}}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
