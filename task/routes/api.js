const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = express.Router();
const {
  login,
  register,
  getid,
  update,
  pop,
  csvfileUpload,
  profileurlpath,
} = require("../controller/user");
const { userRegistrationSchema } = require("../middleware/joi");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post("/photo", profileurlpath);
router.put("/update/:id", auth, userRegistrationSchema, update);
router.post("/register", upload, userRegistrationSchema, register);
router.post("/", upload, csvfileUpload);
router.post("/login", login);
router.get("/getid/:id", auth, getid);
router.delete("/delete/:id", auth, pop);

module.exports = router;
