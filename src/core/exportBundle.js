import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { createExportManifest } from './models.js';

const ALGO = 'aes-256-gcm';

/**
 * Encrypt a local export package with a user passphrase.
 * @param {Record<string, unknown>} payload
 * @param {string} passphrase
 */
export function createEncryptedBundle(payload, passphrase) {
  const manifest = createExportManifest();
  const data = Buffer.from(JSON.stringify({ manifest, payload }), 'utf8');

  const iv = randomBytes(12);
  const key = deriveKey(passphrase);
  const cipher = createCipheriv(ALGO, key, iv);

  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    algorithm: ALGO,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    ciphertext: encrypted.toString('base64')
  };
}

/**
 * Decrypt an encrypted bundle.
 * @param {{algorithm:string, iv:string, tag:string, ciphertext:string}} bundle
 * @param {string} passphrase
 */
export function readEncryptedBundle(bundle, passphrase) {
  if (bundle.algorithm !== ALGO) {
    throw new Error(`Unsupported algorithm: ${bundle.algorithm}`);
  }

  const key = deriveKey(passphrase);
  const decipher = createDecipheriv(ALGO, key, Buffer.from(bundle.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(bundle.tag, 'base64'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(bundle.ciphertext, 'base64')),
    decipher.final()
  ]);

  return JSON.parse(decrypted.toString('utf8'));
}

function deriveKey(passphrase) {
  return createHash('sha256').update(passphrase, 'utf8').digest();
}
