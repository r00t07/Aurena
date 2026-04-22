# 🚀 3D Print Inventory - Komplette Setup-Anleitung

## Für deinen Bruder - Alles Schritt für Schritt

Hey! Hier ist die komplette Anleitung, um deine 3D-Druck-Inventarverwaltung aufzusetzen.
Es dauert ca. **10-15 Minuten** und ist **komplett kostenlos**.

---

## 📋 Was du brauchst:

- [ ] GitHub Account (kostenlos)
- [ ] Supabase Account (kostenlos)
- [ ] Vercel Account (kostenlos)
- [ ] 15 Minuten Zeit

---

## 🗂️ Teil 1: Supabase einrichten (5 Minuten)

Supabase ist deine Datenbank - hier werden alle deine Produkte gespeichert.

### Schritt 1: Supabase Account erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf **"Start your project"**
3. Melde dich an mit **GitHub** (einfacher als E-Mail)
4. Bestätige deine E-Mail-Adresse

### Schritt 2: Neues Projekt erstellen

1. Klicke auf **"New Project"**
2. Fülle aus:
   ```
   Organization: [Wird automatisch erstellt]
   Name: 3d-print-inventory
   Database Password: [Wähle ein SICHERES Passwort - SPEICHERN!]
   Region: Europe Central (Frankfurt)
   Pricing Plan: Free
   ```
3. Klicke **"Create new project"**
4. ⏰ **Warte 2-3 Minuten** (Datenbank wird erstellt)
5. Du siehst dann "Project is ready" ✅

### Schritt 3: Datenbank aufsetzen

1. Im Supabase Dashboard → Klicke links auf **"SQL Editor"**
2. Klicke auf **"New query"**
3. Öffne die Datei `supabase-setup.sql` aus dem Projekt-Ordner
4. Kopiere den **kompletten Inhalt**
5. Füge ihn im SQL Editor ein
6. Klicke auf **"RUN"** (oder drücke `Cmd+Enter` / `Strg+Enter`)
7. Du siehst: ✅ **"Success. No rows returned"**

### Schritt 4: API-Schlüssel kopieren

1. Links im Menü → **"Project Settings"** (Zahnrad-Symbol ⚙️)
2. Klicke auf **"API"**
3. Du siehst zwei wichtige Werte - **KOPIERE BEIDE**:

**a) Project URL:**
```
https://xyz123abc.supabase.co
```

**b) anon public Key:** (langer Text, kopiere komplett)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **WICHTIG:** Nimm den **"anon public"** Key, NICHT den "service_role" Key!

4. **Speichere beide Werte** - du brauchst sie gleich!

### Schritt 5: Daten überprüfen

1. Links im Menü → **"Table Editor"**
2. Klicke auf die Tabelle **"products"**
3. Du solltest **5 Beispielprodukte** sehen (Dragon Figurine, Phone Stand, etc.)
4. ✅ **Perfekt!** Datenbank ist fertig

---

## 💻 Teil 2: Code auf deinen Computer (3 Minuten)

### Option A: Code-Download (einfacher)

1. Lade den Projekt-Ordner herunter (den du von mir bekommen hast)
2. Entpacke ihn
3. Öffne das Terminal/Kommandozeile
4. Wechsle in den Ordner:
   ```bash
   cd /pfad/zum/3d-print-inventory
   ```

### Option B: Von GitHub klonen (wenn du GitHub nutzt)

```bash
git clone https://github.com/DEIN-USERNAME/3d-print-inventory.git
cd 3d-print-inventory
```

---

## 🔧 Teil 3: Projekt konfigurieren (2 Minuten)

### Schritt 1: Environment Variables erstellen

1. Im Projekt-Ordner: Erstelle eine neue Datei namens **`.env.local`**
2. Öffne sie mit einem Text-Editor
3. Füge folgendes ein:

```env
NEXT_PUBLIC_SUPABASE_URL=DEINE_URL_HIER
NEXT_PUBLIC_SUPABASE_ANON_KEY=DEIN_KEY_HIER
```

4. Ersetze `DEINE_URL_HIER` mit deiner URL aus Schritt 4a
5. Ersetze `DEIN_KEY_HIER` mit deinem Key aus Schritt 4b

**Beispiel:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abc123xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

6. **Speichern!**

### Schritt 2: Dependencies installieren

```bash
npm install
```

⏰ Dauert 1-2 Minuten

### Schritt 3: App lokal testen

```bash
npm run dev
```

Öffne im Browser: **http://localhost:3000**

✅ **Du solltest sehen:**
- "SYSTEM v2.0 — SUPABASE CONNECTED"
- 5 Beispielprodukte
- Alles funktioniert!

**🎉 Super! Lokal läuft alles!**

---

## 🌐 Teil 4: Online stellen mit Vercel (5 Minuten)

Jetzt machen wir die App für alle erreichbar!

### Schritt 1: GitHub Repository erstellen

1. Gehe zu [github.com](https://github.com)
2. Oben rechts → **"+"** → **"New repository"**
3. Fülle aus:
   ```
   Repository name: 3d-print-inventory
   Description: Meine 3D-Druck Inventarverwaltung
   Public ✅ (oder Private, deine Wahl)
   ❌ NICHT "Add README" anklicken!
   ```
4. Klicke **"Create repository"**

### Schritt 2: Code hochladen

Im Terminal (im Projekt-Ordner):

```bash
git init
git add .
git commit -m "Initial commit: 3D Print Inventory"
git remote add origin https://github.com/DEIN-USERNAME/3d-print-inventory.git
git branch -M main
git push -u origin main
```

⚠️ **Ersetze `DEIN-USERNAME`** mit deinem GitHub-Benutzernamen!

Wenn nach Login gefragt:
- Username: Dein GitHub-Name
- Password: **Personal Access Token** (nicht dein normales Passwort!)
  - Token erstellen: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Scope: "repo" auswählen

### Schritt 3: Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke **"Sign Up"**
3. Wähle **"Continue with GitHub"**
4. Autorisiere Vercel

### Schritt 4: Projekt deployen

1. Klicke auf **"Add New..."** → **"Project"**
2. Wähle dein Repository **"3d-print-inventory"** aus
3. Klicke auf **"Import"**

### Schritt 5: Environment Variables eintragen

⚠️ **WICHTIG!** Sonst funktioniert die App online nicht!

1. Im Vercel-Setup siehst du **"Environment Variables"**
2. Füge **2 Variablen** hinzu:

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: [Deine Supabase URL von oben]
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Dein Supabase Anon Key von oben]
```

3. Klicke auf **"Deploy"**
4. ⏰ Warte 1-2 Minuten

### Schritt 6: Fertig! 🎉

Vercel zeigt dir jetzt deine **Live-URL**:
```
https://3d-print-inventory-xyz123.vercel.app
```

✅ **Deine App ist jetzt LIVE im Internet!**

---

## 📱 App nutzen

### Login/Zugriff

- Aktuell kann **jeder** auf die App zugreifen (keine Login-Pflicht)
- Alle Daten sind in **deiner** Supabase-Datenbank
- Falls du später Login willst → siehe unten "Authentifizierung aktivieren"

### Features nutzen

**Tab: PRODUKTE**
- `[+] NEU`: Neues Produkt hinzufügen
- `[↓] CSV`: Alle Produkte als Excel exportieren
- `[↓] STATS`: Statistiken exportieren
- Suchfeld: Nach Name/Farbe suchen
- Filter: Nach Kategorie filtern

**Pro Produkt:**
- `[+1]` / `[-1]`: Bestand erhöhen/verringern
- `[VERKAUFT]`: Verkauf buchen (Bestand -1, Verkäufe +1)
- `[X]`: Produkt löschen

**Tab: ANALYTICS**
- Kategorien-Übersicht
- Material-Statistiken
- Top 5 Bestseller
- Warnungen (niedriger Bestand)
- Durchschnittswerte

---

## 🔄 Updates deployen

Wenn du später Code-Änderungen machst:

```bash
git add .
git commit -m "Meine Änderung"
git push
```

Vercel deployed **automatisch**! 🚀

---

## 🔒 Authentifizierung aktivieren (Optional)

Falls du willst, dass nur **du** Zugriff hast:

1. Supabase Dashboard → **Authentication** → **Providers**
2. Aktiviere **Email**
3. Erstelle einen User (Authentication → Users → Invite user)
4. In der App musst du dann Login-Code einbauen (siehe Supabase Docs)

---

## 💾 Daten sichern

### Automatische Backups

1. Supabase Dashboard → **Database** → **Backups**
2. Klicke **"Enable backups"**
3. Free-Plan: Täglich, 7 Tage gespeichert

### Manuelles Backup

- Nutze den `[↓] CSV` Button in der App
- Oder: Supabase → Table Editor → products → "..." → Export to CSV

---

## 🐛 Probleme lösen

### "Invalid API key"

✅ **Lösung:**
1. Prüfe `.env.local` - Keys richtig kopiert?
2. Vercel → Settings → Environment Variables - Keys gesetzt?
3. Nach Änderung: Vercel → Deployments → "Redeploy"

### "Fetch failed" / Keine Daten

✅ **Lösung:**
1. Supabase Projekt läuft? (Dashboard checken)
2. SQL ausgeführt? (Table Editor → products sollte existieren)
3. RLS Policies aktiv? (SQL nochmal ausführen)

### App lokal läuft, online nicht

✅ **Lösung:**
- Environment Variables in Vercel vergessen!
- Vercel → Settings → Environment Variables → Beide Keys eintragen

---

## 📞 Hilfe & Support

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

Bei Fragen: Schreib deinem Bruder (Memo) 😉

---

## ✅ Finale Checkliste

- [ ] Supabase Account erstellt
- [ ] Projekt "3d-print-inventory" erstellt
- [ ] SQL ausgeführt (supabase-setup.sql)
- [ ] 5 Beispielprodukte in Table Editor sichtbar
- [ ] API URL + Anon Key kopiert
- [ ] `.env.local` erstellt mit beiden Keys
- [ ] `npm install` ausgeführt
- [ ] `npm run dev` funktioniert lokal
- [ ] GitHub Repository erstellt
- [ ] Code gepusht
- [ ] Vercel Account erstellt
- [ ] Environment Variables in Vercel gesetzt
- [ ] App deployed
- [ ] Live-URL funktioniert

---

**🎉 GESCHAFFT! Du hast jetzt deine eigene professionelle Inventarverwaltung!**

Viel Erfolg mit deinem 3D-Druck-Business! 🚀
