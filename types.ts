
export interface Erabiltzailea {
  erabiltzaile_id: string;
  helbide_elektronikoa: string;
  izena: string;
  abizenak: string;
  tfnoa: string;
  pasahitza: string;
  sormen_data: Date;
}

export interface TicketVariant {
  name: string;
  price: number;
  available: boolean;
}

export interface Produktua {
  produktu_id: string;
  izena: string;
  deskribapena: string;
  prezioa: number;
  originalPrice?: number; // For discount display
  irudi_urla: string;
  kategoria_id: string;
  lekua: string;
  data: string;
  variants?: TicketVariant[]; // Array of ticket types (Pista, Grada, VIP...)
  isSoldOut?: boolean; // General sold out flag
}

export interface SaskiElementua {
  erabiltzaile_id: string;
  produktu_id: string;
  kantitatea: number;
  variant?: string; // Track which variant was selected
  finalPrice?: number; // Store the specific price of the variant
}

export interface Gogokoena {
  erabiltzaile_id: string;
  produktu_id: string;
}

export type EskaeraEgoera = "Ordainduta" | "Prestatzen" | "Bidean" | "Entregatuta";

export interface Eskaera {
  eskaera_id: string;
  erabiltzaile_id: string;
  sormen_data: Date;
  egoera: EskaeraEgoera;
  guztira: number;
  items: EskaeraElementua[]; 
}

export interface EskaeraElementua {
  ticket_id: string; 
  eskaera_id: string;
  produktu_id: string;
  prezioa: number; 
  produktu_izena: string; 
  produktu_data: string; 
  produktu_lekua: string; 
  irudi_urla: string; 
  variant?: string; // Which variant is this specific ticket
  seat_info?: { 
      gate: string;
      zone: string;
      row: number;
      seat: number;
  }
}

export interface CartItem extends Produktua {
  kantitatea: number;
  selectedVariant?: string; // Helper for the frontend to know what to display
  selectedPrice?: number;   // Helper for the frontend
}
