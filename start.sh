#!/usr/bin/env bash
set -e

# ── Prerequisites check ─────────────────────────────────────────────────────
if ! which ruby >/dev/null 2>&1 && ! [ -f /usr/bin/ruby ]; then
  echo "Ruby is not installed. Install it from https://www.ruby-lang.org/en/documentation/installation/"
  exit 1
fi

if ! which bundle >/dev/null 2>&1; then
  echo "Bundler not found. Installing..."
  gem install bundler
fi

# ── Install gems if needed ───────────────────────────────────────────────────
if ! bundle check >/dev/null 2>&1; then
  echo "Installing gems..."
  bundle install
fi

# ── Kill any existing Jekyll process on port 4000 ───────────────────────────
if lsof -ti:4000 >/dev/null 2>&1; then
  echo "Port 4000 already in use — stopping existing process..."
  lsof -ti:4000 | xargs kill -9
fi

# ── Store PID for the stop script ───────────────────────────────────────────
echo "Starting Jekyll dev server..."
bundle exec jekyll serve --livereload --open-url &
echo $! > .jekyll.pid

echo ""
echo "  Leapath is running at → http://localhost:4000"
echo "  To stop: sh stop.sh"
echo ""
wait
