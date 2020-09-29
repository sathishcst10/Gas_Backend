var express = require("express");
var router = express.Router();
const {check, validationResult} = require("express-validator");

const {signUp, signIn, signOut, isAuthenticate, isSigned}= require("../controllers/Auth");

router.post("/signup", [
    check("fullname", "Name must be in more than 3 Char").isLength({min:3}),
    check("email", "Email must be in correct format").isEmail(),
    check("password", "Password must be in more than 3 Char").isLength({min:3})
], signUp);

router.post("/signin", [
    check("email", "Email must be in correct format").isEmail(),
    check("password", "Password is must").isLength({min:1})
], signIn);

router.post("/signout", signOut);

module.exports = router;
