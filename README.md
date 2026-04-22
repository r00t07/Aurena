# 3D Print Inventory System

Ein modernes Inventarverwaltungssystem für 3D-gedruckte Produkte mit Retro-Tech-Ästhetik und **Supabase PostgreSQL Datenbank**.

## Features

✅ **Produktverwaltung**
- Produkte hinzufügen, bearbeiten und löschen
- Kategorien, Farben, Materialien verwalten
- Bestandsverwaltung mit Warnungen bei niedrigem Lagerbestand

✅ **Verkaufstracking**
- Verkäufe direkt markieren
- Umsatzstatistiken in Echtzeit
- Lagerwert-Berechnung

✅ **Such- und Filterfunktionen**
- Produktsuche nach Name oder Farbe
- Filterung nach Kategorien
- Übersichtliche Grid-Ansicht

✅ **Statistik-Dashboard**
- Gesamtprodukte
- Lagerbestand
- Verkaufte Einheiten
- Umsatz und Lagerwert

✅ **Supabase Datenbank**
- Echte PostgreSQL Datenbank
- Automatische Synchronisation
- Kostenlos (500 MB im Free-Tier)
- Daten bleiben dauerhaft gespeichert

## Tech Stack

- **Next.js 16** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Supabase** - PostgreSQL Database & Backend
- **React Hooks** - State Management

## Schnellstart

### 🚀 Für deinen Bruder - Komplette Anleitung

**Alles Schritt-für-Schritt erklärt:** Siehe **[ANLEITUNG_FUER_BRUDER.md](ANLEITUNG_FUER_BRUDER.md)**

Diese Anleitung enthält:
- ✅ Supabase Account erstellen (kostenlos)
- ✅ Datenbank aufsetzen (mit SQL)
- ✅ App lokal testen
- ✅ Online stellen mit Vercel
- ✅ Alle Screenshots und Links

**Zeitaufwand:** 10-15 Minuten
**Kosten:** €0,00 (alles kostenlos!)

### ⚡ Express-Setup (für Entwickler)

```bash
# 1. Supabase Projekt erstellen auf supabase.com
# 2. SQL ausführen (supabase-setup.sql im SQL Editor)
# 3. API Keys kopieren

# 4. .env.local erstellen
cp .env.local.example .env.local
# Trage deine Supabase URL + Anon Key ein

# 5. App starten
npm install
npm run dev
```

**Detaillierte Anleitung:** Siehe [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

---

## Lokale Installation

```bash
# Dependencies installieren
npm install

# Environment Variables einrichten
cp .env.local.example .env.local
# Trage deine Supabase Keys ein (siehe SUPABASE_SETUP.md)

# Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### 2. Supabase Setup

**Vollständige Anleitung:** Siehe [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

**Kurzversion:**
1. Erstelle ein kostenloses Supabase Projekt auf [supabase.com](https://supabase.com)
2. Führe `supabase-setup.sql` im SQL Editor aus
3. Kopiere API Keys in `.env.local`
4. Fertig! 🎉

## Vercel Deployment

### Schritt 1: GitHub Repository erstellen

1. Gehe zu [GitHub](https://github.com) und erstelle ein neues Repository
2. Nenne es z.B. `3d-print-inventory`
3. Klicke auf "Create repository"

### Schritt 2: Code hochladen

```bash
cd 3d-print-inventory

# Git initialisieren
git init
git add .
git commit -m "Initial commit: 3D Print Inventory System"

# Remote Repository hinzufügen (ersetze USERNAME mit deinem GitHub-Username)
git remote add origin https://github.com/USERNAME/3d-print-inventory.git

# Code pushen
git branch -M main
git push -u origin main
```

### Schritt 3: Vercel Deployment

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "Add New" → "Project"
3. Importiere dein GitHub Repository
4. **WICHTIG:** Füge Environment Variables hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL` = Deine Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Dein Supabase Anon Key
5. Klicke auf "Deploy"

**Fertig!** Deine App ist jetzt live unter `https://dein-projekt.vercel.app`

## Verwendung

### Produkt hinzufügen
1. Klicke auf "[+] NEU"
2. Fülle alle Felder aus:
   - **Produktname**: Name des Produkts
   - **Kategorie**: z.B. Figuren, Gadgets, Gaming, Deko
   - **Farbe**: Filamentfarbe
   - **Material**: PLA, PETG, ABS, TPU, Resin
   - **Anzahl**: Lagerbestand
   - **Preis**: Verkaufspreis in €
   - **Druckzeit**: Zeit in Stunden
3. Klicke auf "SPEICHERN"

### Bestand verwalten
- **[+1]**: Bestand um 1 erhöhen
- **[-1]**: Bestand um 1 verringern
- **[VERKAUFT]**: Produkt als verkauft markieren (Bestand -1, Verkäufe +1)
- **[X]**: Produkt löschen

### Suchen & Filtern
- **Suchfeld**: Suche nach Produktname oder Farbe
- **Kategorie-Filter**: Zeige nur Produkte einer Kategorie

## Geplante Features

- [x] ~~Datenpersistenz (Database)~~ ✅ **FERTIG mit Supabase!**
- [ ] Export als CSV/Excel ✅ **CSV FERTIG!**
- [ ] Bildupload für Produkte
- [ ] Benutzer-Authentifizierung
- [ ] Dashboard mit Charts
- [ ] Bestellverwaltung
- [ ] Lieferantenverwaltung
- [ ] Real-time Updates (Supabase Realtime)

## Design

Das Interface verwendet eine **Retro-Tech-Ästhetik** inspiriert von alten Terminal-Displays:
- **Monospace Font** für Tech-Feeling
- **Neon-Grün (#00ff41)** auf dunklem Hintergrund
- **Scanline-Effekt** für CRT-Monitor-Look
- **Glow-Effekte** für cyber Atmosphäre
- **Klare Geometrie** mit Rahmen und Boxen

## Lizenz

MIT - Frei verwendbar für private und kommerzielle Projekte

## Support

Bei Fragen oder Problemen erstelle ein Issue im GitHub Repository.

---

**Made with ❤️ for 3D Printing Enthusiasts**
