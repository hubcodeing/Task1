import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "file/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}` + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage }).single("profile_file");
export default upload;
