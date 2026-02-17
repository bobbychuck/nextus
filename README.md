# Nextus

Local-first, privacy-first endurance app primitives for a "Strava killer" where users fully own their fitness data.

## What is implemented now

This repository now instantiates core building blocks from the blueprint:
- local domain entities and export manifest model
- home-zone obfuscation utility for privacy-safe sharing
- encrypted local export bundle helper (AES-256-GCM)
- in-memory `ActivityRecorder` prototype service
- starter SQLite schema for activity and trackpoint storage
- Node tests for privacy and export crypto flows

## Run checks

```bash
npm test
```

## Docs

Product + architecture blueprint: [`docs/local-first-athlete-platform.md`](docs/local-first-athlete-platform.md).
