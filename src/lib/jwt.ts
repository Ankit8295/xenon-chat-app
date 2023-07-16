import jwt, { JwtPayload } from "jsonwebtoken";
interface SignOptions {
  expiresIn?: string | number;
}
const default_signOptions: SignOptions = {
  expiresIn: "1h",
};
export function createJwt(
  payload: JwtPayload,
  options: SignOptions = default_signOptions
) {
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, jwtSecret, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as JwtPayload;
  } catch (err) {
    return null;
  }
}
