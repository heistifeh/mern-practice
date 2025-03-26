import express from "express";
import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/create-listing/:id", verifyToken, createListing); 