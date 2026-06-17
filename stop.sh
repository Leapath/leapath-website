#!/usr/bin/env bash

STOPPED=0

# ── Kill by saved PID ────────────────────────────────────────────────────────
if [ -f .jekyll.pid ]; then
  PID=$(cat .jekyll.pid)
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID"
    echo "Stopped Jekyll (pid $PID)"
    STOPPED=1
  fi
  rm -f .jekyll.pid
fi

# ── Kill anything still holding port 4000 ───────────────────────────────────
if lsof -ti:4000 >/dev/null 2>&1; then
  lsof -ti:4000 | xargs kill -9
  echo "Cleared port 4000"
  STOPPED=1
fi

if [ $STOPPED -eq 0 ]; then
  echo "No running Jekyll server found"
fi
