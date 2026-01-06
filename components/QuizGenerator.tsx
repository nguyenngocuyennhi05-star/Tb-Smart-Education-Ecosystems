
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { Sparkles, CheckCircle, ArrowRight, Loader2, Save } from 'lucide-react';

const QuizGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [step, setStep] = useState(0);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const result = await geminiService.generateQuiz(topic);
    setQuizzes(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Quiz Generator</h2>
            <p className="text-slate-500 text-sm">Automate test creation with educational AI</p>
          </div>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter topic (e.g., Photosynthesis, Calculus II)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            Generate
          </button>
        </div>
      </div>

      {quizzes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Generated Quiz: {topic}</h3>
            <button className="flex items-center gap-2 text-indigo-600 font-medium hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all">
              <Save size={18} />
              Save to Library
            </button>
          </div>
          
          <div className="grid gap-4">
            {quizzes.map((q, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all shadow-sm">
                <p className="font-semibold text-slate-900 mb-4">{idx + 1}. {q.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => (
                    <div 
                      key={oIdx}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        oIdx === q.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {oIdx === q.correctAnswer && <CheckCircle size={16} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
