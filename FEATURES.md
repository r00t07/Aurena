# 🎯 Features Übersicht

## 📊 Dashboard (Header)

```
┌─────────────────────────────────────────────────────────────┐
│  ▲  3D PRINT INVENTORY                                       │
│     /// SYSTEM v1.0 — ONLINE                                 │
│                                                              │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐   │
│  │ PRODUKTE │  LAGER   │ VERKAUFT │  UMSATZ  │ LAGERWERT│   │
│  │    5     │  103 STK │  101 STK │ 1521.88€ │ 1341.68€ │   │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Live-Statistiken:**
- ✅ Aktualisieren sich automatisch bei jeder Änderung
- ✅ Zeigen Gesamtübersicht auf einen Blick
- ✅ Hover-Effekte für interaktive Erfahrung

---

## 🗂️ Tab-Navigation

```
┌────────────────────┬────────────────────┐
│  [#] PRODUKTE      │  [%] ANALYTICS     │
│  (AKTIV - GRÜN)    │  (INAKTIV - GRAU)  │
└────────────────────┴────────────────────┘
```

**Zwei Modi:**
1. **PRODUKTE**: Produktverwaltung & Bestandskontrolle
2. **ANALYTICS**: Detaillierte Auswertungen & Statistiken

---

## 📦 Produkte-Tab

### Steuerungsleiste

```
┌─────────────────────────────────────────────────────────────┐
│  [SUCHFELD]  [KATEGORIE-FILTER]  [↓CSV]  [↓STATS]  [+NEU]  │
└─────────────────────────────────────────────────────────────┘
```

**Funktionen:**
- **Suchfeld**: Echtzeit-Suche nach Name oder Farbe
- **Kategorie-Filter**: Dropdown mit allen Kategorien + "ALLE"
- **[↓] CSV**: Exportiert Produktliste als CSV
- **[↓] STATS**: Exportiert Statistiken als CSV
- **[+] NEU**: Öffnet Formular zum Hinzufügen

### Produkt-Karte

```
┌───────────────────────────────────────────────────────┐
│  ID #001                               24.99€         │
│  Dragon Figurine                       PLA            │
│  [Figuren]  Metallic Gold                            │
│  ─────────────────────────────────────────────────    │
│  LAGER      VERKAUFT    UMSATZ                       │
│  12 [OK]    8           199.92€                      │
│                                                       │
│  Druckzeit: 6.5h    Hinzugefügt: 2024-01-15         │
│  ─────────────────────────────────────────────────    │
│  [+1]  [-1]  [VERKAUFT]  [X]                         │
└───────────────────────────────────────────────────────┘
```

**Status-Farben:**
- 🟢 **OK**: Bestand ≥ 5 (Grün)
- 🟠 **NIEDRIG**: Bestand 1-4 (Orange)
- 🔴 **AUSVERKAUFT**: Bestand 0 (Rot)

**Buttons:**
- **[+1]**: Bestand um 1 erhöhen
- **[-1]**: Bestand um 1 verringern
- **[VERKAUFT]**: Verkauf buchen (Bestand -1, Verkäufe +1, Umsatz +Preis)
- **[X]**: Produkt permanent löschen

### Neues Produkt Formular

```
┌───────────────────────────────────────────────────────┐
│  /// NEUES PRODUKT                                    │
│  ─────────────────────────────────────────────────    │
│  [Produktname]  [Kategorie]  [Farbe]  [Material▼]    │
│  [Anzahl]       [Preis (€)]  [Druckzeit (h)]         │
│                                         [SPEICHERN]   │
└───────────────────────────────────────────────────────┘
```

**Verfügbare Materialien:**
- PLA
- PETG
- ABS
- TPU
- Resin

---

## 📊 Analytics-Tab

### 1. Kategorien-Übersicht

```
┌────────────────────────────────────────────────────────┐
│  /// KATEGORIEN                                        │
│  ──────────────────────────────────────────────────    │
│  ┌─────────────┬─────────────┬─────────────┐          │
│  │   Figuren   │   Gadgets   │   Gaming    │          │
│  │ Produkte: 1 │ Produkte: 2 │ Produkte: 1 │          │
│  │ Lager: 12   │ Lager: 55   │ Lager: 8    │          │
│  │ Verkauft: 8 │ Verkauft:60 │ Verkauft:22 │          │
│  │ Umsatz:     │ Umsatz:     │ Umsatz:     │          │
│  │ 199.92€     │ 764.40€     │ 329.78€     │          │
│  └─────────────┴─────────────┴─────────────┘          │
└────────────────────────────────────────────────────────┘
```

### 2. Material-Statistik

```
┌────────────────────────────────────────────────────────┐
│  /// MATERIALIEN                                       │
│  ──────────────────────────────────────────────────    │
│  [PLA]      [PETG]     [Resin]    [ABS]     [TPU]     │
│  Lager: 60  Lager: 25  Lager: 8   Lager: 0  Lager: 10 │
│  Verk.: 64  Verk.: 15  Verk.: 22  Verk.: 0  Verk.: 0  │
└────────────────────────────────────────────────────────┘
```

### 3. Top 5 Verkäufe

```
┌────────────────────────────────────────────────────────┐
│  /// TOP VERKÄUFE                                      │
│  ──────────────────────────────────────────────────    │
│  #1  Cable Organizer                        314.55€    │
│      Gadgets • Weiß                    45 verkauft     │
│  ──────────────────────────────────────────────────    │
│  #2  Dragon Figurine                        199.92€    │
│      Figuren • Metallic Gold            8 verkauft     │
│  ──────────────────────────────────────────────────    │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

### 4. Warnungen

```
┌────────────────────────────────────────────────────────┐
│  /// WARNUNGEN                                (ORANGE) │
│  ──────────────────────────────────────────────────    │
│  [!] AUSVERKAUFT (1)                           (ROT)   │
│      [Phone Case]                                      │
│  ──────────────────────────────────────────────────    │
│  [!] NIEDRIGER BESTAND (2)                   (ORANGE)  │
│      [Keycaps Custom (3)]  [Dragon Figurine (4)]       │
└────────────────────────────────────────────────────────┘
```

### 5. Durchschnittswerte

```
┌────────────────────────────────────────────────────────┐
│  /// DURCHSCHNITT                                      │
│  ──────────────────────────────────────────────────    │
│  ┌───────────┬───────────┬───────────┬──────────────┐ │
│  │   Preis   │ Druckzeit │ Verkaufs- │ Ø Umsatz/    │ │
│  │           │           │   rate    │   Produkt    │ │
│  │  13.79€   │   2.8h    │   49%     │   304.38€    │ │
│  └───────────┴───────────┴───────────┴──────────────┘ │
└────────────────────────────────────────────────────────┘
```

**Verkaufsrate Formel:**
```
Verkaufsrate = (Verkauft / (Lager + Verkauft)) × 100
```

---

## 💾 Datenpersistenz

### LocalStorage

**Automatisches Speichern:**
- ✅ Jede Änderung wird sofort gespeichert
- ✅ Daten bleiben nach Browser-Neustart
- ✅ Funktioniert komplett offline

**Gespeicherte Daten:**
```javascript
{
  "id": "001",
  "name": "Dragon Figurine",
  "category": "Figuren",
  "color": "Metallic Gold",
  "quantity": 12,
  "price": 24.99,
  "sold": 8,
  "printTime": 6.5,
  "material": "PLA",
  "dateAdded": "2024-01-15"
}
```

---

## 📤 CSV-Export

### Produktliste Export

**Dateiname:** `inventory_export_2024-04-22.csv`

```csv
ID,Produktname,Kategorie,Farbe,Material,Bestand,Preis (€),Verkauft,Umsatz (€),Druckzeit (h),Hinzugefügt
001,Dragon Figurine,Figuren,Metallic Gold,PLA,12,24.99,8,199.92,6.5,2024-01-15
002,Phone Stand,Gadgets,Schwarz,PETG,25,9.99,15,149.85,2.0,2024-02-01
...
```

### Statistik Export

**Dateiname:** `statistik_export_2024-04-22.csv`

```csv
GESAMTSTATISTIK

Kennzahl,Wert
Gesamtprodukte,5
Lagerbestand,103
Verkaufte Einheiten,101
Gesamtumsatz,€1521.88
Lagerwert,€1341.68

KATEGORIEN

Kategorie,Produkte,Verkauft,Umsatz
Figuren,1,8,€199.92
Gadgets,2,60,€764.40
Gaming,1,22,€329.78
Deko,1,11,€142.89
```

---

## 🎨 Design-Features

### Animationen

1. **Scanline-Effekt**: CRT-Monitor-Feeling
2. **Fade-In**: Sanftes Einblenden beim Laden
3. **Slide-Up**: Statistik-Karten gleiten hoch
4. **Glow-Effekte**: Neon-Glow auf Hover
5. **Pulse**: Sanftes Pulsieren bei Warnungen

### Responsive Design

**Desktop (1920px):**
- 3 Spalten Produktgrid
- Volle Statistik-Ansicht
- Alle Buttons sichtbar

**Tablet (768px):**
- 2 Spalten Produktgrid
- Reduzierte Statistik-Ansicht
- Buttons bleiben sichtbar

**Mobile (375px):**
- 1 Spalte Produktgrid
- Gestapelte Controls
- Touch-optimierte Buttons

---

## 🔄 Workflow-Beispiel

### Neues Produkt hinzufügen und verkaufen

1. **Klick auf [+] NEU**
2. **Formular ausfüllen:**
   - Name: "Miniatur Yoda"
   - Kategorie: "Figuren"
   - Farbe: "Grün"
   - Material: "Resin"
   - Anzahl: 10
   - Preis: 19.99€
   - Druckzeit: 8h
3. **SPEICHERN klicken**
4. **Produkt erscheint in Grid**
5. **Verkauf buchen:**
   - Klick auf [VERKAUFT]
   - Bestand: 10 → 9
   - Verkauft: 0 → 1
   - Umsatz: 0€ → 19.99€
6. **Dashboard aktualisiert sich automatisch**
7. **In Analytics sichtbar:**
   - Top Verkäufe
   - Kategorie-Statistik
   - Material-Verteilung

---

## ⚙️ Technische Details

### State Management
- React useState für lokalen State
- useEffect für LocalStorage Sync
- Automatisches Speichern bei Änderungen

### Performance
- Memoization für Analytics-Berechnungen
- Lazy Loading für große Listen
- Optimierte Re-Renders

### Datenstruktur
```typescript
type Product = {
  id: string;           // Unique ID (3-stellig)
  name: string;         // Produktname
  category: string;     // Kategorie
  color: string;        // Farbe
  quantity: number;     // Lagerbestand
  price: number;        // Preis in €
  sold: number;         // Verkaufte Menge
  printTime: number;    // Druckzeit in Stunden
  material: string;     // Material-Typ
  dateAdded: string;    // ISO-Datum
};
```

---

**🎉 Jetzt hast du einen kompletten Überblick über alle Features!**
