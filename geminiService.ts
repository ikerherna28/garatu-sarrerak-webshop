
import { GoogleGenAI } from "@google/genai";

// --- MOCK RESPONSES (GENERIC API SIMULATION) ---
// These will be used ALWAYS if the API fails or is missing, ensuring the app never breaks.

const MOCK_VENUE_SUMMARIES: Record<string, string> = {
    "BEC": "Euskal Herriko erakustazokarik handiena. Akustika indartsua eta milaka pertsonentzako edukiera duena.",
    "San Mames": "Katedrala. Mundu mailako artistak hartzen dituen estadio mitikoa, giro paregabearekin.",
    "Kursaal": "Donostiako bitxi arkitektonikoa. Akustika garbia eta giro intimoagoa eskaintzen du.",
    "Santana 27": "Bilboko gauaren bihotza. Industria giroko sala mitikoa rock eta elektronikarako.",
    "Buesa Arena": "Gasteizko erraldoia. Saskibaloiaz gain, kontzertu handietarako ezin hobea.",
    "default": "Euskal Herriko kulturaren erreferente nagusia, zuzeneko musikarako prestatua."
};

const MOCK_VENUE_INFO = (venueName: string) => ({
  text: `
**ARETOARI BURUZ:**
${venueName} Euskal Herriko erreferente nagusietako bat da. Bere instalazio modernoek eta kokapen estrategikoak esperientzia paregabea eskaintzen dute mota guztietako ikuskizunetarako.

**GARRAIOA ETA PARKINGA:**
Garraio publikoarekin ondo konektatuta dago (Metroa/Autobusa). Ibilgailu pribatuentzako aparkaleku publikoak inguruan daude, baina garraio publikoa gomendatzen da ekitaldi jendetsuetan.

**INGURUAN AFALTZEKO:**
Ingurunean gastronomia eskaintza zabala dago. Pintxoak jateko tabernak eta afari lasaiagoak egiteko jatetxeak oinezko distantziara aurkituko dituzu.
`,
  sources: []
});

const MOCK_TIPS = `
- **Iritsi Garaiz:** Ateak ireki baino 30-45 minutu lehenago joatea gomendatzen da.
- **Sarrerak Prest:** Eraman sarrerak deskargatuta mugikorrean, estaldura arazoak saihesteko.
- **Arropa Erosoa:** Kontzertuaz gozatzeko oinetako eta arropa erosoak ezinbestekoak dira.
`;

// Helper to safely get env var without crashing in browser
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      // @ts-ignore
      return process.env.API_KEY;
    }
  } catch (e) {
    return null;
  }
  return null;
};

export const getVenueSummary = async (venueName: string) => {
  const apiKey = getApiKey();

  // If no key, return mock immediately (Generic API behavior)
  if (!apiKey || apiKey === 'undefined') {
      const key = Object.keys(MOCK_VENUE_SUMMARIES).find(k => venueName.includes(k)) || "default";
      return MOCK_VENUE_SUMMARIES[key];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Eman 2 lerroko deskribapen zirraragarri eta labur bat "${venueName}" aretoari buruz Euskal Herrian. 
    Zergatik da famatua? Zer nolako giroa dago? Erantzun bakarrik deskribapenarekin, euskaraz.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.warn("AI Fallback triggered for Summary");
    const key = Object.keys(MOCK_VENUE_SUMMARIES).find(k => venueName.includes(k)) || "default";
    return MOCK_VENUE_SUMMARIES[key];
  }
};

export const getVenueInfo = async (venueName: string) => {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'undefined') {
      return MOCK_VENUE_INFO(venueName);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Zuk euskal kontzertu-aretoen aditua zara. Eman informazio lagungarria eta zehatza "${venueName}" aretoari buruz Euskal Herrian.
    Mesedez, erantzun hiru atal hauetan banatuta (tituluak lodiz eta bi asteriskorekin **Titulu**):
    
    1. ARETOARI BURUZ: Deskribapen labur bat.
    2. GARRAIOA ETA PARKINGA: Nola iritsi eta non utzi autoa.
    3. INGURUAN AFALTZEKO: Kontzertua baino lehen afaltzeko edo poteo bat egiteko 2-3 leku konkretu.
    
    Erabili euskarazko tonu hurbila.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: { tools: [{ googleSearch: {} }] },
    });

    const text = response.text || "Informazioa lortzen...";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      sources: chunks.filter(c => c.web).map(c => ({
        title: c.web?.title || "Iturria",
        uri: c.web?.uri
      }))
    };
  } catch (error) {
    console.warn("AI Fallback triggered for Info");
    return MOCK_VENUE_INFO(venueName);
  }
};

export const getEventTips = async (artist: string, venue: string) => {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'undefined') {
      return MOCK_TIPS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Eman 3 aholku labur eta praktiko zale batentzat ${artist} ikustera doana ${venue}-n.
    Erantzun zerrenda formatuan, euskaraz.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text?.trim() || MOCK_TIPS;
  } catch (error) {
    console.warn("AI Fallback triggered for Tips");
    return MOCK_TIPS;
  }
};
