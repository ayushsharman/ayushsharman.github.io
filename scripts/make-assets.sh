#!/usr/bin/env bash
# Builds the site and screenshots the hero into public/og.png, the link-preview image.
set -euo pipefail
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npm run build >/dev/null
npx astro preview --port 4329 >/dev/null 2>&1 &
trap 'lsof -ti tcp:4329 | xargs kill 2>/dev/null || true' EXIT
sleep 3
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=4000 --screenshot="$PWD/public/og.png" "http://localhost:4329/?og=1" 2>/dev/null
echo "assets written"
