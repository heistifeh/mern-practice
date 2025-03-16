import express, { Router } from "express";
import { signInLogic, signUpLogic } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpLogic);
router.post("/signin", signInLogic);
export default router;
