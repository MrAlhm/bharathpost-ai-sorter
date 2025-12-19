
import React from 'react';
import { SortingResult } from '../types';

interface ResultCardProps {
  result: SortingResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center">
            <i className="fas fa-file-invoice text-blue-500 mr-2"></i>
            Extraction Results
          </h2>
          <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getConfidenceColor(result.confidence)}`}>
            {result.confidence} Confidence
          </span>
        </div>

        <div className="space-y-6">
          <section>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Detected PIN Code</label>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-4xl font-mono font-bold text-slate-800 tracking-tighter">
                {result.pin_code || '------'}
              </span>
              <div className="flex space-x-2">
                <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition">
                  <i className="fas fa-copy"></i>
                </button>
                <div className="h-8 w-[1px] bg-slate-200"></div>
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  Indian PIN
                </div>
              </div>
            </div>
          </section>

          <section>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Extracted Address Text</label>
            <div className="bg-white border border-slate-200 rounded-xl p-4 min-h-[120px] shadow-inner">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed font-medium italic">
                {result.extracted_text || 'No text detected.'}
              </p>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition shadow-md shadow-orange-200 active:scale-95">
              <i className="fas fa-print"></i>
              <span>Print Label</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition active:scale-95">
              <i className="fas fa-share-alt"></i>
              <span>Forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
