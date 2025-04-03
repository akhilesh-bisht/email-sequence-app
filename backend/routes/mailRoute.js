import express from "express";
import { sendMail } from "../controller/sendMail.js";

const router = express.Router();

// sending mail
router.get("/", sendMail);

export default router;
