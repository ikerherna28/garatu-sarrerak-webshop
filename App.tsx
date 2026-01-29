import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { MemoryRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Tickets from './pages/Tickets';
import Venues from './pages/Venues';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './AuthContext';
import { Produktua, CartItem } from './types';
import { getProduktuak, addToCart, getCartItems, clearCart, createOrder, updateCartItem } from './firebase';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-background-dark"></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <React.Fragment>{children}</React.Fragment>;
};

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Produktua[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }
    try {
      const rawCart = await getCartItems(user.erabiltzaile_id);
      const allProducts = await getProduktuak();
      
      // CRITICAL FIX: Properly map the variant and price from the raw cart item
      // instead of overwriting it with the base product price.
      const hydratedCart = rawCart.map((item): CartItem | null => {
        const p = allProducts.find(prod => prod.produktu_id === item.produktu_id);
        if (!p) return null;

        return { 
            ...p, 
            kantitatea: item.kantitatea,
            // IMPORTANT: Use the stored variant details
            selectedVariant: item.variant,
            selectedPrice: item.finalPrice,
            // If a specific price exists (VIP), use it. Otherwise use base price.
            prezioa: item.finalPrice || p.prezioa,
            // Ensure the name displayed in cart reflects the variant if possible
            izena: item.variant ? `${p.izena}` : p.izena
        };
      }).filter((item): item is CartItem => item !== null);
      
      setCart(hydratedCart);
    } catch (e) {
      console.error("Cart refresh error", e);
    }
  }, [user]);

  useEffect(() => {
    const init = async () => {
      try {
        const prods = await getProduktuak();
        setProducts(prods);
        if (user) await refreshCart();
      } catch (e) {
        console.error("Initialization error:", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [user, refreshCart]);

  const handleAddToCart = async (productId: string, qty: number = 1, variant?: string, price?: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      // Pass the variant and specific price to the backend/storage
      await addToCart(user.erabiltzaile_id, productId, qty, variant, price);
      await refreshCart();
      const p = products.find(prod => prod.produktu_id === productId);
      addToast(`${p?.izena || 'Sarrera'} saskira gehitu da`);
    } catch (e) {
      console.error("Add to cart error", e);
      addToast("Errorea saskira gehitzean", "error");
    }
  };

  const handleUpdateQty = async (productId: string, qty: number) => {
    if (!user) return;
    try {
      await updateCartItem(user.erabiltzaile_id, productId, qty);
      await refreshCart();
    } catch (e) {}
  };

  const handleCheckout = async () => {
    if (!user) return "";
    try {
      const total = cart.reduce((acc, item) => acc + (item.prezioa * item.kantitatea), 0) + 5.0;
      const orderId = await createOrder(user.erabiltzaile_id, total, cart);
      await clearCart(user.erabiltzaile_id);
      await refreshCart();
      addToast("Erosketa ondo burutu da!", "success");
      return orderId;
    } catch (e) {
      console.error("Checkout error", e);
      addToast("Errorea erosketa burutzean", "error");
      return "";
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background-dark">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="text-primary text-xl font-black uppercase tracking-widest animate-pulse">Kargatzen...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <Navbar cartCount={cart.reduce((a, b) => a + b.kantitatea, 0)} onSearchChange={setSearchQuery} />
      
      {/* Toast System */}
      <div className="fixed top-24 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border border-white/10 animate-slide-in-right ${
            toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-card-dark text-white'
          }`}>
            <span className="material-symbols-outlined text-primary">
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <p className="text-sm font-bold uppercase tracking-wide">{toast.message}</p>
          </div>
        ))}
      </div>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={(id) => handleAddToCart(id)} searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout cart={cart} onCheckout={handleCheckout} onUpdateQty={handleUpdateQty} />
            </ProtectedRoute>
          } />
          <Route path="/tickets" element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MemoryRouter>
        <ScrollToTop />
        <AppContent />
      </MemoryRouter>
    </AuthProvider>
  );
};

export default App;