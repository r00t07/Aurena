# 🚀 Deployment Guide

## GitHub Upload + Vercel Deployment

### Schritt 1: GitHub Repository erstellen

1. Gehe zu [github.com](https://github.com)
2. Klicke oben rechts auf **"+"** → **"New repository"**
3. Repository Name: `3d-print-inventory` (oder ein anderer Name)
4. Beschreibung: "Inventarverwaltung für 3D-gedruckte Produkte"
5. **Public** oder **Private** (deine Wahl)
6. ❌ **NICHT** "Add a README file" ankreuzen
7. Klicke auf **"Create repository"**

### Schritt 2: Code auf GitHub hochladen

Öffne ein Terminal im Projekt-Ordner und führe folgende Befehle aus:

```bash
# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit: 3D Print Inventory System"

# Remote Repository verbinden
# WICHTIG: Ersetze "DEIN-USERNAME" mit deinem GitHub-Benutzernamen!
git remote add origin https://github.com/DEIN-USERNAME/3d-print-inventory.git

# Branch in 'main' umbenennen
git branch -M main

# Code hochladen
git push -u origin main
```

**Wenn du nach Benutzername/Passwort gefragt wirst:**
- Benutzername: Dein GitHub-Username
- Passwort: Verwende einen **Personal Access Token** (nicht dein normales Passwort!)
  - Token erstellen: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
  - Scopes: Mindestens **"repo"** auswählen

### Schritt 3: Vercel Deployment

1. **Vercel Account erstellen**
   - Gehe zu [vercel.com](https://vercel.com)
   - Klicke auf **"Sign Up"**
   - Wähle **"Continue with GitHub"**
   - Autorisiere Vercel

2. **Projekt importieren**
   - Klicke auf **"Add New..."** → **"Project"**
   - Wähle dein GitHub Repository aus der Liste
   - Klicke auf **"Import"**

3. **Deployment konfigurieren**
   - **Project Name**: `3d-print-inventory` (oder anpassen)
   - **Framework Preset**: Next.js (wird automatisch erkannt)
   - **Root Directory**: `./` (Standard)
   - **Build Command**: `npm run build` (Standard)
   - **Output Directory**: `.next` (Standard)
   - ✅ Alle Standardeinstellungen sind korrekt!

4. **Deploy starten**
   - Klicke auf **"Deploy"**
   - Warte ca. 1-2 Minuten
   - ✅ **Fertig!** Deine App ist live!

### Schritt 4: Live-URL aufrufen

Nach erfolgreichem Deployment zeigt Vercel dir die URL an:
```
https://3d-print-inventory-xyz123.vercel.app
```

**Glückwunsch! 🎉** Deine Inventory-App ist jetzt online!

---

## Updates deployen

Wenn du Änderungen am Code machst:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Vercel deployed automatisch jeden neuen Push auf GitHub! 🚀

---

## Eigene Domain verbinden (Optional)

1. Gehe zu deinem Vercel Projekt
2. Klicke auf **"Settings"** → **"Domains"**
3. Füge deine Domain hinzu (z.B. `inventory.deinedomain.de`)
4. Folge den DNS-Anweisungen

---

## Troubleshooting

### "Permission denied" beim Push
→ Verwende einen Personal Access Token statt Passwort

### Build-Fehler bei Vercel
→ Prüfe, ob `npm run build` lokal funktioniert:
```bash
npm run build
```

### 404-Fehler nach Deployment
→ Stelle sicher, dass `app/page.tsx` existiert

---

## Hilfe & Support

- **Vercel Dokumentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Dokumentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Guides**: [guides.github.com](https://guides.github.com)

Bei Problemen erstelle ein Issue im GitHub Repository.
