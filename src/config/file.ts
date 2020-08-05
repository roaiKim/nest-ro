import { join } from "path";
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

export default {
    root: join(__dirname, '../uploads'),
    storage: diskStorage({
      destination: join(__dirname, `../uploads/${new Date().toLocaleDateString()}`),
      filename: (req, file, cb) => {
          console.log("file--", file)
          try {
            const filename = `${uuidv4().replace(/-/g, "")}-${Base64.encodeURL(file.originalname.split('.')[0])}.${file.originalname.split('.')[1]}`;
            return cb(null, filename);
          } catch {
            const filename = `${uuidv4()}-${file.originalname}}`;
            return cb(null, filename);
          }
      },
    }),
};
