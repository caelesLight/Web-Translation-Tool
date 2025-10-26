#!/bin/bash

# Farben für Ausgabe
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starte Sprach-Lern-Reader...${NC}\n"

# Prüfe ob node_modules existiert
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installiere Dependencies...${NC}"
    npm install
    echo ""
fi

# Starte Backend im Hintergrund
echo -e "${BLUE}🔧 Starte Backend (Port 3001)...${NC}"
node server.js &
BACKEND_PID=$!

# Warte kurz
sleep 2

# Starte Frontend im Hintergrund
echo -e "${BLUE}🌐 Starte Frontend (npx serve)...${NC}"
npx serve &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Alles läuft!${NC}"
echo ""
echo "📱 Frontend: http://localhost:3000 (oder der Port den serve anzeigt)"
echo "🔧 Backend:  http://localhost:3001"
echo ""
echo -e "${BLUE}Drücke CTRL+C zum Beenden beider Server${NC}"
echo ""

# Warte auf CTRL+C
trap "echo -e '\n${BLUE}🛑 Stoppe Server...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Halte Script am Laufen
wait
