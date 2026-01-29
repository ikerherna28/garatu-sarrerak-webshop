
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getUserOrders } from '../firebase';
import { Eskaera, EskaeraElementua } from '../types';
import { getEventTips } from '../geminiService';

/* --- HELPER COMPONENTS --- */

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200';

const OrderStatusBadge: React.FC<{ status: Eskaera['egoera'] }> = ({ status }) => {
    let colorClass = 'bg-white/10 text-white/60 border-white/10';
    let icon = 'hourglass_empty';

    if (status === 'Ordainduta') {
        colorClass = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        icon = 'paid';
    } else if (status === 'Prestatzen') {
        colorClass = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        icon = 'inventory_2';
    } else if (status === 'Bidean') {
        colorClass = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        icon = 'local_shipping';
    } else if (status === 'Entregatuta') {
        colorClass = 'bg-green-500/20 text-green-400 border-green-500/30';
        icon = 'check_circle';
    }

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border ${colorClass} backdrop-blur-md`}>
            <span className="material-symbols-outlined text-[16px]">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
        </div>
    );
};

const OrderStatusTimeline: React.FC<{ status: Eskaera['egoera'] }> = ({ status }) => {
  const steps = ['Ordainduta', 'Prestatzen', 'Bidean', 'Entregatuta'];
  const currentIdx = steps.indexOf(status);

  return (
    <div className="w-full mb-8 mt-2">
      <div className="flex justify-between items-center relative z-10">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          
          let icon = 'paid';
          if (step === 'Prestatzen') icon = 'inventory_2';
          if (step === 'Bidean') icon = 'local_shipping';
          if (step === 'Entregatuta') icon = 'check_circle';

          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-primary text-white shadow-neon' : 'bg-white/10 text-white/30'} ${isCurrent ? 'scale-110 ring-2 ring-primary/50' : ''}`}>
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${isCompleted ? 'text-white' : 'text-white/30'}`}>{step}</span>
            </div>
          );
        })}
      </div>
      <div className="absolute top-[15px] left-0 w-full h-1 bg-white/5 -z-0 rounded-full overflow-hidden">
         <div 
           className="h-full bg-primary transition-all duration-1000 ease-out"
           style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
         ></div>
      </div>
    </div>
  );
};

/* --- TICKET EXPANDABLE CONTENT --- */

const TicketDetails: React.FC<{ 
  item: EskaeraElementua; 
  order: Eskaera;
}> = ({ item, order }) => {
  const [tips, setTips] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(true);
  
  const seatInfo = item.seat_info || { gate: 'A', zone: 'General', row: 1, seat: 1 };
  const isDelivered = order.egoera === 'Entregatuta';
  
  const productName = item.produktu_izena || "Ekitaldia";
  const productVenue = item.produktu_lekua || "Ezezaguna";

  useEffect(() => {
    let mounted = true;
    const fetchTips = async () => {
      try {
        // Only fetch if strictly needed to avoid API costs on every expand
        const text = await getEventTips(productName.split('-')[0], productVenue);
        if (mounted) setTips(text);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoadingTips(false);
      }
    };
    fetchTips();
    return () => { mounted = false; };
  }, [productName, productVenue]);

  return (
    <div className="px-6 pb-8 pt-2 animate-slide-down border-t border-white/5 mt-4">
      
      {/* Timeline */}
      <div className="relative mb-8 p-6 bg-white/5 rounded-2xl border border-white/5 mt-6">
         <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-4">Sarreraren Egoera</p>
         <OrderStatusTimeline status={order.egoera} />
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
          <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-1">Atea</p>
          <p className="text-2xl font-black text-white">{seatInfo.gate}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
          <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-1">Zona</p>
          <p className="text-xl font-black text-white truncate px-1">{seatInfo.zone}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
          <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-1">Lerroa</p>
          <p className="text-2xl font-black text-white">{seatInfo.row}</p>
        </div>
      </div>

      {/* QR Code OR Status Message */}
      {isDelivered ? (
          <div className="bg-white rounded-3xl p-8 mb-8 relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col items-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(248,27,230,0.8)] animate-scan"></div>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=GARATU-${item.ticket_id}`} 
                className="size-48 mix-blend-multiply opacity-90" 
                alt="QR" 
              />
              <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em] mt-4">ID: {item.ticket_id}</p>
          </div>
      ) : (
          <div className="bg-white/5 border border-dashed border-white/20 rounded-3xl p-10 mb-8 flex flex-col items-center justify-center text-center gap-6">
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <span className="material-symbols-outlined text-4xl text-primary">lock_clock</span>
              </div>
              <div>
                  <h4 className="text-white font-black uppercase tracking-wider text-sm mb-2">QR Kodea Ez Dago Prest</h4>
                  <p className="text-white/40 text-xs max-w-xs mx-auto">Sarrera segurtasun prozesuan dago. Egoera "Entregatuta" denean agertuko da hemen.</p>
              </div>
          </div>
      )}

      {/* AI Assistant */}
      <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`material-symbols-outlined text-primary ${loadingTips ? 'animate-spin' : ''}`}>auto_awesome</span>
          <h4 className="text-xs font-black uppercase tracking-widest text-primary">IA Zaleen Gida</h4>
        </div>
        {loadingTips ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-2 bg-white/10 rounded w-full"></div>
            <div className="h-2 bg-white/10 rounded w-3/4"></div>
          </div>
        ) : (
          <div className="text-xs text-white/70 font-medium leading-relaxed space-y-2">
             {tips ? (
               tips.split('\n').map((line, i) => line.trim() && <p key={i}>{line}</p>)
             ) : (
               <p>Ondo pasa kontzertuan! Ez ahaztu garaiz iristea.</p>
             )}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2.5s linear infinite;
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

/* --- MAIN PAGE --- */

const Tickets: React.FC = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Eskaera[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Track expanded ticket ID
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'wallet' | 'history'>('wallet');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'week' | 'month' | 'year' | 'range'>('all');
  
  // DATE RANGE STATE
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({ start: '', end: '' });

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const userOrders = await getUserOrders(user.erabiltzaile_id);
        userOrders.sort((a, b) => b.sormen_data.getTime() - a.sormen_data.getTime());
        setOrders(userOrders);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  // Derived state: Individual tickets for the Wallet List
  const walletTickets = useMemo(() => {
    const tickets: { item: EskaeraElementua, order: Eskaera }[] = [];
    orders.forEach(order => {
        order.items.forEach(item => {
            tickets.push({ item, order });
        });
    });
    return tickets;
  }, [orders]);

  // Derived state: Filtered Orders for History
  const filteredHistory = useMemo(() => {
    if (historyFilter === 'all') return orders;
    
    const now = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    
    return orders.filter(order => {
        // RANGE FILTER LOGIC
        if (historyFilter === 'range' && dateRange.start && dateRange.end) {
            const orderTime = order.sormen_data.getTime();
            const startTime = new Date(dateRange.start).setHours(0,0,0,0);
            const endTime = new Date(dateRange.end).setHours(23,59,59,999);
            return orderTime >= startTime && orderTime <= endTime;
        }

        const diffDays = (now.getTime() - order.sormen_data.getTime()) / msPerDay;
        if (historyFilter === 'week') return diffDays <= 7;
        if (historyFilter === 'month') return diffDays <= 30;
        if (historyFilter === 'year') return diffDays <= 365;
        
        return true;
    });
  }, [orders, historyFilter, dateRange]);

  const toggleExpand = (ticketId: string) => {
    if (expandedTicketId === ticketId) {
        setExpandedTicketId(null);
    } else {
        setExpandedTicketId(ticketId);
    }
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-background-dark min-h-screen">
      <div className="animate-spin size-8 border-2 border-primary border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-dark text-white">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row">
           {/* Sidebar */}
           <aside className="w-full lg:w-80 bg-card-dark border-r border-white/5 lg:min-h-screen p-8 flex flex-col sticky top-0 h-screen overflow-y-auto z-20">
              <div className="mb-10">
                 <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
                    <span className="material-symbols-outlined">arrow_back</span> Hasiera
                 </Link>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="size-16 rounded-full bg-gradient-to-tr from-primary to-purple-600 p-[2px]">
                       <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                           <span className="material-symbols-outlined text-3xl text-white/50">person</span>
                       </div>
                    </div>
                    <div>
                       <h2 className="font-bold text-lg">{user?.izena}</h2>
                       <p className="text-xs text-white/40 uppercase tracking-widest">Premium Kidea</p>
                    </div>
                 </div>
                 <nav className="space-y-2">
                    <button 
                        onClick={() => setActiveTab('wallet')}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'wallet' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:bg-white/5'}`}
                    >
                       <span className="material-symbols-outlined">wallet</span> Nire Wallet-a
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'history' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:bg-white/5'}`}
                    >
                       <span className="material-symbols-outlined">history</span> Eskariak (Orders)
                    </button>
                    <button onClick={logout} className="w-full text-left px-4 py-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 transition-colors">
                       <span className="material-symbols-outlined">logout</span> Saioa Itxi
                    </button>
                 </nav>
              </div>
           </aside>

           {/* Main Content */}
           <main className="flex-1 p-6 lg:p-12">
              <header className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
                       {activeTab === 'wallet' ? (<span>Nire <span className="text-primary">Sarrerak</span></span>) : (<span>Eskari <span className="text-primary">Historiala</span></span>)}
                    </h1>
                    <p className="text-white/40 text-lg font-medium">
                        {activeTab === 'wallet' ? 'Kudeatu zure sarrera aktiboak.' : 'Zure erosketa guztien erregistroa.'}
                    </p>
                 </div>
                 
                 {activeTab === 'history' && (
                     <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                         <div className="flex flex-wrap justify-end gap-2 bg-white/5 p-1 rounded-lg">
                            <button onClick={() => setHistoryFilter('all')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest ${historyFilter === 'all' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}>Guztiak</button>
                            <button onClick={() => setHistoryFilter('week')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest ${historyFilter === 'week' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}>Astea</button>
                            <button onClick={() => setHistoryFilter('month')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest ${historyFilter === 'month' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}>Hilabetea</button>
                            <button onClick={() => setHistoryFilter('year')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest ${historyFilter === 'year' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}>Urtea</button>
                         </div>
                         
                         {/* DATE RANGE INPUTS */}
                         <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                            <div className="flex flex-col">
                                <label className="text-[9px] text-white/30 font-black uppercase tracking-widest">Noiztik</label>
                                <input 
                                    type="date" 
                                    className="bg-transparent border-none text-white text-xs p-0 focus:ring-0 [&::-webkit-calendar-picker-indicator]:invert"
                                    value={dateRange.start}
                                    onChange={(e) => {
                                        setDateRange(prev => ({ ...prev, start: e.target.value }));
                                        setHistoryFilter('range');
                                    }}
                                />
                            </div>
                            <span className="text-white/20">-</span>
                            <div className="flex flex-col">
                                <label className="text-[9px] text-white/30 font-black uppercase tracking-widest">Noiz arte</label>
                                <input 
                                    type="date" 
                                    className="bg-transparent border-none text-white text-xs p-0 focus:ring-0 [&::-webkit-calendar-picker-indicator]:invert"
                                    value={dateRange.end}
                                    onChange={(e) => {
                                        setDateRange(prev => ({ ...prev, end: e.target.value }));
                                        setHistoryFilter('range');
                                    }}
                                />
                            </div>
                         </div>
                     </div>
                 )}
              </header>

              {/* ---------------- WALLET VIEW (LIST FORMAT) ---------------- */}
              {activeTab === 'wallet' && (
                  <div className="flex flex-col gap-6">
                     {walletTickets.length === 0 ? (
                        <div className="py-32 text-center border-2 border-dashed border-white/10 rounded-[40px] bg-white/2">
                           <span className="material-symbols-outlined text-8xl text-white/10 mb-6">confirmation_number</span>
                           <h3 className="text-2xl font-bold text-white/30 uppercase tracking-widest mb-4">Ez daukazu sarrerarik</h3>
                           <Link to="/" className="text-primary font-black uppercase tracking-widest hover:underline">Arakatu Kontzertuak</Link>
                        </div>
                     ) : (
                        walletTickets.map(({item, order}, idx) => {
                            const dateStr = item.produktu_data || "2026ko Urtarrilak 01";
                            const dateParts = dateStr.split(' ');
                            const month = dateParts[1] || "URT";
                            const day = dateParts[2] || "01";
                            const displayTitle = item.produktu_izena || "Ekitaldi Ezezaguna";
                            const isExpanded = expandedTicketId === item.ticket_id;
                            
                            // Use the saved image or fallback
                            const displayImage = item.irudi_urla || FALLBACK_IMAGE;

                            return (
                                <div 
                                   key={item.ticket_id}
                                   className={`group relative bg-card-dark border rounded-3xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-primary/50 shadow-neon-strong ring-1 ring-primary/20' : 'border-white/10 hover:border-white/30 hover:bg-white/5 cursor-pointer'}`}
                                >
                                   {/* Header Part (Always Visible) */}
                                   <div 
                                     onClick={() => toggleExpand(item.ticket_id)}
                                     className="flex flex-col md:flex-row min-h-[140px]"
                                   >
                                       {/* Image - Left Side */}
                                       <div className="w-full md:w-48 relative shrink-0 h-40 md:h-auto">
                                          <img 
                                             src={displayImage} 
                                             onError={(e) => {
                                                 e.currentTarget.src = FALLBACK_IMAGE;
                                             }}
                                             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                             alt="Cover" 
                                          />
                                          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                                          
                                          {/* Date Overlay on Image */}
                                          <div className="absolute top-0 left-0 p-3">
                                             <div className="bg-black/60 backdrop-blur-md text-white border border-white/10 px-2 py-1.5 rounded-lg text-center min-w-[50px]">
                                                 <p className="text-[10px] font-black uppercase tracking-wider">{month}</p>
                                                 <p className="text-xl font-black leading-none">{day}</p>
                                             </div>
                                          </div>
                                       </div>

                                       {/* Content - Middle */}
                                       <div className="flex-1 p-6 flex flex-col justify-center relative border-r border-white/5 border-dashed">
                                           <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-3 text-white truncate pr-4">
                                              {displayTitle}
                                           </h3>
                                           <div className="flex flex-wrap items-center gap-4 text-white/50 mb-auto">
                                                <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">near_me</span> {item.produktu_lekua}
                                                </p>
                                                <span className="hidden md:inline-block w-1 h-1 bg-white/20 rounded-full"></span>
                                                <p className="hidden md:block text-xs font-bold uppercase tracking-widest">
                                                    ID: {item.ticket_id.split('-').pop()}
                                                </p>
                                                {item.variant && (
                                                    <>
                                                        <span className="hidden md:inline-block w-1 h-1 bg-white/20 rounded-full"></span>
                                                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-black uppercase text-white/70">{item.variant}</span>
                                                    </>
                                                )}
                                           </div>
                                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-4 flex items-center gap-2">
                                                {isExpanded ? 'Itxi Xehetasunak' : 'Ikusi Sarrera eta QR'} 
                                                <span className={`material-symbols-outlined text-sm transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                                            </p>
                                       </div>

                                       {/* Status & Action - Right */}
                                       <div className="hidden md:flex w-48 p-4 flex-col items-center justify-center gap-3 shrink-0 bg-[#0f0f0f] border-l border-white/5">
                                           <OrderStatusBadge status={order.egoera} />
                                           
                                           {order.egoera === 'Entregatuta' ? (
                                               <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
                                                   <span className="material-symbols-outlined text-lg">qr_code_2</span>
                                                   Prest
                                               </div>
                                           ) : (
                                                <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest text-center">
                                                    Prozesatzen
                                                </div>
                                           )}
                                       </div>
                                   </div>

                                   {/* Expandable Content (Details) */}
                                   {isExpanded && (
                                       <TicketDetails item={item} order={order} />
                                   )}
                                </div>
                            );
                        })
                     )}
                  </div>
              )}

              {/* ---------------- HISTORY VIEW (LIST FORMAT) ---------------- */}
              {activeTab === 'history' && (
                  <div className="flex flex-col gap-6">
                      {filteredHistory.length === 0 ? (
                        <div className="py-20 text-center text-white/30 border-2 border-dashed border-white/10 rounded-3xl">
                            <p className="font-bold uppercase tracking-widest">Ez da erosketarik aurkitu epe honetan.</p>
                        </div>
                      ) : (
                        filteredHistory.map((order) => (
                            <div key={order.eskaera_id} className="bg-card-dark border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 border-b border-white/5 pb-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-white/10 text-white/50 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Eskaera ID</span>
                                            <span className="font-mono text-sm text-white/80">{order.eskaera_id}</span>
                                        </div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                            {order.sormen_data.toLocaleDateString()} • {order.sormen_data.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <OrderStatusBadge status={order.egoera} />
                                        <p className="text-2xl font-black text-white mt-2">{order.guztira.toFixed(2)}€</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Erositako Sarrerak</p>
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                                            <div className="size-10 rounded-lg bg-black overflow-hidden shrink-0">
                                                <img 
                                                  src={item.irudi_urla || FALLBACK_IMAGE} 
                                                  onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
                                                  className="w-full h-full object-cover opacity-80" 
                                                  alt="" 
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-white truncate">{item.produktu_izena}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] text-white/40 font-bold uppercase truncate">{item.produktu_lekua}</p>
                                                    {item.variant && <span className="text-[10px] bg-white/10 px-1 rounded text-white/60">{item.variant}</span>}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-white font-bold text-sm">{item.prezioa.toFixed(2)}€</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                      )}
                  </div>
              )}
           </main>
        </div>
    </div>
  );
};

export default Tickets;
