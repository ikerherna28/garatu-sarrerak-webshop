<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # 🎸 Garatu Sarrerak - Webshop
  
  **Euskadiko kontzertu eta musika-ekitaldietarako sarrerak kudeatzeko eta saltzeko plataforma profesionala.**
  
  <p>
    <strong>React · TypeScript · Vite · Tailwind CSS · Firebase</strong>
  </p>

  <div style="display: flex; justify-content: center; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
    <img src="https://img.shields.io/badge/React%2018.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript%205.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite%206.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google AI" />
  </div>

  <hr style="margin: 30px 0; border: 1px solid rgba(255,255,255,0.1);" />

</div>

---

## 📖 Sarrera

**Garatu Sarrerak** Euskal Herriko kontzertu eta ekitaldien sarrerak kudeatzeko eta saltzeko full-stack aplikazio modernoa da. Proiektu honetan bertan aurkezten dira erosketa-plataforma profesional baten hainbat gaiari dagozkion kontzeptuak: autentifikazioa, saski-kudeaketa denbora errealean, eskaeren administrazioa, eta AI integrazioa.

Aplikazioa **guztiz euskaraz** dago garaturik, eta gailu guztietara (mugikorra, tableta, ordenagailua) egokitzen da responsive diseinua erabiliz.

---

## ✨ Oinarrizko Ezaugarriak

### 🛍️ E-Commerce Funtzionalitateak

| Ezaugarria | Deskribapena |
|:---|:---|
| **🛒 Saski Dinamikoa** | Produktuak denbora errealean gehitu, kendu edo kantitatea aldatu. Saski-aldaketak berehala eguneratzen dira. |
| **💾 Prezioen Snapshot** | Eskaera egiten denerako, sistemak produktuen prezioa "izozten" du. Geroago katalogoan prezioak aldatzen badira ere, historiala jatorrizko balioak gordetzen ditu. |
| **🎟️ Sarreren Bariantak** | Sarrera mota ezberdinak (Pista Orokorra, Harmaila 1, VIP...) prezioen araberarekin. |
| **⭐ Gogoko Markatzea** | Erabiltzaileek kontzertuak gogokoen zerrendarako gorde ditzakete eta berriro bisitatu. |
| **🏷️ Deskuentu Sistema** | Artean sarrerek deskuentu erakusten dituzte, originalaren eta deskuentuaren prezioa biak erakutsiz. |

### 🔐 Autentifikazioa eta Seguritatea

- **Erregistroa eta Saio-Hasiera:** Email eta pasahitzaren bidez sistemaren erabiltzaileak berenganatzea.
- **Datoen Konfinantzialitatea:** Erabiltzaileen informazioa seguru gordetzen da (izena, abizenak, telefonoa).
- **Saio-Kudeaketa:** LocalStorage-n gordetako saio ezaugarriaren akordioa aplikazio guztian.

### 🎨 Diseinu Profesionala

- **Dark Mode Neon:** Tailwind CSS-rekin sortutako modernoko interfazea, astunen koloreak eta kontraste aukera.
- **Responsive Diseinua:** Pantaila guztietara era onetik egokitzen da.
- **Ikonografia Profesionala:** Lucide React ikonen bidez garbi eta aurtenoa.

### 🌐 AI Integrazio (Google Gemini)

- **Aretoen Informazioa:** AI-k aretoeei buruzko informazioa jasotzen du (garraioa, aparkadegiak, tabernak).
- **Kontzertuen Laguntzak:** Erabiltzaileek gomendioak jasotzen dituzte bideo- eta soinu-kalitateari buruz.

---

## 🛠️ Teknologia Orrialdia

### Aurrealdea (Frontend)

| Teknologia | Bertsioa | Erabilerak |
|:---|:---:|:---|
| ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) | **18.3** | Osagaien liburutegia eta erabiltzaile-interfazea |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) | **5.8** | Estatikoki tipizatutako JavaScript |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) | **6.2** | Build-tolua eta garatze-zerbitzaria |
| ![React Router](https://img.shields.io/badge/React%20Router-6.28-CA4245?logo=react-router) | **6.28** | Enrutatzailea eta nabigazioa |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white) | - | CSS Utilitate-framework-a |
| ![Lucide React](https://img.shields.io/badge/Lucide%20React-Ikonoak-27272A) | - | Ikonoen liburutegia |

### Atzealdea (Backend) & Datuak

| Teknologia | Erabilerak |
|:---|:---|
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black) | **Datu-basea (Firestore) eta autentifikazioa** |
| ![Google AI](https://img.shields.io/badge/Google%20Gemini%20AI-4285F4?logo=google&logoColor=white) | **Aretoen informazioa eta laguntzak** |

---

## 📁 Proiektuaren Egitura

```
garatu-sarrerak-webshop/
│
├── 📄 index.tsx                    # Sarrera-puntua (React DOM sarrera)
├── 📄 App.tsx                      # Aplikazioaren nuklea, enrutatzailea eta osagaien kudeaketa
├── 📄 AuthContext.tsx              # Autentifikazioaren eta saio-kudeaketaren goi-testuingurua
├── 📄 firebase.ts                  # Firebase-ren konfigurazioa eta datu-basearen funtzioak
├── 📄 geminiService.ts             # Google Gemini AI eta aretoen informazioa
├── 📄 types.ts                     # TypeScript interfaze eta tipo-definizioak
├── 📄 vite.config.ts               # Vite build konfigurazioa
├── 📄 tsconfig.json                # TypeScript konfigurazioa
├── 📄 package.json                 # NPM mendekotasunak eta skriptiak
│
├── 📁 components/                  # Berreguagarri React osagak
│   ├── 📄 Navbar.tsx               # Goiko barra-nabigazioa
│   ├── 📄 Footer.tsx               # Aplikazioaren beheko atala
│   ├── 📄 ProductCard.tsx          # Sarrera-kartaren osagaia
│   └── 📄 GeminiVenueInfo.tsx       # Aretoen AI-informazioa erakusten duen osagaia
│
└── 📁 pages/                       # Orrialde nagusiak (enrutamendua)
    ├── 📄 Home.tsx                 # Sarrera-katalogo eta iragazketa
    ├── 📄 ProductDetail.tsx        # Sarrera-detaleen orrialdea
    ├── 📄 Checkout.tsx             # Ordainketa-prozesuaren orrialda
    ├── 📄 Tickets.tsx              # Sartutako sarren zerrenda
    ├── 📄 Venues.tsx               # Aretoen zerrenda eta informazioa
    └── 📄 Login.tsx                # Saio-hasiera eta erregistroa
```

### Fitxategi Nagusien Deskribapena

#### **App.tsx** 
Aplikazioaren nuklea. Hemen daude enrutatzailea, barne-egoera osoa, eta osagaien fluxua kudeatzen du:
- Produktuen eta saskiaren egoera
- Entsegua-mezuak (Toast)
- Bilaketa eta iragazketa
- Babestu bideak (erregistratutako erabiltzaileentzat soilik)

#### **AuthContext.tsx**
Erabiltzailearen autentifikazioaren goi-testuingurua. Saio-kudeaketa eta erabiltzaile-informazioa mantentzen du aplikazio osoan zehar.

#### **firebase.ts**
Firebase-ren datu-basea eta autentifikazioa integratzen du:
- Produktuen zerrenda (MOCK sarrerak)
- Saski eta eskaeren kudeaketa
- Erabiltzaile-fidantza eta saioa
- Gogokoen zerrenda

#### **geminiService.ts**
Google Gemini AI APIa erabiliz aretoen informazioa lortzen du (mockarekin faillimendarako):
- Aretoen laburpena
- Garraioa eta parkinga
- Jatetxeen gomendioak

#### **types.ts**
TypeScripteko interfazeak definitzen ditu datuen egiturari buruz:
- `Produktua` - Sarrera-datuak
- `CartItem` - Saski-elementuak
- `Eskaera` - Eskaera-informazioa
- `Erabiltzailea` - Erabiltzaile-datuak

---

## 🚀 Instalazio eta Exekuzioa

### Beharrezko Baldintzak

- **Node.js** 16.0+ bertsioa
- **npm** edo **yarn** paketeetako kudeatzailea
- **Google Gemini API Key** (API-a erabiltzeko; aukerakoa)

### Pasos

#### 1️⃣ Proiektua Deskargatu

```bash
git clone https://github.com/zure-github/garatu-sarrerak-webshop.git
cd garatu-sarrerak-webshop
```

#### 2️⃣ Mendekotasunak Instalatu

```bash
npm install
```

#### 3️⃣ Ingurunea Konfiguratu (Aukerakoa)

Aretoen AI-informazioa nahi baldin bada, `.env` fitxategi bat sortu eta Gemini API key-a gehitu:

```env
VITE_GEMINI_API_KEY=zure_api_key_hemen
```

#### 4️⃣ Garatze-Zerbitzaria Hastea

```bash
npm run dev
```

Aplikazioa **http://localhost:3000** helbideren bidez erabilgarria egongo da.

#### 5️⃣ Proiektuaren Builda

Produkzioari begira:

```bash
npm run build
npm run preview
```

---

## 📊 Aplikazioaren Fluxua

### Erabiltzaile-Bide Tipikoa

```
┌─────────────────────────────────────────────────────────────┐
│                     SARRERA / ETXEA                          │
│   (Produktuen katalogoa, iragazketa, bilaketa)              │
└──────┬──────────────────────────────────────────────────────┘
       │
       ├─→ Sarraren Detaleak Ikusi
       │   (Bariantak, informazioa, aretoa)
       │
       ├─→ Sarrera Saskira Gehitu
       │   (Kantitatea aukeratu)
       │
       └─→ SASKIRA
           └─→ Ordainketa Prozesua
               ├─→ Sarrerak Berrikusi
               ├─→ Prezioen Snapshot Sortu
               └─→ Eskaera Gorde
                   └─→ SARRAK (Eskaeren Historia)
                       └─→ Sarraren PDF/QR Deskargatu

              BESTE FLUXUAK:
              • Gogokoen Zerrenda (erregistratutako erabiltzaileentzat)
              • Aretoen Informazioa (Gemini AI bidez)
              • Tokiko Bidea / Bilaketa
```

---

## 🔄 Datuen Fluxua

### Eskaera Egitearen Fluxua (Snapshot Sistema)

1. **Erabiltzaileak Saskira Gehitze** → Produktu-ID eta kantitate biltzen da
2. **Saski Egoera Eguneratze** → React-eko egoera berritzen da
3. **Ordainketan Sarreak Berrikustea** → Saski-elementuak erakusten dira
4. **Eskaera Burutzea**:
   - Saski-elementuak bildu
   - **Prezioa izoztu** (une horretako prezioa gordetzen da)
   - Eskaera Firestore-ra gorde
   - Saskia garbitu eta beste orrialdean zuzendu
5. **Sarren Zerrenda** → Erabiltzaileak sortutako eskaeren historia ikus dezake

---

## 🎯 Aplikazioaren Osagaiak

### **Home.tsx** - Katalogoa
- Produktuen zerrenda erakusten du
- Kategorien araberako iragazketa
- Aretoen araberako bilaketa
- Gogoko markatzea (erregistratutakoek soilik)

### **ProductDetail.tsx** - Detaleak
- Sarrera osoa erakusten du (irudia, deskribapena, barianta)
- Aretoan buruzko informazioa Gemini AI bidez
- Saski-gehitzea
- Skenario hobeak eta erabiltzaile-esperientzia

### **Checkout.tsx** - Ordainketa
- Saski-zuzentze
- Prezioen kalkulua (azpitotala + tasak)
- Eskaera-burutzea
- Konfimazioa

### **Tickets.tsx** - Sarren Historia
- Sortutako eskaeren lista
- Sarren egoera
- Identifikazioa eta detaleak

### **Venues.tsx** - Aretoak
- Aretoen zerrenda
- Gemini AI bidezko informazioa
- Derrigorrezko bidea sarreen katalogora

### **Login.tsx** - Autentifikazioa
- Erregistroa (izena, abizenak, telefonoa, email, pasahitza)
- Saio-hasiera
- Autentifikazioaren kudeaketa

---

## 🔒 Seguritate eta Datoen Pribatutasuna

### Ondartean Garraia Egiten Direnak

- Erabiltzaileen izena, abizenak eta telefonoa ez dira murrizturik daudenik gordetzen
- LocalStorage-n saio-datuak gordetzen dira (mugitu bezala)
- Email-a autentifikazioa egiteko erabiltzen da

### Produkzioari Begira Hobetzeak (Gabezia)

- **🔴 Firebase Konfigurazioa:** Proiektu honetan Firebase ez dago integratua benetako FS datu-basean. Mock datuak erabiltzen dira. Proiektuaren amaieran, real Firebase proiektu bat konfiguratu beharko litzateke (Firestore Datu-basea, Auth Seguritatea, Batearpen-arauak).
- **🔴 API Key Seguritatea:** Gemini API key-a `.env` fitxategian dagoen bezala ez du neurgarriarik zeukan. Produkzioari begira, environment bertsioak babestua egon behar du eta serverean gordetakoa.
- **🔴 HTTPS:** Proiektuaren babestu bideak HTTPS protokoloaren bidez bidali behar da (OAuth, session cookies, ...).

---

## 📝 Denbora Errealko Adibideak

### Sarrera Gehitu Saskira

```tsx
// ProductCard.tsx → onClick
const handleAddToCart = async () => {
  await addToCart(product.produktu_id, 1, product.prezioa);
  addToast(`${product.izena} saskira gehitu da!`);
};
```

### Eskaera Burutzea (Snapshot-a)

```tsx
// Checkout.tsx → onClick
const createOrder = async () => {
  const order = {
    eskaera_id: generateID(),
    erabiltzaile_id: user.erabiltzaile_id,
    items: cart.map(item => ({
      produktu_id: item.produktu_id,
      finalPrice: item.prezioa // ⭐ SNAPSHOT - Prezioa izoztatua
    }))
  };
  await saveOrder(order);
};
```

---

## ⚠️ Gabezia Eta Etorkizuneko Hobekuntzak

| Gabezia | Deskribapena | Lehentasuna |
|:---|:---|:---:|
| **Firebase Integrazioa** | Benetako Firebase Firestore konektarea ez dago. Mock datuak erabiltzen dira. | 🔴 KRITIKOA |
| **Aginduaren Ordain-Orrialda** | Stripe, PayPal edo beste ordain-tresnarik ez dago. | 🔴 KRITIKOA |
| **Erabiltzaileen Rolak (Admin)** | Administratzaileentzat besterako orrialda ez dago (produktuak gehitzea, deitzea, ...). | 🟠 ALTUA |
| **Email Bidalketa** | Eskaera-konfimazioak ez dira emaila bidez bidaltzen. | 🟠 ALTUA |
| **Sarren PDF/QR** | Sarraren PDF deskarga edo QR-a ez da ezarrita. | 🟠 ALTUA |
| **Notiziario Sistemak** | Real-time notiziak (saski-aldaketa, eskaera-egoera) ez daudela. | 🟡 BATEKOA |
| **Deskuentu Kudeaketa** | Kodeak eta promo-deskuentua ez daudela. | 🟡 BATEKOA |
| **Bilaketa Aurreratua** | Bilaketa soilagoa. Gainera, egunak eta sarrera-motak iragaztea ez dago. | 🟡 BATEKOA |
| **Offline Modu** | Service Worker-a ez da konfiguratuak. | 🟢 TXIKIA |
| **Lokalizazioa** | Euskera soilik. Beste hizkuntzara ez dago. | 🟢 TXIKIA |

---

## 🚀 Etorkizuneko Hobekuntzak

```plaintext
1. BENETAKO FIREBASE INTEGRAZIOA
   ├─ Firestore datu-basea (erabiltzaileak, produktuak, eskaera)
   ├─ Firebase Auth (OAuth integrazio)
   ├─ Cloud Functions (email bidalketa)
   └─ Firestore Babestzea (seguritate-arauak)

2. ORDAIN-SISTEMA INTEGRAZIOA
   ├─ Stripe API
   ├─ PayPal API
   └─ Bilaketa-egoera kudeaketa

3. ADMIN ORRIALDA
   ├─ Produktuen kudeaketa (gehitu, aldatu, kendu)
   ├─ Eskaeren kudeaketa
   ├─ Statistika dashboard
   └─ Erabiltzaileen kudeaketa

4. EMAIL ETA NOTIZIAK
   ├─ SendGrid edo AWS SES
   ├─ Eskaera-konfimazioa
   ├─ Sarren deskarga lotuak
   └─ Abiatze-abisuak

5. DOKUMENTAZIOA ETA PDF
   ├─ Sarraren PDF deskarga
   ├─ QR kodu erakusta
   └─ Entregatzeko ebidentzia
```

---

## 📚 Erabilitako Liburutegiak

Denbora errealean balioaren helbidea:

```json
{
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "^19.2.4",
    "react-router-dom": "6.28.0",
    "@google/genai": "1.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0",
    "tailwind-css": "latest"
  }
}
```

---

## 🤝 Kolaborazioa eta Kontribuzioa

Nahi baldin bada proiektua hobetzean laguntza, **Pull Request** bat egin dezakezu. Kalitatearen kontrola eta dokumentazioa beharrezkoak dira.

### Kolaborazio-arauak:
1. Fork egin proiektua
2. Feature-ari buruzko branch sortu (`git checkout -b feature/mifeature`)
3. Aldaketak egin eta commit (`git commit -m 'Deskribapena'`)
4. Branch-a push (`git push origin feature/mifeature`)
5. Pull Request sortu

---

## 📄 Lizentzia

Proiektu hau **MIT Lizentziapean** dago. Askatasun osoa du erabiltzeko eta editatzeko, baldin eta jatorri-kredituak ematen badituzu.

---

## 📞 Kontaktua

- **Garapena:** Iker Hernández Navas
- **Posta:** ikertolosaldealhi@gmail.com
- **GitHub:** [garatu-sarrerak-webshop](https://github.com/ikerherna28/garatu-sarrerak-webshop)

---

## 🎓 Oharrak Amaieran

Garatu Sarrerak proiektu honetan aurkezteko diren kontzeptuak mota guztietako merkatu-plazetarako baliogarriak dira:

- ✅ Erabiltzaile-autentifikazioa
- ✅ Produktu-katalogoaren kudeaketa
- ✅ Saski-sistema denbora errealean
- ✅ Ordainketa-prozesuaren flows
- ✅ Datoen iraunkortasuna (datuen bidalketa)
- ✅ API integrazioa (Google Gemini)
- ✅ Responsive diseinua
- ✅ Dark Mode interfazea

Proiektu hau **ikaskuntza** eta **prototipazioa** bezala erabilgarria da, produkziora igorri aurrean beharrezko gabezia osoak zuzentuta izanda.

---

**Eskerrik asko proiektua ikusi izangatik! ⭐**

## 🗄️ Datu-basearen Egitura (Firestore)

Proiektuak NoSQL egitura zorrotz bat jarraitzen du, honako bilduma eta eremu hauekin (Euskaraz):

```mermaid
erDiagram
    ERABILTZAILEAK ||--o{ SASKI_ELEMENTUAK : "kudeatzen du"
    ERABILTZAILEAK ||--o{ ESKAERAK : "sortzen du"
    ESKAERAK ||--|{ ESKAERA_ELEMENTUAK : "dauka"

    ERABILTZAILEAK {
        string erabiltzaile_id PK "Auth UID"
        string helbide_elektronikoa
        string izena
        string abizenak
        string tfnoa
    }
    PRODUKTUAK {
        string produktu_id PK
        string izena
        string kategoria_id
        number prezioa "Uneko prezioa"
    }
    ESKAERAK {
        string eskaera_id PK
        date sormen_data
        string egoera "Adib: Ordainduta"
    }
    ESKAERA_ELEMENTUAK {
        string produktu_id FK
        number kantitatea
        number prezioa "SNAPSHOT (Prezio finkoa)"
    }
