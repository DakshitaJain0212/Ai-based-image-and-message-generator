import express from "express";

import authController from "../Controllers/authController.js";
// import User from "../mongodb/models/user";
const router = express.Router();
router.post(
"/register",
authController.register
)
router.post(
    "/login",
    authController.login
    )

export  default router;