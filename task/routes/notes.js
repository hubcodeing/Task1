const express = require("express");
const req = require("express/lib/request");
const app = express();
const router = express.Router();
const {
    user,
    get,
    update,
    note
} = require("../controller/notes");
const Notes = require("../models/notes");

router.post("/", user)

router.get("/getnotes", get)

router.put("/:id", update)

router.delete("/:id", note)

module.exports = router;