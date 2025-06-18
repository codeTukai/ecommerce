import multer from 'multer';
import fs from 'fs';

const UPLOADS_DIR = "uploads";

// Ensure the uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb ){
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb){
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

export default upload;









// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // File storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = "uploads/avatars";

//     // Ensure folder exists
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, "avatar-" + uniqueSuffix + ext);
//   },
// });

// // File filter - only accept images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   const mime = file.mimetype;

//   if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed"), false);
//   }
// };

// // File size limit (2MB)
// const limits = {
//   fileSize: 2 * 1024 * 1024, // 2MB
// };

// // Multer upload middleware
// const upload = multer({
//   storage,
//   fileFilter,
//   limits,
// });

// export default upload;
