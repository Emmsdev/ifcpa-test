#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/latioms/ifcpa-test"
LOG_FILE="/home/latioms/ifcpa-test/deploy.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Déploiement démarré" | tee -a "$LOG_FILE"

cd "$APP_DIR"

# Stash toute modif locale qui pourrait bloquer le pull
echo "→ git stash..."
git stash --include-untracked 2>&1 | tee -a "$LOG_FILE" || true

# Pull latest code
echo "→ git pull..."
git pull origin main 2>&1 | tee -a "$LOG_FILE"

# Install dependencies
echo "→ npm ci..."
npm ci 2>&1 | tee -a "$LOG_FILE"

# Load production env vars and build
echo "→ npm run build..."
if [ -f .env.production ]; then
  export $(grep -v '^#' .env.production | xargs)
fi
npm run build 2>&1 | tee -a "$LOG_FILE"

# Restart the service
echo "→ redémarrage du service..."
sudo systemctl restart ifcpa-test 2>&1 | tee -a "$LOG_FILE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Déploiement terminé ✅" | tee -a "$LOG_FILE"
