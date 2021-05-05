import { publicKey, passphrase } from "./keys";
const crypto = require("crypto");
export function encrypt(data) {
  return crypto
    .publicEncrypt(
      {
        key: publicKey,
        passphrase: passphrase,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      Buffer.from(data)
    )
    .toString("base64");
}

export function decrypt(data) {
  return crypto
    .privateDecrypt(
      {
        key: privateKey,
        passphrase: passphrase,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      Buffer.from(data, "base64")
    )
    .toString();
}

export function encryptObjectFields(obj) {
  const copy = { ...obj };
  Object.keys(copy).forEach(key => {
    copy[key] = encrypt(obj[key]);
  });
  return copy;
}
