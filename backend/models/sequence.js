import mongoose from "mongoose";

// Define schema for sequences
const SequenceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nodes: { type: Array, required: true },
  edges: { type: Array, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Sequence =
  mongoose.models.Sequence || mongoose.model("Sequence", SequenceSchema);

export default Sequence;
