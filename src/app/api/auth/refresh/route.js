import { generateToken } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return Response.json({
        success: false,
        message: 'Refresh token required',
      }, { status: 401 });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret_fallback_12345');
    const token = generateToken(decoded);

    return Response.json({
      success: true,
      token,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Invalid or expired refresh token',
    }, { status: 403 });
  }
}
