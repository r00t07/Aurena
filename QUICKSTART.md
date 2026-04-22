# ⚡ Quick Start Guide

## 🎯 Sofort loslegen (Lokal testen)

```bash
# 1. In den Projekt-Ordner wechseln
cd 3d-print-inventory

# 2. Dependencies installieren
npm install

# 3. Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) - **FERTIG!** 🚀

---

## 📤 Auf GitHub + Vercel deployen

### GitHub (3 Minuten)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/DEIN-USERNAME/3d-print-inventory.git
git push -u origin main
```

### Vercel (2 Minuten)

1. Gehe zu [vercel.com](https://vercel.com)
2. "Continue with GitHub"
3. Repository importieren
4. "Deploy" klicken
5. **FERTIG!** App ist live 🌐

---

## 🎮 Funktionen im Überblick

### Tab 1: PRODUKTE 📦
- **[+] NEU**: Neues Produkt hinzufügen
- **[↓] CSV**: Produktliste exportieren
- **[↓] STATS**: Statistiken exportieren
- **Suchfeld**: Nach Name/Farbe filtern
- **Kategorie-Dropdown**: Nach Kategorie filtern

**Pro Produkt:**
- **[+1] / [-1]**: Bestand ändern
- **[VERKAUFT]**: Verkauf buchen (Bestand -1, Verkäufe +1)
- **[X]**: Produkt löschen

### Tab 2: ANALYTICS 📊
- **Kategorien-Übersicht**: Umsatz & Verkäufe pro Kategorie
- **Material-Statistik**: Lagerbestand pro Material
- **Top 5 Verkäufe**: Bestseller nach Umsatz
- **Warnungen**: Niedriger Bestand & Ausverkauft
- **Durchschnittswerte**: Preis, Druckzeit, Verkaufsrate

---

## 💾 Datenpersistenz

**Automatisch gespeichert!** Alle Daten werden im Browser gespeichert (LocalStorage).

- ✅ Daten bleiben nach Browser-Neustart erhalten
- ✅ Funktioniert offline
- ⚠️ Browser-Cache löschen = Daten weg (vorher CSV exportieren!)

---

## 📁 Projekt-Struktur

```
3d-print-inventory/
├── app/
│   ├── page.tsx              # Hauptseite (Produkte + Tabs)
│   ├── layout.tsx            # App-Layout
│   └── globals.css           # Animationen & Styles
├── components/
│   └── Analytics.tsx         # Analytics-Dashboard
├── lib/
│   ├── storage.ts            # LocalStorage-Funktionen
│   └── export.ts             # CSV-Export-Funktionen
├── README.md                 # Dokumentation
├── DEPLOYMENT.md             # Detailliertes Deployment-Guide
└── package.json              # Dependencies
```

---

## 🎨 Design-System

**Farben:**
- Primär: `#00ff41` (Neon Grün)
- Hintergrund: `#0a0e27` (Dunkelblau)
- Warnung: `#ffaa00` (Orange)
- Fehler: `#ff4444` (Rot)

**Animationen:**
- Scanline-Effekt (CRT-Monitor)
- Glow-Effekte auf Hover
- Fade-In beim Laden
- Slide-Up Animationen

**Schriftart:** Monospace (Terminal-Style)

---

## 🔧 Anpassungen

### Beispielprodukte ändern
Datei: `app/page.tsx`
```typescript
const initialProducts: Product[] = [
  {
    id: '001',
    name: 'Dein Produkt',
    category: 'Deine Kategorie',
    // ... weitere Felder
  }
];
```

### Farben anpassen
Datei: `app/globals.css` und `app/page.tsx`
- Ersetze `#00ff41` mit deiner Farbe
- Ersetze `#0a0e27` für Hintergrund

### Neue Materialien hinzufügen
Datei: `app/page.tsx` - Suche nach:
```tsx
<select value={newProduct.material}>
  <option value="PLA">PLA</option>
  <option value="DEIN_MATERIAL">DEIN_MATERIAL</option>
</select>
```

---

## 🚀 Updates deployen

Nach Code-Änderungen:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Vercel deployed **automatisch**! 🎉

---

## 📊 CSV-Export Format

**Produktliste:**
```csv
ID,Produktname,Kategorie,Farbe,Material,Bestand,Preis (€),Verkauft,Umsatz (€),Druckzeit (h),Hinzugefügt
001,Dragon Figurine,Figuren,Metallic Gold,PLA,12,24.99,8,199.92,6.5,2024-01-15
```

**Statistiken:**
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
...
```

---

## ❓ FAQ

**Q: Kann ich die App offline nutzen?**  
A: Ja! Alle Funktionen (außer Deployment) funktionieren offline.

**Q: Wie sichere ich meine Daten?**  
A: Exportiere regelmäßig als CSV. LocalStorage kann verloren gehen beim Cache löschen.

**Q: Kann ich Bilder hochladen?**  
A: Aktuell nicht, aber kann leicht erweitert werden (siehe `DEPLOYMENT.md` - Geplante Features).

**Q: Mehrere Benutzer?**  
A: Momentan nur lokal (LocalStorage). Für Multi-User brauchst du eine Datenbank (z.B. Supabase).

**Q: Kostet Vercel was?**  
A: Nein! Das Free-Tier reicht für diese App völlig aus.

---

## 🆘 Probleme?

**Build-Fehler:**
```bash
# Lösche node_modules und installiere neu
rm -rf node_modules package-lock.json
npm install
```

**LocalStorage-Fehler:**
```bash
# Im Browser: DevTools → Application → Local Storage → Löschen
```

**Vercel 404:**
- Stelle sicher, dass `app/page.tsx` existiert
- Prüfe ob `npm run build` lokal funktioniert

---

## 📞 Support

- **GitHub Issues**: Erstelle ein Issue im Repository
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**Viel Erfolg mit deinem 3D Print Shop! 🎉**
