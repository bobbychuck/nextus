/**
 * @typedef {Object} AthleteProfile
 * @property {string} id
 * @property {string} displayName
 * @property {'runner'|'cyclist'|'multi-sport'} primaryDiscipline
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} sourceDeviceId
 */

/**
 * @typedef {Object} ActivityTrackPoint
 * @property {string} id
 * @property {string} activityId
 * @property {number} ts Unix epoch in milliseconds
 * @property {number} lat
 * @property {number} lon
 * @property {number|null} altitudeMeters
 * @property {number|null} heartRateBpm
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} athleteProfileId
 * @property {'run'|'ride'|'hike'} sport
 * @property {number} startedAt
 * @property {number} endedAt
 * @property {number} distanceMeters
 * @property {number} elevationGainMeters
 * @property {string} sourceDeviceId
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ExportManifest
 * @property {string} schemaVersion
 * @property {string} exportedAt
 * @property {string} sourceDeviceId
 * @property {string[]} includedEntityTypes
 */

export const schemaVersion = '0.1.0';

/**
 * @returns {ExportManifest}
 */
export function createExportManifest() {
  return {
    schemaVersion,
    exportedAt: new Date().toISOString(),
    sourceDeviceId: 'local-device',
    includedEntityTypes: [
      'athlete_profile',
      'activity',
      'activity_trackpoint',
      'lap',
      'segment',
      'segment_effort',
      'route',
      'device_source',
      'export_job'
    ]
  };
}
