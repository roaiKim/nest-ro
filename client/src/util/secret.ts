import CryptoJS from 'crypto-js'; // 引用AES源码js

// 解密方法
export function Decrypt(word: string) {
  const bytes = CryptoJS.AES.decrypt(word, '1234123412ABCDEF');
  return bytes.toString(CryptoJS.enc.Utf8);
}

// 加密方法
export function Encrypt(word: string) {
  return CryptoJS.AES.encrypt(JSON.stringify(word), '1234123412ABCDEF').toString();
}
