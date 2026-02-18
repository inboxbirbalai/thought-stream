import React, { useState } from 'react';
import { Brain, Sparkles, ArrowRight, Layers, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThoughtStream = () => {
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thoughts, setThoughts] = useState([]);
  const [finalAnswer, setFinalAnswer] = useState('');

  const simulateReasoning = async () => {
    setIsThinking(true);
    setThoughts([]);
    setFinalAnswer('');

    // Generate dynamic steps based on the user prompt
    const steps = [
      { id: 1, label: 'Parsing intent...', detail: `Deconstructing semantic requirements for: "${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}"` },
      { id: 2, label: 'Retrieving context...', detail: 'Scanning internal memory vectors and live trend data from X.' },
      { id: 3, label: 'Generating hypothesis...', detail: 'Synthesizing a probabilistic response based on the detected intent.' },
      { id: 4, label: 'Self-correcting...', detail: 'Checking for logical inconsistencies and refining the output tone.' },
      { id: 5, label: 'Finalizing response...', detail: 'Formatting the crystallized answer for human readability.' },
    ];

    for (const step of steps) {
      setThoughts(prev => [...prev, step]);
      await new Promise(r => setTimeout(r, 1200));
    }

    setFinalAnswer(`Based on my 'Chain of Thought' reasoning regarding "${prompt}", I've analyzed the viral mechanics and current user sentiment. The synthesis confirms that transparency and step-by-step deconstruction are the primary drivers of engagement in early 2026 AI interfaces.`);
    setIsThinking(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-3 mb-12 border-b border-slate-800 pb-6">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ThoughtStream</h1>
            <p className="text-slate-400 text-sm italic">Visualizing the latent space of reasoning.</p>
          </div>
        </header>

        {/* Input Area */}
        <div className="relative mb-12">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything to see my reasoning..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xl"
          />
          <button 
            onClick={simulateReasoning}
            disabled={!prompt || isThinking}
            className="absolute right-3 top-3 p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thought visualization */}
        <div className="space-y-4">
          <AnimatePresence>
            {thoughts.map((thought, idx) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${idx === thoughts.length - 1 ? 'bg-indigo-500 animate-pulse' : 'bg-slate-700'}`} />
                  {idx !== 4 && <div className="w-0.5 h-12 bg-slate-800" />}
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex-1">
                  <h3 className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-1">{thought.label}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{thought.detail}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Final Answer */}
        {finalAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">Synthesis Complete</span>
            </div>
            <p className="text-lg text-slate-200 leading-relaxed italic underline decoration-indigo-500/30">
              "{finalAnswer}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThoughtStream;
