import CryptoJS from "crypto-js";
declare const crypto: any;

const key = process.env.ENCRYPTION_KEY;

export function encrypt(string: string) {
  const encrypted = CryptoJS.AES.encrypt(string, key).toString();
  return encrypted;
}

export function decrypt(encryptedstring: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedstring, key).toString(
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
