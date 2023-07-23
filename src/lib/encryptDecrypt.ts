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
export function encodeEmail(email: string) {
  return Buffer.from(email).toString("base64");
}

// Function to decode a Base64 encoded email
export function decodeEmail(encodedEmail: string) {
  return Buffer.from(encodedEmail, "base64").toString("utf8");
}
