import express from "express";
import Sequence from "../models/Sequence.js";
import {
  saveSequence,
  executeSequence,
} from "../controller/sequenceController.js";

const router = express.Router();

router.post("/", saveSequence);
router.post("/execute", executeSequence);

export default router;
