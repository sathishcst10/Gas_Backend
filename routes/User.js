const express = require("express");
const router = express.Router();

const {getUserById, getUser} = require("../controllers/User");
const {isSigned, isAuthenticate} = require("../controllers/Auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSigned, isAuthenticate, getUser);


module.exports = router;