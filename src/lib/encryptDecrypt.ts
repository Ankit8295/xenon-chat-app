import CryptoJS from "crypto-js";

export function encrypt(password: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(password, key).toString();
  return encrypted;
}

export function decrypt(encryptedPassword: string, key: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}
