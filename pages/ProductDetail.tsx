
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Produktua } from '../types';
import { getProduktuak } from '../firebase';
import { useAuth } from '../AuthContext';
import GeminiVenueInfo from '../components/GeminiVenueInfo';

interface ProductDetailProps {
  onAddToCart: (id: string, qty: number, variant?: string, price?: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Produktua | null>(null);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const all = await getProduktuak();
      const p = all.find(item => item.produktu_id === id);
      if (p) {
        setProduct(p);
        // Default to first variant if exists
        if (p.variants && p.variants.length > 0) {
            setSelectedVariant(p.variants[0].name);
        }
      }
    };
    fetch();
  }, [id]);

  const handleAddToCartAndGo = async () => {
    if (!product) return;
    
    // SECURITY GUARD: Absolutely prevent adding sold out items
    // This runs if someone somehow triggers the function even if button is hidden
    if (product.isSoldOut) {
        alert("Barkatu, ekitaldi hau guztiz AGORTUTA dago. Ezinezkoa da sarrerak erostea.");
        return;
    }

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    
    // Determine price based on variant or base price
    let finalPrice = product.prezioa;
    if (selectedVariant && product.variants) {
        const v = product.variants.find(v => v.name === selectedVariant);
        if (v) finalPrice = v.price;
    }

    try {
      await onAddToCart(product.produktu_id, qty, selectedVariant || undefined, finalPrice);
      navigate('/checkout', { replace: true });
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  if (!product) return null;

  const currentVariant = product.variants?.find(v => v.name === selectedVariant);
  const displayPrice = currentVariant ? currentVariant.price : product.prezioa;

  return (
    <div className="min-h-screen bg-background-dark text-white">
        <main className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8">
            <nav className="flex flex-wrap gap-2 mb-6 text-sm">
                <Link className="text-white/50 hover:text-primary transition-colors" to="/">Hasiera</Link>
                <span className="text-white/20">/</span>
                <span className="text-primary font-medium">{product.izena}</span>
            </nav>
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-8 border border-white/10 group">
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${product.isSoldOut ? 'grayscale contrast-125' : ''}`} 
                  style={{backgroundImage: `linear-gradient(to top, rgba(10, 5, 10, 0.9) 0%, rgba(10, 5, 10, 0.2) 50%, rgba(0, 0, 0, 0) 100%), url("${product.irudi_urla}")`}}
                ></div>
                <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">LIVE 2026</span>
                        {product.isSoldOut ? (
                             <span className="bg-red-600 text-white border border-red-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Sarrerak Agortuta</span>
                        ) : (
                             <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">Sarrerak Eskuragarri</span>
                        )}
                        {product.originalPrice && !product.isSoldOut && (
                             <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">Deskontua %</span>
                        )}
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-black mb-2 tracking-tighter uppercase">{product.izena}</h1>
                    <p className="text-white/70 text-lg font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">location_on</span> {product.lekua} • <span className="text-primary">{product.data}</span>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="space-y-4">
                            <p className="text-white/60 text-lg leading-relaxed max-w-2xl font-medium">{product.deskribapena}</p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-2 bg-accent-dark/30 border border-white/5 px-4 py-2 rounded-xl">
                                  <span className="material-symbols-outlined text-primary">mic</span>
                                  <span className="text-sm font-bold">{product.kategoria_id}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-accent-dark/30 border border-white/5 px-4 py-2 rounded-xl">
                                  <span className="material-symbols-outlined text-primary">theater_comedy</span>
                                  <span className="text-sm font-bold">Basque Scene</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GeminiVenueInfo venueName={product.lekua} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-xl bg-accent-dark/20 border border-white/5 flex items-start gap-4">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined">calendar_today</span></div>
                            <div><p className="text-white/40 text-xs font-bold uppercase tracking-wider">Data</p><p className="text-lg font-bold">{product.data}</p></div>
                        </div>
                        <div className="p-6 rounded-xl bg-accent-dark/20 border border-white/5 flex items-start gap-4">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined">map</span></div>
                            <div><p className="text-white/40 text-xs font-bold uppercase tracking-wider">Lekua</p><p className="text-lg font-bold">{product.lekua}</p></div>
                        </div>
                    </div>
                </div>
                <div className="lg:sticky lg:top-28 h-fit">
                    <div className={`p-8 rounded-xl border shadow-2xl relative overflow-hidden transition-colors ${product.isSoldOut ? 'bg-red-950/20 border-red-500/20' : 'bg-card-dark border-white/10'}`}>
                        <div className={`absolute -top-24 -right-24 size-48 blur-[80px] rounded-full ${product.isSoldOut ? 'bg-red-500/10' : 'bg-primary/20'}`}></div>
                        <div className="relative z-10 space-y-6">
                            <div>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Prezioa</p>
                                <div className="flex items-baseline gap-3">
                                    <p className={`text-5xl font-black ${product.isSoldOut ? 'text-white/30' : 'text-[#EAEAEA]'}`}>{displayPrice.toFixed(2)}€</p>
                                    {product.originalPrice && !selectedVariant && !product.isSoldOut && (
                                        <p className="text-xl font-bold text-white/30 line-through decoration-red-500 decoration-2">{product.originalPrice.toFixed(2)}€</p>
                                    )}
                                </div>
                            </div>

                            {/* Ticket Variants Selector - Disabled visually and functionally if Sold Out */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Aukeratu Sarrera Mota</p>
                                    <div className="flex flex-col gap-2">
                                        {product.variants.map((v) => (
                                            <button
                                                key={v.name}
                                                onClick={() => !product.isSoldOut && setSelectedVariant(v.name)}
                                                disabled={product.isSoldOut}
                                                className={`flex items-center justify-between p-3 rounded-lg border text-xs font-bold transition-all ${
                                                    product.isSoldOut 
                                                    ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed' 
                                                    : selectedVariant === v.name 
                                                        ? 'bg-primary border-primary text-white shadow-neon' 
                                                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                                }`}
                                            >
                                                <span>{v.name}</span>
                                                <span>{v.price}€</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.isSoldOut ? (
                                /* STRICT SOLD OUT UI - No Buttons Allowed */
                                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center flex flex-col items-center gap-3 animate-pulse">
                                    <div className="size-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-red-500 text-3xl">block</span>
                                    </div>
                                    <div>
                                        <p className="text-red-500 font-black uppercase tracking-widest text-sm">AGORTUTA / SOLD OUT</p>
                                        <p className="text-white/30 text-xs mt-2">Sarrera guztiak saldu dira ekitaldi honetarako.</p>
                                    </div>
                                </div>
                            ) : (
                                /* AVAILABLE UI - Add to Cart Enabled */
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-white/80">Kopurua</p>
                                        <div className="flex items-center bg-accent-dark/50 rounded-full p-1 border border-white/10">
                                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="w-10 text-center font-black text-lg">{qty}</span>
                                            <button onClick={() => setQty(Math.min(4, qty + 1))} className="size-8 flex items-center justify-center rounded-full bg-primary text-white shadow-neon">
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white/40 text-center italic">Gehienez 4 sarrera pertsonako</p>
                                
                                    <button 
                                    onClick={handleAddToCartAndGo}
                                    className="w-full bg-primary py-4 rounded-full font-black text-lg shadow-neon hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-white"
                                    >
                                        <span className="material-symbols-outlined">shopping_cart</span> Gehitu Saskira
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default ProductDetail;
