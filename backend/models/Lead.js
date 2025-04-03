import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  name: { type: String },
  sequenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sequence",
    required: true,
  },
  currentNodeId: { type: String },
  status: {
    type: String,
    enum: ["active", "completed", "paused", "error"],
    default: "active",
  },
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", LeadSchema);
export default Lead;
