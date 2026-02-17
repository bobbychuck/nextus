import test from 'node:test';
import assert from 'node:assert/strict';
import { obfuscateHomeZone } from '../src/core/privacy.js';

test('obfuscateHomeZone pushes points out of protected radius', () => {
  const home = { lat: 37.7749, lon: -122.4194 };
  const points = [
    { lat: 37.77495, lon: -122.41945 },
    { lat: 37.7800, lon: -122.4200 }
  ];

  const output = obfuscateHomeZone(points, home, 300);

  assert.equal(output.length, 2);
  assert.notDeepEqual(output[0], points[0]);
  assert.deepEqual(output[1], points[1]);
});
