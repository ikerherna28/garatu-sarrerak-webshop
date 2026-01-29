
import React, { useState } from 'react';
import { getVenueInfo } from '../geminiService';

interface GeminiVenueInfoProps {
  venueName: string;
}

const GeminiVenueInfo: React.FC<GeminiVenueInfoProps> = ({ venueName }) => {
  const [info, setInfo] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const data = await getVenueInfo(venueName);
      setInfo(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className={`size-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 ${loading ? 'animate-pulse' : ''}`}>
            <span className={`material-symbols-outlined text-primary ${loading ? 'animate-spin' : ''}`}>
              {loading ? 'progress_activity' : 'auto_awesome'}
            </span>
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white">IA Gida</h4>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Gemini AI Laguntzaile Digitala</p>
          </div>
        </div>
        
        {!info && !loading && (
          <button 
            onClick={fetchInfo}
            className="bg-primary/10 hover:bg-primary border border-primary/30 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-white"
          >
            Lortu Infoa
          </button>
        )}
      </div>

      {loading && (
        <div className="space-y-4 py-4 animate-pulse">
          <div className="h-3 bg-white/5 rounded-full w-full"></div>
          <div className="h-3 bg-white/5 rounded-full w-5/6"></div>
          <div className="h-3 bg-white/5 rounded-full w-4/6"></div>
        </div>
      )}

      {info && (
        <div className="animate-fade-in space-y-8">
          <div className="prose prose-invert prose-xs max-w-none text-white/80">
            {info.text.split('\n').map((line, i) => {
              if (line.includes(':')) {
                const [title, content] = line.split(':');
                return (
                  <div key={i} className="mb-4">
                    <p className="text-primary font-black uppercase text-[9px] tracking-widest mb-1">{title.replace(/\*/g, '')}:</p>
                    <p className="text-sm font-medium leading-relaxed">{content}</p>
                  </div>
                );
              }
              return line.trim() ? <p key={i} className="text-sm mb-2 font-medium">{line}</p> : null;
            })}
          </div>
          
          {info.sources.length > 0 && (
            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
              {info.sources.slice(0, 2).map((source, idx) => (
                <a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-bold text-white/60 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-xs">link</span> {source.title.slice(0, 20)}...
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiVenueInfo;
