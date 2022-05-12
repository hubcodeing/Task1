import express from "express";
const router = express.Router();
import {
  user,
  get,
  update,
  note,
  match,
  project,
  addfilds,
  size,
  look,
  lookup,
  getid,
  combine,
  jjj,
} from "../controller/notes";
import { userNotesSchema } from "../middleware/joi";
import auth from "../middleware/auth";

router.post("/", auth, userNotesSchema, user);

router.post("/combine", auth, userNotesSchema, combine);

router.get("/getnotes", auth, get);

router.get("/title", jjj);

router.get("/getnotes/:id", auth, getid);

router.put("/:id", auth, update);

router.delete("/:id", auth, note);

router.get("/match", auth, match);

router.get("/project", auth, project);

router.get("/addfilds", auth, addfilds);

router.get("/size", auth, size);

router.get("/look", auth, look);

router.get("/lookup", auth, lookup);

export default router;
