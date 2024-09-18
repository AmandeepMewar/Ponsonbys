import multer from 'multer';
import path from 'path';

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `image_${req?.body?.name.replace(
      ' ',
      ''
    )}_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const UploadImage = upload.single('image');
