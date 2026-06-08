import jwt from 'jsonwebtoken';

/**
 * Verifies the JWT token from the Request headers and optionally checks roles.
 * @param {Request} req - The incoming request object
 * @param {string[]} allowedRoles - Optional array of roles allowed to access the endpoint
 * @returns {{user: object|null, status: number, error: string|null}}
 */
export function verifyAuth(req, allowedRoles = []) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return { user: null, status: 401, error: 'Access token required' };
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_fallback_12345');
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return { user: null, status: 403, error: `Insufficient permissions. Required roles: ${allowedRoles.join(', ')}` };
    }

    return { user, status: 200, error: null };
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid or malformed token';
    return { user: null, status: 403, error: message };
  }
}

/**
 * Optionally parses and verifies a token without throwing an error if it fails or is missing.
 * @param {Request} req 
 * @returns {object|null} The decoded user object or null
 */
export function getOptionalAuth(req) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_fallback_12345');
  } catch (e) {
    return null;
  }
}

/**
 * Generates a JWT token for the user
 * @param {object} user 
 * @returns {string} The signed JWT
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id || user.username || user.reg_no,
      role: user.role,
      username: user.username,
      reg_no: user.reg_no,
    },
    process.env.JWT_SECRET || 'jwt_secret_fallback_12345',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
}
