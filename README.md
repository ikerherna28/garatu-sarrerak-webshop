<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # 🎸 Garatu Sarrerak - Webshop
  
  **Kontzertu eta musika-ekitaldietarako sarrerak saltzeko plataforma.**
  <br>
  *React, Firebase eta Tailwind CSS erabiliz garatua.*

  <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </div>
</div>

---

## 📋 Proiektuari Buruz

**Garatu Sarrerak** Euskadiko kontzertu eta ekitaldietarako sarrerak kudeatzeko eta saltzeko "Full Stack" aplikazio bat da. Proiektu honen helburua benetako erosketa-ingurune bat simulatzea da, negozio-logika konplexuarekin, datuen iraunkortasunarekin eta "Dark Mode" estilo modernoko interfazearekin.

Aplikazio osoa **euskaraz** garatuta dago eta gailu guztietara egokitzen da (mugikorra, tableta eta ordenagailua).

### ✨ Ezaugarri Nagusiak (Features)

* **🛒 Saski Interaktiboa:** Produktuak denbora errealean gehitu, kendu eta kantitateak aldatzeko aukera (`saski_elementuak` bilduma erabiliz).
* **🔒 Segurtasuna eta Autentifikazioa:** Erabiltzaileen erregistroa eta saio-hasiera Firebase Auth bidez kudeatuta.
* **📸 Prezioen "Snapshot" Sistema:** Hau da proiektuaren alderdi teknikoena. Eskaera bat burutzean, sistemak produktuaren une horretako prezioa "izoztu" eta gordetzen du. Horrela, etorkizunean katalogoan prezioak aldatzen badira ere, erabiltzailearen historialak jatorrizko prezioa errespetatzen du.
* **🎨 UI/UX Modernoa:** Tailwind CSS erabiliz sortutako interfaze iluna (Neon/Dark Mode), erabiltzailearen esperientziara bideratua.
* **🗂️ Katalogo Iragazgarria:** Kontzertuak estiloka (Rock, Pop, Indie...) iragazteko aukera dinamikoa.

---

## 🛠️ Erabilitako Teknologiak

Proiektua garatzeko honako stack teknologikoa erabili da:

| Teknologia | Deskribapena |
| :--- | :--- |
| **React (Vite)** | Erabiltzailearen interfazea sortzeko liburutegia (SPA). |
| **TypeScript** | Kodearen sendotasuna bermatzeko eta erroreak saihesteko. |
| **Firebase Firestore** | NoSQL datu-basea (erabiltzaileak, produktuak, eskaerak). |
| **Firebase Auth** | Identitatearen kudeaketa (Login/Register). |
| **Tailwind CSS** | Estiloak azkar eta modu responsivean diseinatzeko framework-a. |
| **Lucide React** | Ikono bektorial arinak eta modernoak. |

---

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
