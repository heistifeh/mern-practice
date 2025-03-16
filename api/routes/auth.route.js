import express, { Router } from "express";
import { signUpLogic } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpLogic);
export default router;
