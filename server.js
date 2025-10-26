const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Import endpoint
app.post('/api/import', async (req, res) => {
    try {
        const jsonData = req.body;

        // Validierung
        if (!jsonData.id || !jsonData.title || !jsonData.original_text) {
            return res.status(400).json({
                error: 'JSON muss mindestens id, title und original_text enthalten'
            });
        }

        const filename = `${jsonData.id}.json`;
        const filepath = path.join(__dirname, 'texte', filename);

        // Prüfen ob Datei bereits existiert
        try {
            await fs.access(filepath);
            return res.status(409).json({
                error: `Datei ${filename} existiert bereits. Bitte wähle eine andere ID.`
            });
        } catch {
            // Datei existiert nicht, gut so
        }

        // JSON-Datei erstellen
        await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log(`✓ Datei erstellt: ${filename}`);

        // catalog.json aktualisieren
        const catalogPath = path.join(__dirname, 'texte', 'catalog.json');
        let catalog = [];

        try {
            const catalogContent = await fs.readFile(catalogPath, 'utf8');
            catalog = JSON.parse(catalogContent);
        } catch {
            console.log('catalog.json nicht gefunden, erstelle neue...');
        }

        // Neuen Eintrag hinzufügen
        const newEntry = {
            id: jsonData.id,
            title: jsonData.title,
            file: `texte/${filename}`,
            language: jsonData.language || jsonData.lang || 'unknown'
        };

        catalog.push(newEntry);

        // catalog.json speichern
        await fs.writeFile(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
        console.log(`✓ catalog.json aktualisiert`);

        res.json({
            success: true,
            message: `Text "${jsonData.title}" erfolgreich importiert!`,
            filename: filename
        });

    } catch (error) {
        console.error('Fehler beim Import:', error);
        res.status(500).json({
            error: 'Fehler beim Speichern: ' + error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Import-Server läuft' });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Import-Server läuft auf http://localhost:${PORT}`);
    console.log(`📝 Bereit für JSON-Imports!\n`);
});
