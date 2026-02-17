# Nextus: Local-First Athlete Platform Blueprint

## 1) Product Direction

### Mission
Build a high-performance training app for runners and cyclists where:
- Data stays on the user's device by default.
- User controls all exports/imports.
- No ads, no data brokerage, no hidden monetization.

### Positioning (USP)
**"Your training OS, not a social network harvesting your workouts."**

Core differentiators:
1. **Local-first storage** (no mandatory cloud account).
2. **Advanced coaching insights** on-device.
3. **Optional social layers** through explicit, user-controlled sharing.
4. **Open data model** and one-click export.

---

## 2) MVP Scope (v0.1)

### Must-have features
1. **Activity recording**
   - GPS track recording (lat/lon/time).
   - Distance, pace/speed, elevation gain.
   - Auto-pause and manual laps.

2. **Health/device integrations**
   - Apple Health / HealthKit import-export.
   - Google Health Connect import-export.
   - GPX/FIT file import for Garmin/Wahoo workflows.

3. **Analysis**
   - Splits, pace zones, HR zones.
   - Power charts (for cycling when available).
   - Route replay on map.

4. **Route and segment intelligence**
   - User-created segments.
   - Personal best tracking.
   - Offline route builder and turn hints.

5. **Social (minimal, explicit)**
   - Local clubs/events as opt-in feed packs.
   - Share-by-link export package generated on device.
   - No global public-by-default feed.

---

## 3) Local-First Architecture (No Cloud Required)

## High-level architecture

```text
+---------------------------+
| Mobile App (RN/Flutter)   |
| - GPS capture             |
| - Charts/UI               |
| - Route planning          |
+------------+--------------+
             |
             v
+---------------------------+
| Local Data Layer          |
| - SQLite + spatial index  |
| - File vault (FIT/GPX)    |
| - On-device analytics     |
+------------+--------------+
             |
             v
+---------------------------+
| Sync/Share Engine         |
| - Local network sync      |
| - End-to-end encrypted    |
| - User-triggered export   |
+---------------------------+
```

### Storage model
- **Primary DB:** SQLite (or SQLCipher for encryption at rest).
- **Activity streams:** stored as compressed polyline + sample tables.
- **Attachments:** FIT/GPX/original uploads in app private storage.
- **Derived analytics cache:** generated locally, rebuildable.

### Security model
- Device-level encryption + app passcode/biometric lock.
- Local signing keys generated per device.
- Export bundles encrypted (age/XChaCha20-Poly1305 equivalent).

### Sync model (optional)
- Default: **no remote sync**.
- Optional peer sync:
  - Same-account devices sync via local network and QR key exchange.
  - Community share uses explicit exported bundle uploads to chosen channels.

---

## 4) Suggested Tech Stack

### Client
- **React Native + TypeScript** (fast cross-platform team velocity).
- Map rendering: **MapLibre GL** (open-source map stack).
- Charts: Victory Native/Recharts equivalent.

### Data + analysis
- SQLite + Drizzle/Kysely wrappers.
- Geospatial calculations in Rust/WASM module (optional for performance):
  - elevation smoothing
  - segment matching
  - route simplification

### Device integrations
- iOS: HealthKit, CoreLocation, Motion.
- Android: Health Connect, FusedLocationProvider.
- File ingestion: FIT parser + GPX parser.

### Optional backend (non-core)
If needed for updates/community metadata only:
- Static metadata service (event catalogs) without workout ingestion.
- No centralized raw activity storage.

---

## 5) Data Model (MVP)

### Core entities
- `athlete_profile` (local identity + preferences)
- `activity`
- `activity_trackpoint`
- `lap`
- `segment`
- `segment_effort`
- `route`
- `device_source`
- `export_job`

### Principles
- Every record has `created_at`, `updated_at`, `source_device_id`.
- All personally identifying fields user-editable/removable.
- Export format includes complete schema + versioning manifest.

---

## 6) User Flows

1. **Onboarding**
   - Create local profile (no email required).
   - Choose lock method + backup phrase.
   - Import from FIT/GPX/Health provider.

2. **Record workout**
   - Start GPS session.
   - Live stats + lap button.
   - End + save + instant local analytics.

3. **Compare performance**
   - Pick route or segment.
   - Compare vs. previous efforts.
   - Get readiness/fatigue hint from trend model.

4. **Share activity**
   - Choose fields (hide HR, hide map start/end, blur home zone).
   - Generate encrypted package/link.
   - Recipient imports to view.

---

## 7) Analytics & Coaching (On-device AI)

### v1 analytics
- Training load (acute/chronic).
- Fatigue trend.
- Estimated threshold pace/power.
- Route difficulty normalization (grade/weather proxy when available).

### v2 AI coaching
- Personalized workout suggestions based on recent load.
- Overtraining risk flags.
- Goal projections (5k, half marathon, FTP).

All inference runs locally or in user-hosted model runtime.

---

## 8) Development Roadmap

### Phase 1 (6-8 weeks)
- Local profile + secure storage.
- GPS recording.
- Basic activity detail view + charts.
- GPX import/export.

### Phase 2 (8-10 weeks)
- FIT support.
- Segment creation + PB detection.
- Route builder + offline tiles.
- Health integrations.

### Phase 3 (10-12 weeks)
- Peer device sync.
- Selective sharing controls.
- On-device coaching insights.

---

## 9) Monetization for a No-Ads Product

Since there is no data monetization:
- One-time paid app + major upgrade cycle.
- Optional paid plugin packs (advanced coaching models).
- Self-host toolkit for teams/coaches (user-owned infra).

No feature should require surrendering raw workout data to centralized servers.

---

## 10) Success Criteria

### Product
- Time-to-first-activity < 3 minutes.
- 95% successful activity saves without network.
- Export/import round-trip fidelity > 99% fields.

### Trust
- Clear privacy dashboard in app.
- Data portability in 1 tap.
- Zero hidden background uploads of activity payloads.

---

## 11) First Build Tasks (Actionable)

1. Scaffold React Native app with TypeScript.
2. Implement `ActivityRecorder` service with background location handling.
3. Add local SQLite schema and migration system.
4. Build `ActivityDetailScreen` with map + split charts.
5. Implement GPX import/export pipeline.
6. Add privacy controls (home zone obfuscation + metadata toggles).

This sequence gets to a real, testable MVP quickly while preserving your core promise: **local data ownership first**.
