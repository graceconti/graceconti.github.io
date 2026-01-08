/**
 * Password utilities using SHA-256 hashing
 */

/**
 * Hash a password using SHA-256
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password in hex format
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verify if a password matches the stored hash
 * @param {string} password - Plain text password to verify
 * @param {string} storedHash - The stored hash to compare against
 * @returns {Promise<boolean>} - True if password matches
 */
export async function verifyPassword(password, storedHash) {
  const passwordHash = await hashPassword(password);
  return passwordHash === storedHash;
}

/**
 * Get the stored password hash from localStorage
 * @returns {string} - The stored password hash
 */
export function getStoredPasswordHash() {
  // Default hash for 'grace2024'
  const defaultHash = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';
  const storedHash = localStorage.getItem('adminPasswordHash');
  return storedHash || defaultHash;
}

/**
 * Store a new password hash in localStorage
 * @param {string} newPassword - The new plain text password
 */
export async function setNewPasswordHash(newPassword) {
  const hash = await hashPassword(newPassword);
  localStorage.setItem('adminPasswordHash', hash);
  return hash;
}
