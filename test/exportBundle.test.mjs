import test from 'node:test';
import assert from 'node:assert/strict';
import { createEncryptedBundle, readEncryptedBundle } from '../src/core/exportBundle.js';

test('createEncryptedBundle/readEncryptedBundle roundtrip', () => {
  const payload = { activities: [{ id: 'a1', distanceMeters: 1000 }] };
  const passphrase = 'correct horse battery staple';

  const encrypted = createEncryptedBundle(payload, passphrase);
  const decrypted = readEncryptedBundle(encrypted, passphrase);

  assert.deepEqual(decrypted.payload, payload);
  assert.equal(typeof decrypted.manifest.schemaVersion, 'string');
});

test('readEncryptedBundle fails with wrong passphrase', () => {
  const encrypted = createEncryptedBundle({ ok: true }, 'good-pass');

  assert.throws(() => readEncryptedBundle(encrypted, 'bad-pass'));
});
