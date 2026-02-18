import React, { useState } from 'react';
import { Brain, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThoughtStream = () => {
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thoughts, setThoughts] = useState([]);
  const [finalAnswer, setFinalAnswer] = useState('');

  const runLiveReasoning = async () => {
    setIsThinking(true);
    setThoughts([]);
    setFinalAnswer('');

    try {
      const res = await fetch('http://localhost:3006/api/reason', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      // Stream the thoughts locally for visual effect
      for (let i = 0; i < data.steps.length; i++) {
        setThoughts(prev => [...prev, { id: i, label: `Step ${i+1}`, detail: data.steps[i] }]);
        await new Promise(r => setTimeout(r, 1000));
      }

      setFinalAnswer(data.answer);
    } catch (err) {
      setFinalAnswer("Error connecting to the brain. Make sure the server is running with a valid API key.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center gap-3 mb-12 border-b border-slate-800 pb-6">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ThoughtStream <span className="text-indigo-500 italic">Live</span></h1>
            <p className="text-slate-400 text-sm italic">Visualizing real-time LLM reasoning.</p>
          </div>
        </header>

        <div className="relative mb-12">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runLiveReasoning()}
            placeholder="Ask anything (e.g. NVDA strategy, Android vs iOS)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xl"
          />
          <button 
            onClick={runLiveReasoning}
            disabled={!prompt || isThinking}
            className="absolute right-3 top-3 p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-all"
          >
            {isThinking ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
          </button>
        </div>

        <div className="space-y-4 mb-12">
          <AnimatePresence>
            {thoughts.map((thought, idx) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${idx === thoughts.length - 1 && isThinking ? 'bg-indigo-500 animate-pulse' : 'bg-indigo-900'}`} />
                  {idx !== 4 && <div className="w-0.5 h-12 bg-slate-800" />}
                </div>
                <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 flex-1 backdrop-blur-sm">
                  <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">{thought.label}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{thought.detail}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {finalAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold tracking-wider uppercase text-sm">Synthesis Complete</span>
            </div>
            <p className="text-xl text-slate-100 leading-relaxed font-medium">
              {finalAnswer}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThoughtStream;
