import express from "express";
import { addLead } from "../controller/leadController.js";

const router = express.Router();

router.post("/", addLead);

export default router;
