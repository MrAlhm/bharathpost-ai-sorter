
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import ResultCard from './components/ResultCard';
import SortingHistory from './components/SortingHistory';
import { analyzeEnvelope } from './services/geminiService';
import { SortingResult, ProcessingState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    error: null,
    result: null
  });

  const [history, setHistory] = useState<SortingResult[]>([]);

  const handleImageCaptured = useCallback(async (base64: string) => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      const result = await analyzeEnvelope(base64);
      result.imageUrl = base64;
      
      setState({
        isProcessing: false,
        error: null,
        result
      });
      
      setHistory(prev => [result, ...prev].slice(0, 10));
    } catch (error: any) {
      console.error("Extraction failed:", error);
      setState({
        isProcessing: false,
        error: error.message || "Failed to process image. Please try again.",
        result: null
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Sorting Terminal</h2>
          <p className="text-slate-500 mt-1">Real-time address recognition and PIN validation system.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-8">
            <Scanner 
              onImageCaptured={handleImageCaptured} 
              isProcessing={state.isProcessing} 
            />

            {state.error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center space-x-3">
                <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                <p className="text-red-700 font-medium text-sm">{state.error}</p>
              </div>
            )}

            {state.result && <ResultCard result={state.result} />}
          </div>

          {/* Sidebar / History Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600/50">
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Today's Volume</div>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600/50">
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Avg. Accuracy</div>
                </div>
              </div>
            </div>

            <SortingHistory history={history} />

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-2 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Postal Guidelines
              </h4>
              <ul className="text-xs text-orange-700 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Ensure the PIN code is written clearly at the end of the address.</li>
                <li>Avoid overlapping stamps with the address text.</li>
                <li>Multiple PINs? The AI prioritizes the lowest line on the envelope.</li>
                <li>Handwriting should be bold for best results.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} BharatPost Intelligence Hub. Powered by Gemini 3 Flash.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
