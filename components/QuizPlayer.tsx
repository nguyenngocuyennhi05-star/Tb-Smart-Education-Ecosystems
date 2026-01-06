
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { geminiService } from '../services/geminiService';
// Added BrainCircuit to the lucide-react imports
import { CheckCircle2, XCircle, Timer, Award, ArrowRight, Loader2, Home, Sparkles, Trophy, Zap, BrainCircuit } from 'lucide-react';

interface QuizPlayerProps {
  topic: string;
  userName: string;
  onClose: () => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ topic, userName, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await geminiService.generateQuiz(topic, 5);
        setQuestions(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [topic]);

  useEffect(() => {
    if (loading || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, showResult]);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-slate-50 animate-in fade-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl animate-pulse opacity-50"></div>
          <Loader2 className="animate-spin text-indigo-600 relative z-10" size={64} />
        </div>
        <div className="text-center animate-bounce">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tb AI đang soạn đề...</h3>
          <p className="text-slate-500 font-medium">Chủ đề: {topic}</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const isGreat = percentage >= 80;

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 overflow-hidden relative">
        {/* Celebration Particles */}
        {isGreat && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {[...Array(20)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute animate-bounce opacity-30"
                 style={{ 
                   left: `${Math.random() * 100}%`, 
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 2}s`,
                   color: ['#6366f1', '#f59e0b', '#10b981'][i % 3]
                 }}
               >
                 <Sparkles size={Math.random() * 24 + 12} />
               </div>
             ))}
          </div>
        )}

        <div className="max-w-xl w-full bg-white rounded-[4rem] p-12 shadow-2xl text-center border border-slate-100 relative z-10 animate-in zoom-in-95 fade-in duration-700">
          <div className={`w-32 h-32 ${isGreat ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform`}>
            {isGreat ? <Trophy size={64} /> : <Award size={64} />}
          </div>
          
          <h2 className="text-4xl font-black text-slate-900 mb-2">
            {isGreat ? 'Xuất sắc!' : 'Hoàn thành!'}
          </h2>
          <p className="text-slate-500 mb-10 font-medium">
            Chúc mừng <span className="text-indigo-600 font-bold">{userName}</span>, bạn đã thu thập thêm được rất nhiều kinh nghiệm.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap size={16} className="text-indigo-600" fill="currentColor" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kinh nghiệm</p>
              </div>
              <p className="text-3xl font-black text-indigo-600">+{score * 20} XP</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-2 mb-1 text-emerald-600">
                <CheckCircle2 size={16} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chính xác</p>
              </div>
              <p className="text-3xl font-black text-emerald-600">{percentage}%</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all transform active:scale-95"
          >
            Quay lại Góc học tập <Home size={22} />
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center animate-in fade-in duration-500">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onClose} 
            className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-2xl shadow-sm border border-slate-100 transition-all hover:rotate-90"
          >
            <XCircle size={24} />
          </button>
          
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <Timer size={20} className={`animate-pulse ${timeLeft < 60 ? 'text-red-500' : 'text-amber-500'}`} />
            <span className={`font-mono font-black text-xl ${timeLeft < 60 ? 'text-red-500' : 'text-slate-700'}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100">
            CÂU {currentIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Progress Bar with Pulse */}
        <div className="w-full bg-slate-200 h-3 rounded-full mb-12 overflow-hidden shadow-inner p-0.5">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-700 ease-out relative" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 mb-10 relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <BrainCircuit size={120} />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 leading-tight relative z-10">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 gap-5 relative z-10">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`group p-7 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between ${
                  selectedAnswer === null 
                    ? 'border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50 hover:translate-x-2' 
                    : idx === currentQ.correctAnswer 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 scale-[1.02] shadow-lg shadow-emerald-100'
                      : idx === selectedAnswer
                        ? 'border-red-500 bg-red-50 text-red-700 animate-shake'
                        : 'border-slate-100 opacity-50'
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base shadow-sm transition-colors ${
                    selectedAnswer === idx ? 'bg-white' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-indigo-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-bold text-lg">{opt}</span>
                </div>
                <div className="transform transition-transform group-hover:scale-125">
                  {selectedAnswer !== null && idx === currentQ.correctAnswer && <CheckCircle2 size={24} className="text-emerald-500" />}
                  {selectedAnswer === idx && idx !== currentQ.correctAnswer && <XCircle size={24} className="text-red-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedAnswer !== null && (
          <button 
            onClick={nextQuestion}
            className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all transform animate-in slide-in-from-bottom-4 shadow-2xl active:scale-95"
          >
            {currentIndex === questions.length - 1 ? 'XEM KẾT QUẢ' : 'CÂU HỎI TIẾP THEO'} <ArrowRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
