import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    // mkdirSync 폴더 생성 명령어
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  // 폴더 생성
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      // 어디에 저장할 지 정의
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },

    filename(req, file, cb) {
      // 어떤 이름으로 올릴 지 정의
      // extname 를 통해 확장자 추출
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
};

// upload 폴더 하위에 folder 생성
export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
