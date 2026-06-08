import bcrypt from 'bcryptjs';

/**
 * Hash a plaintext password using bcrypt
 * @param {string} password - The plaintext password to hash
 * @returns {Promise<string>} The hashed password
 */
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error(`Password hashing failed: ${error.message}`);
  }
}

/**
 * Compare a plaintext password with a hashed password
 * @param {string} password - The plaintext password
 * @param {string} hashedPassword - The hashed password from database
 * @returns {Promise<boolean>} True if passwords match
 */
export async function comparePasswords(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error(`Password comparison failed: ${error.message}`);
  }
}
