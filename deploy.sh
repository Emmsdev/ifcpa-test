#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/latioms/ifcpa-test"
LOG_FILE="/home/latioms/ifcpa-test/deploy.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Déploiement démarré" | tee -a "$LOG_FILE"

cd "$APP_DIR"

# Pull latest code
echo "→ git pull..."
git pull origin main 2>&1 | tee -a "$LOG_FILE"

# Install dependencies
echo "→ npm ci..."
npm ci 2>&1 | tee -a "$LOG_FILE"

# Build
echo "→ npm run build..."
npm run build 2>&1 | tee -a "$LOG_FILE"

# Restart the service
echo "→ redémarrage du service..."
sudo systemctl restart ifcpa-test 2>&1 | tee -a "$LOG_FILE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Déploiement terminé ✅" | tee -a "$LOG_FILE"
