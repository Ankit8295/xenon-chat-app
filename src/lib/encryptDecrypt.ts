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

export function encHex(plainText: string, key: string) {
  // var b64 = CryptoJS.AES.encrypt(plainText, key).toString();
  // var e64 = CryptoJS.enc.Base64.parse(b64);
  // var eHex = e64.toString(CryptoJS.enc.Hex);
  // return eHex;

  const b64 = CryptoJS.AES.encrypt(plainText, key).toString();
  return CryptoJS.enc.Base64.parse(b64);
}

export function decHexe(cipherText: string, key: string) {
  var reb64 = CryptoJS.enc.Hex.parse(cipherText);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, key);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
}
//http://localhost:3000/home/53616c7465645f5f4370191de9a3a7e777f209310ac707eb00f9f95467ae56c2332f06cc615e5123d051e6ef13df30bf
//http://localhost:3000/home/53616c7465645f5f1383686ebae49ed90f2df8e7c42b7ee2cd0af45321ad49daf10231f811401a7065848468f9ee0b7f
//http://localhost:3000/home/53616c7465645f5f93b08c0116b2c14f9db2534f1c11d6d6eea2ca82cbe6e3bb612ee3db4b43a85ecb24a37a47ea467a
//http://localhost:3000/home/53616c7465645f5f558b9f87cd752f0e4660f8a12b05e0223b0ac70db1d998fcc08329f6b059b7fb00e8ce74fa4f756a
