
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Produktua } from '../types';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../AuthContext';
import { getFavorites } from '../firebase';

interface HomeProps {
  products: Produktua[];
  onAddToCart: (id: string) => void;
  searchQuery?: string;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart, searchQuery = '' }) => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [userFavIds, setUserFavIds] = useState<string[]>([]);
  
  const initialVenue = searchParams.get('venue');
  const shouldScroll = searchParams.get('scroll') === 'catalog';

  useEffect(() => {
    if (initialVenue) {
      setFilter('All'); // Reset category if filtering by venue
    }
  }, [initialVenue]);

  useEffect(() => {
    if (user) {
      getFavorites(user.erabiltzaile_id).then(setUserFavIds);
    } else {
      setUserFavIds([]);
      if (filter === 'Gogokoak') setFilter('All');
    }
  }, [user, filter]);

  useEffect(() => {
    if (shouldScroll) {
      const el = document.getElementById('catalog');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
          // Garbitu scroll parametroa URLtik garbi geratzeko
          searchParams.delete('scroll');
          setSearchParams(searchParams);
        }, 100);
      }
    }
  }, [shouldScroll, searchParams, setSearchParams]);

  const categories = useMemo(() => {
    const cats = ['All', 'Rock', 'Pop', 'Urban', 'Indie', 'Pop-Rock', 'Metal', 'Folk'];
    if (user) cats.splice(1, 0, 'Gogokoak');
    return cats;
  }, [user]);
  
  // Extract unique venues from products for a quick filter
  const availableVenues = useMemo(() => {
    const venues = products.map(p => p.lekua.split(',')[0].trim());
    return Array.from(new Set(venues)).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Filter by Venue from URL
    if (initialVenue) {
      result = result.filter(p => p.lekua.toLowerCase().includes(initialVenue.toLowerCase()));
    }

    // Filter by Category
    if (filter === 'Gogokoak') {
      result = result.filter(p => userFavIds.includes(p.produktu_id));
    } else if (filter !== 'All') {
      result = result.filter(p => p.kategoria_id === filter);
    }

    // Filter by Search Bar
    if (searchQuery) {
      result = result.filter(p => 
        p.izena.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.lekua.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [products, filter, searchQuery, initialVenue, userFavIds]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
        <section className="mb-20">
            <div className="relative min-h-[500px] md:min-h-[650px] w-full rounded-[50px] overflow-hidden flex flex-col justify-end p-8 md:p-24 shadow-2xl border border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent z-10"></div>
                    <img alt="Hero" className="w-full h-full object-cover scale-105 animate-slow-zoom" src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=2000"/>
                </div>
                <div className="relative z-20 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="bg-primary px-5 py-2 rounded-full text-[10px] md:text-[12px] font-black uppercase tracking-[0.25em] inline-block text-white shadow-neon animate-pulse">BERRIAK KALEAN</span>
                        <span className="hidden sm:inline-block bg-white/10 backdrop-blur-3xl px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-[0.25em] text-white border border-white/20">2026ko GIDAREN GARRANTZIA</span>
                    </div>
                    <h1 className="text-white text-5xl md:text-9xl font-black leading-[0.8] tracking-tighter mb-8 uppercase italic">
                        Bizi Izan<br/><span className="text-primary">Euskal Eszena</span>
                    </h1>
                    <p className="hidden md:block text-white/80 text-2xl mb-12 max-w-2xl font-medium leading-relaxed italic border-l-8 border-primary pl-8">
                        "Agertokia taupada bat da, herri baten oihua musika bihurtuta. Zatoz gurekin bizitzera."
                    </p>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                        <button 
                            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                            className="neon-glow flex items-center justify-center rounded-full bg-primary h-16 md:h-20 px-8 md:px-14 text-white font-black uppercase tracking-widest text-sm md:text-lg transition-all hover:scale-105 active:scale-95 shadow-neon-strong"
                        >
                            Sarrerak Eskuratu
                        </button>
                        <Link to="/venues" className="flex items-center justify-center rounded-full bg-white/5 backdrop-blur-2xl h-16 md:h-20 px-8 md:px-14 text-white font-black uppercase tracking-widest text-sm md:text-lg border border-white/10 transition-all hover:bg-white/15 hover:border-white/30">
                            Arakatu Aretoak
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section id="catalog" className="mb-12 pt-12 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight italic flex flex-wrap items-center gap-4">
                      {initialVenue ? (
                        <>
                          <span className="text-white/40">Aretoa:</span> 
                          <span className="text-primary">{initialVenue}</span>
                        </>
                      ) : (
                        filter === 'Gogokoak' ? (
                          <>Nire <span className="text-primary">Gogokoak</span></>
                        ) : 'Hurrengo Geltokiak'
                      )}
                    </h2>
                    {(initialVenue || filter === 'Gogokoak') && (
                      <button 
                        onClick={() => {setSearchParams({}); setFilter('All');}} 
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors group"
                      >
                        <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span> Iragazkia Kendu
                      </button>
                    )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-white/50 text-[10px] font-black uppercase tracking-[0.3em] shrink-0">
                      {filteredProducts.length} KONTZERTU AURKITU DIRA
                  </div>
                  {/* Quick Venue Switcher */}
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Aldatu aretoa:</span>
                    <select 
                      value={initialVenue || ''} 
                      onChange={(e) => e.target.value ? setSearchParams({ venue: e.target.value }) : setSearchParams({})}
                      className="bg-background-dark border border-white/10 rounded-lg text-[10px] font-bold text-white/60 focus:border-primary focus:ring-0 outline-none h-8 px-2"
                    >
                      <option value="">Guztiak</option>
                      {availableVenues.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
                {categories.map((cat) => (
                    <button 
                        key={cat} 
                        onClick={() => { setFilter(cat); }}
                        className={`flex h-12 md:h-14 shrink-0 items-center justify-center gap-x-3 rounded-full px-8 md:px-10 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-primary text-white border-primary shadow-neon' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}
                    >
                        {cat === 'Gogokoak' && <span className="material-symbols-outlined text-sm">favorite</span>}
                        {cat === 'All' ? 'DENAK IKUSI' : cat.toUpperCase()}
                    </button>
                ))}
            </div>
        </section>

        <section className="mb-32 min-h-[600px]">
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {filteredProducts.map((item, idx) => (
                        <div key={item.produktu_id} className="animate-fade-in" style={{animationDelay: `${idx * 0.05}s`}}>
                            <ProductCard item={item} onAddToCart={onAddToCart} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 bg-white/2 border-2 border-dashed border-white/5 rounded-[50px] animate-fade-in">
                    <span className="material-symbols-outlined text-9xl text-white/5 mb-8">{filter === 'Gogokoak' ? 'favorite_border' : 'music_note'}</span>
                    <p className="text-2xl md:text-3xl font-black text-white/20 uppercase tracking-widest italic text-center px-10 max-w-2xl">
                      {filter === 'Gogokoak' ? 'Ez duzu gogokorik markatu oraindik' : 'Barkatu, ez dugu kontzerturik aurkitu iragazki hauekin'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                      <button onClick={() => {setFilter('All'); setSearchParams({});}} className="text-primary font-black uppercase tracking-widest hover:underline text-sm md:text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined">restart_alt</span> Denak Ikusi
                      </button>
                      <Link to="/venues" className="text-white/40 font-black uppercase tracking-widest hover:text-white text-sm md:text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined">stadium</span> Beste Aretoak
                      </Link>
                    </div>
                </div>
            )}
        </section>

        <style>{`
            @keyframes slow-zoom {
                from { transform: scale(1); }
                to { transform: scale(1.1); }
            }
            .animate-slow-zoom {
                animation: slow-zoom 30s infinite alternate ease-in-out;
            }
        `}</style>
    </div>
  );
};

export default Home;
