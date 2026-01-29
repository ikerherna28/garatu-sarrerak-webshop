
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GeminiVenueInfo from '../components/GeminiVenueInfo';
import { getVenueSummary } from '../geminiService';

const ARETOAK = [
  { 
    izena: 'BEC', 
    herria: 'Barakaldo', 
    irudia: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Kursaal', 
    herria: 'Donostia', 
    irudia: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'San Mames', 
    herria: 'Bilbo', 
    irudia: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Santana 27', 
    herria: 'Bilbo', 
    irudia: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Buesa Arena', 
    herria: 'Gasteiz', 
    irudia: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Kafe Antzokia', 
    herria: 'Bilbo', 
    irudia: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Dabadaba', 
    herria: 'Donostia', 
    irudia: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Zentral', 
    herria: 'Iruña', 
    irudia: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Jimmy Jazz', 
    herria: 'Gasteiz', 
    irudia: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    izena: 'Victoria Eugenia', 
    herria: 'Donostia', 
    irudia: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200' 
  }
];

const FALLBACK_VENUE = 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200';

const FeaturedVenueCard: React.FC<{ areto: typeof ARETOAK[0]; onSeeConcerts: (n: string) => void }> = ({ areto, onSeeConcerts }) => {
  const [showAI, setShowAI] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      try {
        const res = await getVenueSummary(areto.izena);
        if (isMounted) setSummary(res);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setSummaryLoading(false);
      }
    };
    fetchSummary();
    return () => { isMounted = false; };
  }, [areto.izena]);

  return (
    <div className="relative w-full rounded-[40px] overflow-hidden group mb-20 border border-white/10 hover:border-primary/50 transition-all duration-700 shadow-2xl">
      <div className="absolute inset-0">
        <img 
          src={areto.irudia} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt={areto.izena}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[500px] md:min-h-[600px] max-w-4xl">
        <div className="mb-6">
           <span className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.25em] shadow-neon animate-pulse">
             <span className="material-symbols-outlined text-sm">star</span> Gomendio Berezia
           </span>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 leading-none text-white">
          {areto.izena}
          <span className="block text-2xl md:text-3xl text-primary normal-case font-bold tracking-normal mt-2 opacity-90 not-italic font-display">
            {areto.herria}
          </span>
        </h2>

        <div className="mb-10 max-w-2xl">
           {summaryLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-white/10 rounded-full w-full"></div>
              <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
            </div>
           ) : (
             <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed border-l-4 border-primary pl-6 italic">
               "{summary || 'Euskal Herriko eszenatoki mitikoa. Ezagutu bertako historia eta giro paregabea.'}"
             </p>
           )}
        </div>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onSeeConcerts(areto.izena)}
            className="bg-white text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg"
          >
            Sarrerak Erosi <span className="material-symbols-outlined">confirmation_number</span>
          </button>
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border flex items-center gap-3 ${showAI ? 'bg-black/50 border-primary text-primary backdrop-blur-md' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
          >
            <span className="material-symbols-outlined">{showAI ? 'close' : 'smart_toy'}</span>
            {showAI ? 'Itxi Gida' : 'Aretoaren Gida (IA)'}
          </button>
        </div>

        {showAI && (
          <div className="mt-10 animate-slide-up bg-black/40 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
             <GeminiVenueInfo venueName={areto.izena} />
          </div>
        )}
      </div>
    </div>
  );
};

const VenueCard: React.FC<{ areto: typeof ARETOAK[0]; onSeeConcerts: (n: string) => void }> = ({ areto, onSeeConcerts }) => {
  const [imgSrc, setImgSrc] = useState(areto.irudia);
  const [showAI, setShowAI] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      try {
        const res = await getVenueSummary(areto.izena);
        if (isMounted) setSummary(res);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setSummaryLoading(false);
      }
    };
    fetchSummary();
    return () => { isMounted = false; };
  }, [areto.izena]);

  return (
    <div className={`group relative bg-card-dark border border-white/5 rounded-[32px] overflow-hidden transition-all duration-700 hover:border-primary/50 hover:shadow-neon flex flex-col h-full ${showAI ? 'ring-1 ring-primary/20' : ''}`}>
      <div 
        onClick={() => onSeeConcerts(areto.izena)}
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-[#111]"
      >
        <img 
          src={imgSrc} 
          onError={() => setImgSrc(FALLBACK_VENUE)}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
          alt={areto.izena} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        <div className="absolute top-6 left-6">
          <span className="bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {areto.herria}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="size-20 rounded-full bg-primary flex items-center justify-center shadow-neon scale-75 group-hover:scale-100 transition-transform duration-500">
            <span className="material-symbols-outlined text-white text-4xl">local_activity</span>
          </div>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col bg-card-dark relative">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{areto.izena}</h3>
          <div className="flex gap-2">
            <span className={`material-symbols-outlined text-primary text-xl ${summaryLoading ? 'animate-spin' : 'animate-pulse'}`}>
              auto_awesome
            </span>
          </div>
        </div>

        {/* AI Summary Section - Visible by default */}
        <div className="mb-8 min-h-[60px]">
          {summaryLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-white/5 rounded-full w-full"></div>
              <div className="h-3 bg-white/5 rounded-full w-4/6"></div>
            </div>
          ) : (
            <p className="text-white/60 text-sm font-medium italic leading-relaxed border-l-2 border-primary/30 pl-4">
              {summary || "Informazioa kargatzen... Egin klik behean xehetasunetarako."}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-auto">
          <button 
            onClick={() => onSeeConcerts(areto.izena)}
            className="flex-1 bg-white text-black px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-primary hover:text-white active:scale-95 flex items-center justify-center gap-2"
          >
            Sarrerak <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <button 
            onClick={() => setShowAI(!showAI)}
            title="Gida Osoa (IA)"
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-widest ${showAI ? 'bg-primary border-primary text-white shadow-neon' : 'bg-white/5 border-white/10 text-white/40 hover:text-primary hover:border-primary/50'}`}
          >
            <span className="material-symbols-outlined text-sm">{showAI ? 'close' : 'smart_toy'}</span>
            {showAI ? 'Itxi' : 'Gida Osoa'}
          </button>
        </div>

        {showAI && (
          <div className="mt-8 pt-8 border-t border-white/5 animate-slide-up">
            <GeminiVenueInfo venueName={areto.izena} />
          </div>
        )}
      </div>
    </div>
  );
};

const Venues: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Define Featured Venue (e.g., San Mames)
  const featuredVenueName = 'San Mames';
  const featuredVenue = ARETOAK.find(a => a.izena === featuredVenueName);

  const filtered = useMemo(() => {
    let result = ARETOAK.filter(a => a.izena.toLowerCase().includes(search.toLowerCase()) || a.herria.toLowerCase().includes(search.toLowerCase()));
    
    // If not searching, exclude the featured venue from the grid list so it doesn't appear twice
    if (!search && featuredVenue) {
      result = result.filter(a => a.izena !== featuredVenueName);
    }
    
    return result;
  }, [search, featuredVenue]);

  const handleContactClick = () => {
    const email = "Ikertolosaldealhi@gmail.com";
    const subject = encodeURIComponent("Aretoa Gehitzeko Eskaera - Garatu Sarrerak");
    const body = encodeURIComponent(`Kaixo Garatu Sarrerak taldea,

Nire aretoa zuen plataforman gehitzeko informazio gehiago jaso nahiko nuke. Hona hemen aretoaren datu batzuk:

- Aretoaren izena: 
- Herria: 
- Harremanetarako pertsona: 
- Telefonoa: 

Zuen erantzunaren zain,
Agur bero bat.`);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20">
      <header className="mb-20 text-center max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px bg-white/10 w-12"></div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Euskal Herriko Eszenatokiak</span>
            <div className="h-px bg-white/10 w-12"></div>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-black italic tracking-tighter uppercase mb-8 leading-none">Agertoki <span className="text-primary">Gidaria</span></h1>
        <p className="text-white/40 text-lg md:text-xl font-medium mb-12 italic leading-relaxed">Arakatu gure herriko areto mitikoak. Gemini IA-k lagunduko dizu planik onena antolatzen.</p>
        
        <div className="relative max-w-xl mx-auto">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-white/20">search</span>
            <input 
                type="text"
                placeholder="Bilatu aretoa edo herria..."
                className="w-full bg-white/5 border border-white/10 rounded-full h-16 pl-14 pr-6 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20 shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </header>

      {/* Featured Venue Section - Only visible when not searching */}
      {!search && featuredVenue && (
        <section className="mb-24 animate-slide-up">
           <FeaturedVenueCard 
             areto={featuredVenue}
             onSeeConcerts={(n) => navigate(`/?venue=${n}`)}
           />
        </section>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filtered.map((areto) => (
            <VenueCard 
              key={areto.izena} 
              areto={areto} 
              onSeeConcerts={(n) => navigate(`/?venue=${n}`)} 
            />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-white/2 rounded-[50px] border border-dashed border-white/5">
            <span className="material-symbols-outlined text-8xl text-white/5 mb-6">explore_off</span>
            <p className="text-2xl font-black text-white/20 uppercase tracking-widest italic">Ez dugu aretorik aurkitu bilaketa honekin</p>
            <button onClick={() => setSearch('')} className="mt-8 text-primary font-black uppercase tracking-widest hover:underline">Garbitu Bilaketa</button>
        </div>
      )}
      
      <section className="mt-40 p-10 md:p-20 rounded-[60px] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">Zure aretoa hemen agertu nahi duzu?</h2>
          <p className="text-white/50 text-lg mb-10 font-medium leading-relaxed italic">
            "Konektatu Euskal Herriko zaleekin eta kudeatu gure sarrerak modu erraz, moderno eta seguruan gure plataformarekin. Garatu dezagun eszena elkarrekin."
          </p>
          <button 
            onClick={handleContactClick}
            className="bg-primary px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-neon hover:scale-105 active:scale-95 transition-all text-white"
          >
            Jarri Gurekin Harremanetan
          </button>
        </div>
      </section>
    </div>
  );
};

export default Venues;
