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

// export function encHex(plainText: string, key: string) {
//   // var b64 = CryptoJS.AES.encrypt(plainText, key).toString();
//   // var e64 = CryptoJS.enc.Base64.parse(b64);
//   // var eHex = e64.toString(CryptoJS.enc.Hex);
//   // return eHex;

//   const b64 = CryptoJS.AES.encrypt(plainText, key).toString();
//   return CryptoJS.enc.Base64.parse(b64);
// }

// export function decHexe(cipherText: string, key: string) {
//   var reb64 = CryptoJS.enc.Hex.parse(cipherText);
//   var bytes = reb64.toString(CryptoJS.enc.Base64);
//   var decrypt = CryptoJS.AES.decrypt(bytes, key);
//   var plain = decrypt.toString(CryptoJS.enc.Utf8);
//   return plain;
// }
