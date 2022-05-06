const express = require("express");
const req = require("express/lib/request");
const app = express();
const router = express.Router();
const {
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
} = require("../controller/notes");
const { userNotesSchema } = require("../middleware/joi");
const Notes = require("../models/notes");
const auth = require("../middleware/auth");

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

module.exports = router;
