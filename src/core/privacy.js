/**
 * Obfuscate coordinates around a sensitive location.
 *
 * For the first/last points within a protected radius, replace them with the
 * boundary point of that radius so the user's exact home location is hidden.
 *
 * @param {{lat:number, lon:number}[]} points
 * @param {{lat:number, lon:number}} home
 * @param {number} protectedRadiusMeters
 */
export function obfuscateHomeZone(points, home, protectedRadiusMeters = 300) {
  if (!Array.isArray(points) || points.length === 0) return [];

  return points.map((point) => {
    const d = haversineMeters(point.lat, point.lon, home.lat, home.lon);
    if (d >= protectedRadiusMeters) {
      return { ...point };
    }

    const bearing = calculateBearing(home.lat, home.lon, point.lat, point.lon);
    return projectPoint(home.lat, home.lon, protectedRadiusMeters, bearing);
  });
}

function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const p1 = toRad(lat1);
  const p2 = toRad(lat2);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calculateBearing(lat1, lon1, lat2, lon2) {
  const p1 = toRad(lat1);
  const p2 = toRad(lat2);
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dLon);
  return Math.atan2(y, x);
}

function projectPoint(lat, lon, distanceMeters, bearingRad) {
  const R = 6371e3;
  const p1 = toRad(lat);
  const l1 = toRad(lon);
  const angular = distanceMeters / R;

  const p2 = Math.asin(
    Math.sin(p1) * Math.cos(angular) +
      Math.cos(p1) * Math.sin(angular) * Math.cos(bearingRad)
  );

  const l2 =
    l1 +
    Math.atan2(
      Math.sin(bearingRad) * Math.sin(angular) * Math.cos(p1),
      Math.cos(angular) - Math.sin(p1) * Math.sin(p2)
    );

  return { lat: toDeg(p2), lon: toDeg(l2) };
}

function toRad(v) {
  return (v * Math.PI) / 180;
}

function toDeg(v) {
  return (v * 180) / Math.PI;
}
