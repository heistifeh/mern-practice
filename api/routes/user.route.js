import express, { Router } from "express";
import { testLogic, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", testLogic);
router.post("/update/:id",verifyToken, updateUser)
export default router;
