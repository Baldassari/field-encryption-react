import { publicKey, passphrase, privateKey } from './keys';
import { publicEncrypt, privateDecrypt, constants } from 'crypto';

export function encrypt(data) {
  return publicEncrypt(
    {
      key: publicKey,
      passphrase: passphrase,
      padding: constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(data)
  ).toString('base64');
}

export function decrypt(data) {
  return privateDecrypt(
    {
      key: privateKey,
      passphrase: passphrase,
      padding: constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(data, 'base64')
  ).toString();
}

export function encryptObjectFields(obj) {
  const copy = { ...obj };
  Object.keys(copy).forEach((key) => {
    copy[key] = encrypt(obj[key]);
  });
  return copy;
}
