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
  // Default hash for 'Grace.github'
  const defaultHash = 'a44e1c1b9278b4e1eb264c376ea155fa47f91849f1d13ff816f507c2f187928d';
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
