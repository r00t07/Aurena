# 🗄️ Supabase Setup Guide

## 📋 Übersicht

Diese Anleitung zeigt dir Schritt für Schritt, wie du deine **3D Print Inventory** App mit Supabase verbindest.

**Was ist Supabase?**
- Kostenlose PostgreSQL Datenbank
- Automatische APIs
- Real-time Updates
- 500 MB Speicher im Free-Tier

---

## 🚀 Schritt 1: Supabase Projekt erstellen

### 1.1 Account erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf **"Start your project"**
3. Melde dich an mit **GitHub**
4. Klicke auf **"New Project"**

### 1.2 Projekt konfigurieren

```
Organization: [Deine Organisation]
Name: 3d-print-inventory
Database Password: [Sicheres Passwort - SPEICHERN!]
Region: Europe West (Frankfurt) - am nächsten zu Deutschland
Pricing Plan: Free
```

5. Klicke auf **"Create new project"**
6. Warte 2-3 Minuten (Datenbank wird erstellt)

---

## 🔧 Schritt 2: Datenbank einrichten

### 2.1 SQL Editor öffnen

1. Im Supabase Dashboard: Linke Sidebar → **"SQL Editor"**
2. Klicke auf **"New query"**

### 2.2 SQL ausführen

1. Öffne die Datei `supabase-setup.sql` aus diesem Projekt
2. Kopiere den **gesamten Inhalt**
3. Füge ihn in den SQL Editor ein
4. Klicke auf **"Run"** (oder drücke `Cmd/Ctrl + Enter`)

✅ **Erfolgreich!** Du solltest sehen:
```
Success. No rows returned
```

### 2.3 Daten überprüfen

1. Linke Sidebar → **"Table Editor"**
2. Wähle Tabelle **"products"**
3. Du solltest 5 Beispielprodukte sehen

---

## 🔑 Schritt 3: API-Schlüssel holen

### 3.1 Project Settings öffnen

1. Linke Sidebar → **"Project Settings"** (Zahnrad-Icon)
2. Klicke auf **"API"**

### 3.2 Keys kopieren

Du brauchst **zwei** Werte:

**Project URL:**
```
https://xyz123abc.supabase.co
```

**anon/public Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **NICHT** den `service_role` Key verwenden!

---

## 💻 Schritt 4: Projekt konfigurieren

### 4.1 .env.local Datei erstellen

1. Im Projekt-Ordner: Erstelle eine neue Datei `.env.local`
2. Füge folgendes ein:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dein-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key-hier
```

3. Ersetze die Werte mit **deinen** Keys aus Schritt 3.2

### 4.2 Dependencies installieren

```bash
npm install
```

### 4.3 App starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

✅ **Es funktioniert, wenn:**
- Du siehst: "SYSTEM v2.0 — SUPABASE CONNECTED"
- Die 5 Beispielprodukte werden angezeigt
- Du kannst neue Produkte hinzufügen

---

## 🌐 Schritt 5: Auf Vercel deployen

### 5.1 GitHub Push

```bash
git add .
git commit -m "Add Supabase integration"
git push
```

### 5.2 Vercel Environment Variables

1. Gehe zu [vercel.com](https://vercel.com)
2. Wähle dein Projekt
3. **Settings** → **Environment Variables**
4. Füge hinzu:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://dein-projekt.supabase.co
```

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: dein-anon-key-hier
```

5. Klicke auf **"Save"**
6. **Deployments** → Neuestes Deployment → **"Redeploy"**

---

## 🔒 Schritt 6: Security (Optional)

### 6.1 RLS Policies verstehen

Die aktuelle Konfiguration erlaubt **jedem** Zugriff auf die Datenbank.

**Für Produktion:** Aktiviere Authentifizierung!

### 6.2 Authentifizierung aktivieren

1. Supabase Dashboard → **Authentication** → **Providers**
2. Aktiviere z.B. **Email**
3. In `supabase-setup.sql`: Kommentiere die sicheren Policies ein
4. Implementiere Login in der App

### 6.3 API Key rotieren

Falls dein Key leaked:
1. **Project Settings** → **API**
2. **"Reset API keys"**
3. Neue Keys in `.env.local` und Vercel eintragen

---

## 📊 Datenverwaltung

### Backup erstellen

1. **Database** → **Backups**
2. **"Enable backups"** (Free: Täglich, 7 Tage)

### Daten exportieren

```bash
# CSV Export über die App nutzen: [↓] CSV Button
```

Oder direkt in Supabase:
1. **Table Editor** → **products**
2. **"..."** → **"Export to CSV"**

### Daten importieren

1. **Table Editor** → **products**
2. **"Insert"** → **"Insert row"**

Oder über SQL:
```sql
INSERT INTO products (id, name, category, ...)
VALUES ('006', 'Neues Produkt', 'Kategorie', ...);
```

---

## 🐛 Troubleshooting

### "Invalid API key"

❌ **Problem:** `.env.local` nicht gefunden oder falsche Keys

✅ **Lösung:**
1. Prüfe, ob `.env.local` im **Root-Ordner** liegt
2. Restart Development Server: `npm run dev`
3. Keys nochmal aus Supabase kopieren

### "Row Level Security" Fehler

❌ **Problem:** RLS blockiert Zugriff

✅ **Lösung:**
1. Supabase → **Authentication** → **Policies**
2. Prüfe, ob alle 4 Policies existieren (SELECT, INSERT, UPDATE, DELETE)
3. Führe `supabase-setup.sql` nochmal aus

### "Network request failed"

❌ **Problem:** Supabase URL falsch oder Projekt pausiert

✅ **Lösung:**
1. Prüfe URL in `.env.local`
2. Supabase Dashboard → Projekt sollte "Active" sein
3. Free-Projekte pausieren nach 1 Woche Inaktivität → "Resume"

### Produkte werden nicht aktualisiert

❌ **Problem:** Cache oder alte Daten

✅ **Lösung:**
1. Browser neu laden (Hard Refresh: `Cmd/Ctrl + Shift + R`)
2. Supabase → **Table Editor** → Manuell Daten prüfen

---

## 💡 Tipps & Tricks

### Datenbank-Größe überwachen

1. **Settings** → **Usage**
2. Schau dir **Database Size** an (Free: 500 MB)

### Real-time aktivieren (Bonus)

```typescript
// In lib/supabase.ts hinzufügen:
const channel = supabase
  .channel('products-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'products' },
    (payload) => {
      console.log('Change:', payload);
      // Produkte neu laden
    }
  )
  .subscribe();
```

### Performance optimieren

Für > 1000 Produkte:
1. Indizes prüfen (schon in SQL enthalten)
2. Pagination einbauen
3. Lazy Loading verwenden

---

## 📚 Weitere Ressourcen

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js + Supabase:** [supabase.com/docs/guides/getting-started/quickstarts/nextjs](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- **SQL Tutorial:** [sqlzoo.net](https://sqlzoo.net)

---

## ✅ Checkliste

- [ ] Supabase Projekt erstellt
- [ ] SQL ausgeführt (`supabase-setup.sql`)
- [ ] Beispielprodukte in Table Editor sichtbar
- [ ] API Keys kopiert
- [ ] `.env.local` erstellt und befüllt
- [ ] `npm install` ausgeführt
- [ ] App lokal läuft (`npm run dev`)
- [ ] Produkte werden angezeigt
- [ ] Neues Produkt kann hinzugefügt werden
- [ ] Environment Variables in Vercel gesetzt
- [ ] App auf Vercel deployed

---

**Geschafft! 🎉 Deine App nutzt jetzt eine echte Datenbank!**
