declare module 'crypto-js' {
  export const AES: {
    decrypt: (txt: string, key: string) => any
    encrypt: (txt: string, key: string) => any
  };
  export const enc: {
    Utf8: string
  };
}

declare module 'moment' {
  import { Dayjs } from 'dayjs'
  namespace moment {
    type Moment = Dayjs
  }
  export = moment
  // export as namespace moment
}