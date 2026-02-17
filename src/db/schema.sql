PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS athlete_profile (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  primary_discipline TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_device_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS activity (
  id TEXT PRIMARY KEY,
  athlete_profile_id TEXT NOT NULL,
  sport TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  ended_at INTEGER NOT NULL,
  distance_meters REAL NOT NULL DEFAULT 0,
  elevation_gain_meters REAL NOT NULL DEFAULT 0,
  source_device_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (athlete_profile_id) REFERENCES athlete_profile(id)
);

CREATE TABLE IF NOT EXISTS activity_trackpoint (
  id TEXT PRIMARY KEY,
  activity_id TEXT NOT NULL,
  ts INTEGER NOT NULL,
  lat REAL NOT NULL,
  lon REAL NOT NULL,
  altitude_meters REAL,
  heart_rate_bpm REAL,
  FOREIGN KEY (activity_id) REFERENCES activity(id)
);

CREATE INDEX IF NOT EXISTS idx_trackpoint_activity_ts
ON activity_trackpoint(activity_id, ts);
