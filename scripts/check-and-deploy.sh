#!/bin/bash

# Script to check for breed data updates and deploy automatically
# Run every 20 minutes via cron

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$REPO_DIR/logs/auto-deploy.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Function to log messages
log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

cd "$REPO_DIR"

log "=== Starting breed data check ==="

# Check if there are any changes in breed data
if git diff --quiet packages/data/src/data/breeds/ 2>/dev/null; then
    log "No changes detected in breed data"
    exit 0
fi

# Show what changed
CHANGED_FILES=$(git diff --name-only packages/data/src/data/breeds/)
CHANGED_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')

log "Found $CHANGED_COUNT modified breed files:"
log "$CHANGED_FILES"

# Add all changes
git add -A

# Commit with descriptive message
COMMIT_MESSAGE="feat: auto-update breed data from enrichment agent

Updated breed JSON files with enhanced information:
- Corrected ficha_tecnica specifications
- Enhanced apelidos (nicknames)
- Updated characteristics and temperament ratings

Auto-generated: $TIMESTAMP
Co-Authored-By: Auto-Deploy <noreply@tutorcanino.com.br>"

git commit -m "$COMMIT_MESSAGE" 2>/dev/null || {
    log "No new changes to commit (might be already committed)"
    exit 0
}

# Push to GitHub
log "Pushing changes to GitHub..."
git push origin main

log "=== Changes pushed successfully ==="

# Optional: Trigger Netlify deploy via API if needed
# NETLIFY_WEBHOOK_URL="${NETLIFY_WEBHOOK_URL:-}"
# if [ -n "$NETLIFY_WEBHOOK_URL" ]; then
#     log "Triggering Netlify deploy..."
#     curl -s -X POST "$NETLIFY_WEBHOOK_URL" || log "Failed to trigger Netlify deploy"
# fi

log "=== Auto-deploy completed ==="
