import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
  deviceFingerprint: string;
  iat?: number;
  exp?: number;
}

export function generateAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { 
    expiresIn: '15m',
    issuer: 'codeearn',
    audience: 'codeearn-students',
  });
}

export function generateRefreshToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { 
    expiresIn: '7d',
    issuer: 'codeearn',
    audience: 'codeearn-students',
  });
}

export function verifyAccessToken(token: string): any {
  try {
    // Sirf secret se verify karein, extra options (audience/issuer) 
    // agar login ke waqt add nahi kiye toh yahan bhi hata dein
    return jwt.verify(token, ACCESS_TOKEN_SECRET); 
  } catch (error) {
    console.log("Token Verification Failed:", error);
    return null;
  }
}


export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET, {
    issuer: 'codeearn',
    audience: 'codeearn-students',
  }) as TokenPayload;
}

// Token rotation - invalidate old refresh token
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}