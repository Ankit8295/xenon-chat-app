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
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    return decoded as JwtPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
