
import { Produktua, SaskiElementua, Eskaera, EskaeraElementua, Erabiltzailea, Gogokoena, CartItem } from './types';

const MOCK_PRODUCTS: Produktua[] = [
  { 
    produktu_id: '1', 
    izena: 'ZETAK - BEC', 
    deskribapena: 'Euskal Herriko esperientzia elektroniko-pop handiena Barakaldoko BEC-en.', 
    prezioa: 35.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Pop', 
    lekua: 'BEC, Barakaldo', 
    data: '2026ko Ekainak 15',
    variants: [
      { name: 'Pista Orokorra', price: 35.0, available: true },
      { name: 'Harmaila 1', price: 45.0, available: true },
      { name: 'Golden Ring (VIP)', price: 75.0, available: true }
    ]
  },
  { 
    produktu_id: '2', 
    izena: 'IZARO - Cerodenero', 
    deskribapena: 'Melodia gozoak eta poesia hutsa Kursaaleko agertokian.', 
    prezioa: 28.0, 
    originalPrice: 38.0, // DISCOUNTED
    irudi_urla: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Pop', 
    lekua: 'Kursaal, Donostia', 
    data: '2026ko Maiatzak 12',
    variants: [
        { name: 'Sarrera Orokorra', price: 28.0, available: true }
    ]
  },
  { 
    produktu_id: '3', 
    izena: 'GATIBU - San Mames', 
    deskribapena: 'Rock bizia eta Gernikako martxa San Mamesen!', 
    prezioa: 32.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Rock', 
    lekua: 'San Mames, Bilbo', 
    data: '2026ko Ekainak 05',
    isSoldOut: true // SOLD OUT - ESTRICTAMENTE AGOTADO
  },
  { 
    produktu_id: '4', 
    izena: 'CHILL MAFIA - Reunion', 
    deskribapena: 'Iruñeko errebeldiak Bilbo hartuko du trap eta folk doinuekin.', 
    prezioa: 22.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Urban', 
    lekua: 'Santana 27, Bilbo', 
    data: '2026ko Uztailak 20' 
  },
  { 
    produktu_id: '5', 
    izena: 'ETS - 2026 Tour', 
    deskribapena: 'Ska-punk energiaz beteriko gaua Buesa Arenan.', 
    prezioa: 30.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Pop-Rock', 
    lekua: 'Buesa Arena, Gasteiz', 
    data: '2026ko Abuztuak 14' 
  },
  { 
    produktu_id: '6', 
    izena: 'HUNTZA - Itzulera', 
    deskribapena: 'Azken dantzara gonbidatuta zaude Zentral aretoan.', 
    prezioa: 25.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Folk', 
    lekua: 'Zentral, Iruña', 
    data: '2026ko Irailak 08' 
  },
  { 
    produktu_id: '7', 
    izena: 'SHINOVA - El Presente', 
    deskribapena: 'Indie rock hunkigarriena Santana 27an.', 
    prezioa: 25.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Indie', 
    lekua: 'Santana 27, Bilbo', 
    data: '2026ko Urriak 18' 
  },
  { 
    produktu_id: '8', 
    izena: 'BELAKO - Indie Live', 
    deskribapena: 'Post-punk eta elektronika nahasketa Kafe Antzokian.', 
    prezioa: 20.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Indie', 
    lekua: 'Kafe Antzokia, Bilbo', 
    data: '2026ko Azaroak 22' 
  },
  { 
    produktu_id: '9', 
    izena: 'BULEGO - Aldatu Aurretik', 
    deskribapena: 'Pop fresko eta koloretsua Azpeititik.', 
    prezioa: 24.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Pop', 
    lekua: 'Buesa Arena, Gasteiz', 
    data: '2026ko Uztailak 05' 
  },
  { 
    produktu_id: '10', 
    izena: 'SU TA GAR - Alarma', 
    deskribapena: 'Euskal heavy metalaren ikurrak Jimmy Jazz aretoan.', 
    prezioa: 28.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Metal', 
    lekua: 'Jimmy Jazz, Gasteiz', 
    data: '2026ko Irailak 12' 
  },
  { 
    produktu_id: '11', 
    izena: 'NØGEN - Åbe Tour', 
    deskribapena: 'Donostiako folk-pop doinuak Victoria Eugenian.', 
    prezioa: 22.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Folk', 
    lekua: 'Victoria Eugenia, Donostia', 
    data: '2026ko Abuztuak 30' 
  },
  { 
    produktu_id: '12', 
    izena: 'LIHER - Metal Gaua', 
    deskribapena: 'Rock indartsua eta metal ukituak Dabadaban.', 
    prezioa: 18.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Rock', 
    lekua: 'Dabadaba, Donostia', 
    data: '2026ko Urriak 10' 
  },
  { 
    produktu_id: '22', 
    izena: 'ZEA MAYS - Bira 2026', 
    deskribapena: 'Urteurren bira berezia Bilboko Arriagan.', 
    prezioa: 30.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Rock', 
    lekua: 'San Mames, Bilbo', 
    data: '2026ko Irailak 25' 
  },
  { 
    produktu_id: '23', 
    izena: 'Trikidantz - Jai Tour', 
    deskribapena: 'Plazako festa aretoetara ekarrita.', 
    prezioa: 15.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1514525253361-55142a543328?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Folk', 
    lekua: 'Jimmy Jazz, Gasteiz', 
    data: '2026ko Abuztuak 10' 
  },
  { 
    produktu_id: '24', 
    izena: 'GLAUKOMA - Live', 
    deskribapena: 'Rap eta Reggae eztanda Iruñean.', 
    prezioa: 20.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Urban', 
    lekua: 'Zentral, Iruña', 
    data: '2026ko Irailak 05' 
  },
  { 
    produktu_id: '25', 
    izena: 'NEOMAK - Alakrana', 
    deskribapena: 'Sorkuntza berria eta sustraiak Donostian.', 
    prezioa: 22.0, 
    irudi_urla: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200', 
    kategoria_id: 'Folk', 
    lekua: 'Dabadaba, Donostia', 
    data: '2026ko Urriak 30' 
  }
];

const memoryStore: Record<string, string> = {};

const load = (key: string, def: any) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : def;
  } catch (e) {
    return memoryStore[key] ? JSON.parse(memoryStore[key]) : def;
  }
};

const save = (key: string, val: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    memoryStore[key] = JSON.stringify(val);
  }
};

let userStorage: Erabiltzailea[] = load('garatu_users', []);
let cartStorage: SaskiElementua[] = load('garatu_cart', []);
let orderStorage: Eskaera[] = load('garatu_orders', []);
let favoriteStorage: Gogokoena[] = load('garatu_favorites', []);

export const getProduktuak = async (): Promise<Produktua[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 30);
  });
};

export const registerUser = async (email: string, name: string, surname: string, phone: string, password: string): Promise<Erabiltzailea> => {
  const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
  const newUser: Erabiltzailea = {
    erabiltzaile_id: userId,
    helbide_elektronikoa: email,
    izena: name,
    abizenak: surname,
    tfnoa: phone,
    pasahitza: password,
    sormen_data: new Date()
  };
  userStorage.push(newUser);
  save('garatu_users', userStorage);
  return newUser;
};

export const loginUser = async (email: string, password?: string): Promise<Erabiltzailea | null> => {
  const user = userStorage.find(u => u.helbide_elektronikoa.toLowerCase() === email.toLowerCase());
  if (user && password && user.pasahitza !== password) return null;
  return user || null;
};

// Updated addToCart to handle variants
export const addToCart = async (userId: string, productId: string, qty: number, variant?: string, price?: number): Promise<void> => {
  // Check if item exists with same product ID AND same variant
  const existing = cartStorage.find(i => 
    i.erabiltzaile_id === userId && 
    i.produktu_id === productId && 
    i.variant === variant
  );
  
  if (existing) {
    existing.kantitatea += qty;
  } else {
    cartStorage.push({ 
      erabiltzaile_id: userId, 
      produktu_id: productId, 
      kantitatea: qty,
      variant: variant,
      finalPrice: price
    });
  }
  save('garatu_cart', cartStorage);
};

export const toggleFavorite = async (userId: string, productId: string): Promise<boolean> => {
  const index = favoriteStorage.findIndex(f => f.erabiltzaile_id === userId && f.produktu_id === productId);
  let isFavorite = false;
  if (index !== -1) {
    favoriteStorage.splice(index, 1);
    isFavorite = false;
  } else {
    favoriteStorage.push({ erabiltzaile_id: userId, produktu_id: productId });
    isFavorite = true;
  }
  save('garatu_favorites', favoriteStorage);
  return isFavorite;
};

export const getFavorites = async (userId: string): Promise<string[]> => {
  return favoriteStorage.filter(f => f.erabiltzaile_id === userId).map(f => f.produktu_id);
};

export const updateCartItem = async (userId: string, productId: string, qty: number): Promise<void> => {
  // Simple update logic. In a complex app we'd need to target specific variant ID.
  // For this demo, finding by product ID is acceptable or we could improve to find by index if needed.
  // Assuming checkout uses exact object references or index, but here we use product ID.
  // To keep it simple and working with the mock:
  const idx = cartStorage.findIndex(i => i.erabiltzaile_id === userId && i.produktu_id === productId);
  if (idx !== -1) {
    if (qty <= 0) cartStorage.splice(idx, 1);
    else cartStorage[idx].kantitatea = qty;
    save('garatu_cart', cartStorage);
  }
};

export const getCartItems = async (userId: string): Promise<SaskiElementua[]> => {
  return cartStorage.filter(i => i.erabiltzaile_id === userId);
};

export const clearCart = async (userId: string): Promise<void> => {
  cartStorage = cartStorage.filter(i => i.erabiltzaile_id !== userId);
  save('garatu_cart', cartStorage);
};

// Helper to generate a unique seat for the "Legal Transaction" freeze
const generateSeat = () => {
  const gates = ['A', 'B', 'C', 'D'];
  const zones = ['Pista', 'Harmaila 1', 'Harmaila 2', 'VIP'];
  return {
    gate: gates[Math.floor(Math.random() * gates.length)],
    zone: zones[Math.floor(Math.random() * zones.length)],
    row: Math.floor(Math.random() * 50) + 1,
    seat: Math.floor(Math.random() * 200) + 1
  };
};

export const createOrder = async (userId: string, total: number, cartItems: CartItem[]): Promise<string> => {
  const orderId = `ORD-${Math.random().toString(36).substring(7).toUpperCase()}`;
  const orderItems: EskaeraElementua[] = [];

  // CRITICAL: We explode the cart quantities into individual ticket entries.
  cartItems.forEach(item => {
    for (let i = 0; i < item.kantitatea; i++) {
        orderItems.push({
            ticket_id: `${orderId}-${item.produktu_id}-${i+1}`,
            eskaera_id: orderId,
            produktu_id: item.produktu_id,
            prezioa: item.selectedPrice || item.prezioa, // Use the variant price if set
            produktu_izena: item.izena, 
            produktu_data: item.data, 
            produktu_lekua: item.lekua, 
            irudi_urla: item.irudi_urla,
            variant: item.selectedVariant, // Save the variant info
            seat_info: generateSeat()
        });
    }
  });

  const order: Eskaera = {
    eskaera_id: orderId,
    erabiltzaile_id: userId,
    sormen_data: new Date(),
    egoera: "Ordainduta", // Initial status
    guztira: total,
    items: orderItems 
  };

  orderStorage.push(order);
  save('garatu_orders', orderStorage);
  return orderId;
};

export const getUserOrders = async (userId: string): Promise<Eskaera[]> => {
  const orders = orderStorage.filter(o => o.erabiltzaile_id === userId);
  
  // Return the orders with their frozen items and lifecycle simulation
  return orders.map(order => {
    const orderDate = new Date(order.sormen_data);
    const now = new Date();
    
    // Lifecycle Logic: Paid -> Preparing -> On Way -> Delivered
    let currentStatus = order.egoera;
    const diffMins = (now.getTime() - orderDate.getTime()) / 60000;
    
    if (diffMins > 1 && currentStatus === 'Ordainduta') currentStatus = 'Prestatzen';
    if (diffMins > 3 && currentStatus === 'Prestatzen') currentStatus = 'Bidean';
    if (diffMins > 5 && currentStatus === 'Bidean') currentStatus = 'Entregatuta';

    return {
      ...order,
      egoera: currentStatus,
      sormen_data: orderDate,
      items: order.items || [] 
    };
  });
};
