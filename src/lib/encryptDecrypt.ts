import CryptoJS from "crypto-js";

const key = process.env.ENCRYPTION_KEY;
export function encrypt(password: string) {
  const encrypted = CryptoJS.AES.encrypt(password, key).toString();
  return encrypted;
}

export function decrypt(encryptedPassword: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

export function encodeString(string: string) {
  return Buffer.from(string).toString("base64");
}

export function decodeString(encodedString: string) {
  return Buffer.from(encodedString, "base64").toString("utf8");
}
