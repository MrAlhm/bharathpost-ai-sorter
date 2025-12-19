
import React from 'react';
import { SortingResult } from '../types';

interface SortingHistoryProps {
  history: SortingResult[];
}

const SortingHistory: React.FC<SortingHistoryProps> = ({ history }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Recent Sorting</h3>
        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
          {history.length} items
        </span>
      </div>
      <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-8 text-center text-slate-400 italic text-sm">
            No history yet
          </div>
        ) : (
          history.map((item, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50 transition cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-700 font-mono text-lg">{item.pin_code}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate w-full">
                {item.extracted_text}
              </p>
            </div>
          ))
        )}
      </div>
      <button className="w-full py-3 text-xs font-bold text-orange-600 hover:bg-orange-50 transition border-t border-slate-100 uppercase tracking-widest">
        View All Records
      </button>
    </div>
  );
};

export default SortingHistory;
