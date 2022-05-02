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
} = require("../controller/notes");
const Notes = require("../models/notes");

router.post("/", user);

router.get("/getnotes", get);

router.put("/:id", update);

router.delete("/:id", note);

router.get("/match", match);

router.get("/project", project);

router.get("/addfilds", addfilds);

router.get("/size", size);

router.get("/look", look);

module.exports = router;
