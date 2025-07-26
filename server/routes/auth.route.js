const express = require('express')
const router = express.Router()

const authController = require("../controllers/auth.controllers")

const authMiddleware = require("../middleware/JWT.middleware");

router.route("/profile")
    .get(authMiddleware, authController.getProfile);
    
router.route("/register")
    .post(authController.register)

router.route("/login")
    .post(authController.login)

module.exports = router