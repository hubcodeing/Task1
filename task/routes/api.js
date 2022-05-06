const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = express.Router();
const { login, register, getid, update, pop } = require("../controller/user");
const { userRegistrationSchema } = require("../middleware/joi");
const auth = require("../middleware/auth");
router.post("/register", userRegistrationSchema, register);

router.post("/login", login);

router.get("/getid/:id", auth, getid);

router.put("/update/:id", auth, userRegistrationSchema, update);

router.delete("/delete/:id", auth, pop);

module.exports = router;
