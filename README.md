# Web Translation Tool - README

## 🚀 Schnellstart

### 1. Installation

Zuerst die Dependencies installieren:

```bash
npm install
```

### 2. Server starten

#### Option A: Automatisch (empfohlen!)

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
start.bat
```
(oder Doppelklick auf die Datei)

Das Start-Script startet automatisch beide Server!

#### Option B: Manuell (2 Terminals)

**Terminal 1** - Backend-Server (für Import):
```bash
node server.js
```
Läuft auf `http://localhost:3001`

**Terminal 2** - Frontend (Webseite):
```bash
npx serve
```
Läuft auf `http://localhost:3000` (oder einem anderen Port)

> **Wichtig:** Beide Server müssen gleichzeitig laufen!

---

## 📥 Neue Texte hinzufügen (NEU & EINFACH!)

### Methode 1: Import-Funktion (Empfohlen!)

1. **JSON generieren:** Nutze den Prompt in `prompt.txt` mit der KI
2. **Kopieren:** Kopiere das komplette JSON von der KI
3. **Importieren:** 
   - Klicke auf der Webseite auf **"📥 JSON Import"**
   - Füge das JSON ein
   - Klick auf **"✓ Importieren"**
4. **Fertig!** Die Datei wird automatisch erstellt und in der Liste angezeigt

### Methode 2: Manuell (wie bisher)

1. JSON-Datei in `texte/` Ordner erstellen
2. `catalog.json` manuell aktualisieren

---

## 📁 Ordnerstruktur

```
/project-root
  ├── texte/
  │   ├── example1.json
  │   ├── example2.json
  │   └── catalog.json
  ├── index.html
  ├── server.js          ← NEU: Backend für Import
  ├── package.json       ← NEU: Dependencies
  ├── start.sh           ← NEU: Auto-Start für Linux/Mac
  ├── start.bat          ← NEU: Auto-Start für Windows
  ├── prompt.txt
  └── README.md
```

---

## 🎯 JSON Format

Dein JSON muss mindestens diese Felder enthalten:

```json
{
  "id": "eindeutige-id",
  "title": "Titel des Textes",
  "language": "id",
  "original_text": "Der Text in der Originalsprache...",
  "dictionary": {
    "Wort1": "Übersetzung1",
    "Wort2": "Übersetzung2"
  },
  "full_translation": "Komplette deutsche Übersetzung..."
}
```

**Wichtig:**
- `id` muss eindeutig sein (keine Duplikate!)
- `id` wird als Dateiname verwendet: `{id}.json`
- `original_text` und mindestens `dictionary` sind Pflicht
- `full_translation` ist optional aber empfohlen

---

## ⚠️ Troubleshooting

### "Backend nicht erreichbar!"
- ✅ Prüfe: Läuft `node server.js` in einem Terminal?
- ✅ Prüfe: Läuft es auf Port 3001? (Ausgabe: `🚀 Import-Server läuft auf http://localhost:3001`)
- ✅ Nutze das Start-Script: `./start.sh` oder `start.bat`

### "Datei existiert bereits"
- Die `id` in deinem JSON existiert schon
- Wähle eine andere ID oder lösche die alte Datei im `texte/` Ordner

### JSON-Fehler beim Import
- Überprüfe das JSON-Format mit einem Validator (z.B. jsonlint.com)
- Achte auf: Keine trailing commas, alle Strings in Anführungszeichen
- Beispiel für **falsch**: `{"id": "test",}` (Komma am Ende)
- Beispiel für **richtig**: `{"id": "test"}`

### Texte werden nicht angezeigt
- Aktualisiere die Seite (F5)
- Prüfe Browser-Konsole (F12) auf Fehler
- Prüfe ob `catalog.json` im `texte/` Ordner existiert und korrekt ist

### npm install Fehler
- Prüfe ob `package.json` im Root-Ordner existiert
- Stelle sicher dass Node.js installiert ist: `node --version`
- Lösche `node_modules/` und `package-lock.json`, dann nochmal `npm install`

---

## 💡 Tipps

1. **Prompt anpassen:** In `prompt.txt` die Zielsprache anpassen:
   ```
   "The target language for the translation is German."
   ```

2. **Mehrere Texte importieren:** Einfach nacheinander importieren, jeder bekommt seine eigene Datei

3. **IDs benennen:** Nutze sprechende IDs wie `indonesisch-fenster`, `spanisch-artikel1` etc.

4. **Server permanent laufen lassen:** 
   - Nutze `npm run dev` statt `node server.js` für Auto-Reload bei Änderungen
   - Oder nutze das Start-Script: `./start.sh` bzw. `start.bat`

5. **Port bereits belegt?** Siehe Abschnitt "Erweiterte Nutzung"

---

## 🔧 Erweiterte Nutzung

### Server auf anderem Port starten

Wenn Port 3001 bereits belegt ist:

**In `server.js` Zeile 7 ändern:**
```javascript
const PORT = 3001; // Ändere hier den Port, z.B. 3002
```

**Dann in `index.html` Zeile 103 anpassen:**
```javascript
const IMPORT_API = 'http://localhost:3002/api/import'; // Neuer Port
```

### API direkt nutzen (für Fortgeschrittene)

Du kannst auch direkt die API nutzen:

```bash
curl -X POST http://localhost:3001/api/import \
  -H "Content-Type: application/json" \
  -d @mein-text.json
```

Oder mit einem JSON-String:
```bash
curl -X POST http://localhost:3001/api/import \
  -H "Content-Type: application/json" \
  -d '{"id":"test","title":"Test","original_text":"Hello","dictionary":{}}'
```

### Eigenes Start-Script anpassen

Du kannst die Start-Scripts (`start.sh` / `start.bat`) nach deinen Bedürfnissen anpassen:
- Andere Ports verwenden
- Zusätzliche Befehle hinzufügen
- Browser automatisch öffnen

---

## 📝 Alter Workflow (zur Referenz)

Falls du ohne Backend arbeiten möchtest:

1. JSON mit KI erstellen
2. Datei manuell in `texte/` speichern (z.B. `texte/mein-text.json`)
3. `catalog.json` manuell bearbeiten:

```json
[
  {
    "id": "example1",
    "title": "Mein Titel",
    "file": "texte/example1.json",
    "language": "id"
  }
]
```

4. Seite neu laden

---

## 🆘 Support

- **Backend-Logs:** Terminal mit `node server.js` zeigt alle Aktivitäten
- **Browser-Konsole:** F12 → Console für Frontend-Fehler
- **JSON validieren:** https://jsonlint.com/
- **Server-Status prüfen:** Öffne `http://localhost:3001/api/health` im Browser

---

## 🎉 Features

### Haupt-Features
- ✅ Hover für schnelle Übersetzungen
- ✅ Klick für detaillierte Infos
- ✅ TTS (Text-to-Speech) für Original-Text
- ✅ Vollständige Übersetzung anzeigen
- ✅ Mehrsprachige Texte unterstützt

### Neue Features (v2.0)
- ✅ **Ein-Klick JSON Import**
- ✅ **Automatische Dateierstellung**
- ✅ **Automatische Catalog-Aktualisierung**
- ✅ **Start-Scripts für einfachen Start**
- ✅ **Fehlerbehandlung und Status-Meldungen**

---

## 📖 Beispiel-Workflow

### Kompletter Workflow von Anfang bis Ende:

1. **Erste Installation:**
   ```bash
   npm install
   ```

2. **Server starten:**
   ```bash
   ./start.sh    # Linux/Mac
   start.bat     # Windows
   ```

3. **Neuen Text erstellen:**
   - Öffne `prompt.txt` und kopiere den Prompt
   - Gib deinen Text an die KI (z.B. ChatGPT, Claude)
   - Kopiere das generierte JSON

4. **Text importieren:**
   - Öffne `http://localhost:3000` im Browser
   - Klicke auf "📥 JSON Import"
   - Füge das JSON ein
   - Klicke "✓ Importieren"

5. **Text lesen:**
   - Wähle den Text in der Sidebar
   - Hover über Wörter für schnelle Übersetzung
   - Klicke auf Wörter für Details
   - Nutze "▶️ Play" für TTS
   - Nutze "Übersetzung" für komplette deutsche Version

---

## 📋 Checkliste für neue Nutzer

- [ ] Node.js installiert? (`node --version`)
- [ ] Dependencies installiert? (`npm install`)
- [ ] `texte/` Ordner existiert?
- [ ] `catalog.json` existiert? (Kann leer sein: `[]`)
- [ ] Start-Script ausführbar gemacht? (`chmod +x start.sh` für Linux/Mac)
- [ ] Beide Server laufen? (Backend + Frontend)
- [ ] Browser auf `http://localhost:3000` geöffnet?

---

## 🔄 Updates & Wartung

### Projekt aktualisieren
```bash
# Dependencies aktualisieren
npm update

# Oder komplett neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Backup erstellen
Sichere regelmäßig deinen `texte/` Ordner:
```bash
cp -r texte/ texte_backup_$(date +%Y%m%d)/
```

---

## 🌟 Sprachen-Codes Referenz

Häufig verwendete Sprach-Codes für das `language` Feld:

- `de` - Deutsch
- `en` - Englisch
- `es` - Spanisch
- `fr` - Französisch
- `it` - Italienisch
- `id` - Indonesisch
- `pt` - Portugiesisch
- `nl` - Niederländisch
- `pl` - Polnisch
- `ru` - Russisch
- `ja` - Japanisch
- `zh` - Chinesisch
- `ko` - Koreanisch
- `ar` - Arabisch
- `tr` - Türkisch

---

## ❓ FAQ

**Q: Muss ich immer beide Server starten?**  
A: Ja, für die Import-Funktion. Ohne Backend kannst du nur bestehende Texte lesen.

**Q: Kann ich das ohne Terminal nutzen?**  
A: Auf Windows: Doppelklick auf `start.bat`. Auf Mac/Linux: Terminal nötig.

**Q: Wo werden die Texte gespeichert?**  
A: Lokal im `texte/` Ordner als JSON-Dateien.

**Q: Kann ich die Webseite online hosten?**  
A: Ja, aber du brauchst dann auch einen gehosteten Backend-Server (z.B. auf Heroku, Railway, etc.)

**Q: Funktioniert es offline?**  
A: Ja! Alles läuft lokal, keine Internet-Verbindung nötig (außer für `npm install` und `npx serve`).

---

**Viel Erfolg beim Sprachenlernen! 🎓📚**
