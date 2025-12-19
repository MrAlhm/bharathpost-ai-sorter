
import React, { useRef, useState } from 'react';

interface ScannerProps {
  onImageCaptured: (base64: string) => void;
  isProcessing: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ onImageCaptured, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageCaptured(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearScanner = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <i className="fas fa-camera text-orange-500 mr-2"></i>
          Scan Envelope
        </h2>

        {!preview ? (
          <div 
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            className={`
              border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer
              hover:border-orange-400 hover:bg-orange-50 transition-all group
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <i className="fas fa-cloud-upload-alt text-slate-400 text-2xl group-hover:text-orange-500"></i>
            </div>
            <p className="text-slate-600 font-medium">Upload Image or Take Photo</p>
            <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 10MB</p>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden group">
            <img src={preview} alt="Envelope Preview" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
              <button 
                onClick={clearScanner}
                className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition shadow-lg"
              >
                Change Image
              </button>
            </div>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          capture="environment"
          className="hidden" 
        />
        
        {isProcessing && (
          <div className="mt-6 space-y-3">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
            </div>
            <p className="text-center text-sm text-slate-500 animate-pulse">
              Gemini AI is analyzing handwriting and PIN code...
            </p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default Scanner;
