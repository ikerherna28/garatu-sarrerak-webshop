
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Produktua } from '../types';
import { useAuth } from '../AuthContext';
import { toggleFavorite, getFavorites } from '../firebase';

interface ProductCardProps {
  item: Produktua;
  onAddToCart: (id: string) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200';

const ProductCard: React.FC<ProductCardProps> = ({ item, onAddToCart }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(item.irudi_urla);
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);
  
  // FIXED: Strictly use the database value, no random simulation
  const isSoldOut = item.isSoldOut; 

  useEffect(() => {
    if (user) {
      getFavorites(user.erabiltzaile_id).then(favs => {
        setIsFavorite(favs.includes(item.produktu_id));
      });
    }
  }, [user, item.produktu_id]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }

    setHeartAnimating(true);
    const newState = await toggleFavorite(user.erabiltzaile_id, item.produktu_id);
    setIsFavorite(newState);
    setTimeout(() => setHeartAnimating(false), 450);
  };

  return (
    <Link 
      to={`/details/${item.produktu_id}`} 
      className={`block group cursor-pointer relative aspect-[3/4] rounded-[32px] overflow-hidden bg-background-dark border border-white/10 transition-all duration-500 hover:border-primary/50 shadow-lg ${isSoldOut ? 'opacity-60 grayscale' : ''}`}
    >
        <img 
          src={imgSrc} 
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={item.izena} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        
        {/* Heart Icon Button */}
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-6 left-6 z-20 size-10 rounded-full flex items-center justify-center transition-all duration-300 ${isFavorite ? 'bg-primary text-white shadow-neon scale-110' : 'bg-black/40 backdrop-blur-md text-white/60 border border-white/10 hover:text-white hover:bg-black/60'} ${heartAnimating ? 'animate-bounce-short' : ''}`}
        >
          <span className={`material-symbols-outlined text-xl ${isFavorite ? 'fill-current' : ''}`} style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>
            favorite
          </span>
        </button>

        {isSoldOut && (
          <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-lg border border-red-400">
            AGORTUTA
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary font-black text-[9px] uppercase tracking-widest bg-primary/10 backdrop-blur-md px-2 py-1 rounded-lg border border-primary/20">
                {item.kategoria_id}
              </span>
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">• {item.data}</span>
            </div>
            <h3 className="text-2xl font-black uppercase leading-tight group-hover:text-primary transition-colors italic tracking-tighter text-white">
              {item.izena}
            </h3>
            <p className="text-white/60 text-xs mt-2 font-medium flex items-center gap-1">
               <span className="material-symbols-outlined text-[14px]">location_on</span> {item.lekua}
            </p>
            <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="text-2xl font-black text-white">{item.prezioa.toFixed(2)}€</span>
                   {item.originalPrice && !isSoldOut && (
                     <span className="text-xs text-white/40 line-through">{item.originalPrice.toFixed(2)}€</span>
                   )}
                </div>
                {!isSoldOut ? (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart(item.produktu_id);
                    }}
                    className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-neon hover:scale-110 active:scale-95 transition-all text-white border border-white/10"
                  >
                      <span className="material-symbols-outlined text-xl">shopping_bag</span>
                  </button>
                ) : (
                  <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 cursor-not-allowed">
                      <span className="material-symbols-outlined text-xl text-white/20">block</span>
                  </div>
                )}
            </div>
        </div>
        
        <style>{`
          @keyframes bounce-short {
            0%, 100% { transform: scale(1.1); }
            50% { transform: scale(1.4); }
          }
          .animate-bounce-short {
            animation: bounce-short 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        `}</style>
    </Link>
  );
};

export default ProductCard;
