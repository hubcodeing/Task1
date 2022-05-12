import express from "express";
const router = express.Router();
import {
  login,
  register,
  getid,
  update,
  pop,
  csvfileUpload,
  profileurlpath,
} from "../controller/user";
import { userRegistrationSchema } from "../middleware/joi";
import auth from "../middleware/auth";
import upload from "../middleware/upload";

router.post("/photo", profileurlpath);
router.put("/update/:id", auth, userRegistrationSchema, update);
router.post("/register", upload, userRegistrationSchema, register);
router.post("/", upload, csvfileUpload);
router.post("/login", login);
router.get("/getid/:id", auth, getid);
router.delete("/delete/:id", auth, pop);

export default router;
