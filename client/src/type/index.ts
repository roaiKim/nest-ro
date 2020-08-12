declare module 'crypto-js' {
  export const AES: {
    decrypt: (txt: string, key: string) => any
    encrypt: (txt: string, key: string) => any
  };
  export const enc: {
    Utf8: string
  };
}
