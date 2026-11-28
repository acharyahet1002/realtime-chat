import jwt, { JwtPayload } from "jsonwebtoken";
import { createHash } from "crypto";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT secrets are missing from environment variables");
}

export const generateAccessToken = (email: string): string => {
  return jwt.sign(
    {
      sub: email
    },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (email: string): string => {
  return jwt.sign({ sub: email }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);

    if (typeof decoded === "string" || !decoded.sub) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};

export const hashRefreshToken = (token: string): string => {
  return createHash("sha256").update(token).digest("hex");
};
