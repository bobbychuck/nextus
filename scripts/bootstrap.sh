#!/usr/bin/env bash
set -euo pipefail

if ! command -v flutter >/dev/null 2>&1; then
  echo "Error: Flutter is not installed or not on PATH." >&2
  echo "Install Flutter 3.22+ and re-run this script." >&2
  exit 1
fi

needs_create=0
for dir in android ios web; do
  if [[ ! -d "$dir" ]]; then
    needs_create=1
    break
  fi
done

if [[ "$needs_create" -eq 1 ]]; then
  echo "Generating missing Flutter platform folders (android, ios, web)..."
  flutter create --platforms=android,ios,web .
else
  echo "Platform folders already exist; skipping flutter create."
fi

echo "Fetching Dart/Flutter dependencies..."
flutter pub get

echo "Bootstrap complete."
