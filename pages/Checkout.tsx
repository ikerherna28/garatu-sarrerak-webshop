
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { useAuth } from '../AuthContext';

interface CheckoutProps {
  cart: CartItem[];
  onCheckout: () => Promise<string>;
  onUpdateQty: (id: string, qty: number) => Promise<void>;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onCheckout, onUpdateQty }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [purchasing, setPurchasing] = useState(false);
  const subtotal = cart.reduce((acc, item) => acc + (item.prezioa * item.kantitatea), 0);
  const fees = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + fees;

  const handleComplete = async () => {
    if (cart.length === 0) return;
    setPurchasing(true);
    try {
      const orderId = await onCheckout();
      if (orderId) {
        navigate('/tickets');
      }
    } catch (err) {
      alert("Errore bat gertatu da erosketan.");
    } finally {
      setPurchasing(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/?scroll=catalog');
  };

  return (
    <div className="min-h-screen bg-background-dark text-white">
        <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
            {/* Navigation Header */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={handleContinueShopping}
                    className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest group"
                >
                    <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Jarraitu Erosten
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-8">
                    <div className="flex justify-between items-end">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                          Zure <span className="text-primary">Saskia</span>
                        </h1>
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest hidden md:block">
                            Prezioak eguneratuta daude
                        </span>
                    </div>
                    
                    <div className="space-y-4">
                      {cart.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center animate-fade-in">
                          <span className="material-symbols-outlined text-6xl text-white/20 mb-4">shopping_basket</span>
                          <p className="text-xl font-bold text-white/40 mb-2">Saskia hutsik dago.</p>
                          <p className="text-sm text-white/30 mb-8">Ez duzu sarrerarik aukeratu oraindik.</p>
                          <button 
                            onClick={handleContinueShopping} 
                            className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all"
                          >
                            Ikusi Kontzertuak
                          </button>
                        </div>
                      ) : (
                        cart.map((item) => (
                          <div key={`${item.produktu_id}-${item.selectedVariant || 'default'}`} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-all">
                            <img src={item.irudi_urla} className="w-24 h-24 object-cover rounded-xl shrink-0" alt="" />
                            <div className="flex-1 text-center md:text-left">
                              <h3 className="text-xl font-black uppercase italic tracking-tight">{item.izena}</h3>
                              <div className="flex items-center gap-2 justify-center md:justify-start">
                                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{item.lekua} • {item.data}</p>
                                  {item.selectedVariant && (
                                    <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide">{item.selectedVariant}</span>
                                  )}
                              </div>
                              <div className="flex items-center gap-2 justify-center md:justify-start mt-1">
                                  <p className="text-primary font-bold">{item.prezioa.toFixed(2)}€</p>
                                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold bg-white/5 px-2 py-0.5 rounded">Prezioa orain</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center bg-accent-dark/50 rounded-full p-1 border border-white/10">
                                  <button onClick={() => onUpdateQty(item.produktu_id, item.kantitatea - 1)} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                                      <span className="material-symbols-outlined text-sm">remove</span>
                                  </button>
                                  <span className="w-10 text-center font-black text-lg">{item.kantitatea}</span>
                                  <button onClick={() => onUpdateQty(item.produktu_id, Math.min(4, item.kantitatea + 1))} className="size-8 flex items-center justify-center rounded-full bg-primary text-white shadow-neon">
                                      <span className="material-symbols-outlined text-sm">add</span>
                                  </button>
                              </div>
                              <button onClick={() => onUpdateQty(item.produktu_id, 0)} className="text-red-400/50 hover:text-red-400 transition-colors">
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="space-y-6 pt-8 border-t border-white/10">
                          <h3 className="text-2xl font-black uppercase italic">Zure Datuak</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="text-xs text-white/60 font-black uppercase tracking-widest">Izena eta abizenak</label>
                                  <input 
                                    readOnly
                                    className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-5 text-white/50 cursor-not-allowed outline-none" 
                                    value={`${user?.izena} ${user?.abizenak}`} 
                                    type="text" 
                                  />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs text-white/60 font-black uppercase tracking-widest">Posta elektronikoa</label>
                                  <input 
                                    readOnly
                                    className="w-full bg-white/5 border border-white/10 rounded-xl h-14 px-5 text-white/50 cursor-not-allowed outline-none" 
                                    value={user?.helbide_elektronikoa} 
                                    type="email" 
                                  />
                              </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4">
                              <button 
                                onClick={handleComplete} 
                                disabled={purchasing || cart.length === 0}
                                className="flex-1 bg-primary h-14 rounded-full font-black text-lg shadow-neon hover:scale-[1.02] transition-all disabled:opacity-50 text-white uppercase tracking-widest"
                              >
                                {purchasing ? 'ORDAINTZEN...' : 'EROSKETA BURUTU'}
                              </button>
                              <button 
                                onClick={handleContinueShopping}
                                className="sm:w-auto px-8 h-14 rounded-full font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all text-white/60 hover:text-white"
                              >
                                Jarraitu Erosten
                              </button>
                          </div>
                      </div>
                    )}
                </div>
                <aside className="w-full lg:w-[400px]">
                    <div className="bg-card-dark/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm sticky top-28">
                        <h4 className="font-black text-xl mb-6 uppercase tracking-tighter italic">Laburpena</h4>
                        <div className="space-y-4 border-t border-white/5 pt-6">
                            <div className="flex justify-between text-sm"><span className="text-white/60 font-bold">Sarrerak</span><span className="font-bold">{subtotal.toFixed(2)}€</span></div>
                            <div className="flex justify-between text-sm"><span className="text-white/60 font-bold">Kudeaketa</span><span className="font-bold">{fees.toFixed(2)}€</span></div>
                            <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 mt-2">
                                <p className="text-[9px] text-primary uppercase font-bold tracking-widest leading-relaxed">
                                    Oharra: Saskiko prezioak uneko merkatuko prezioen arabera eguneratzen dira. Ordainketa egitean finkatuko dira.
                                </p>
                            </div>
                            <div className="flex justify-between text-sm border-t border-white/10 pt-4 items-end">
                                <div>
                                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Guztira</p>
                                  <p className="text-4xl font-black text-white">{total.toFixed(2)}€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    </div>
  );
};

export default Checkout;
