import Sequence from "../models/Sequence.js";
import Lead from "../models/Lead.js";
import { scheduleNextStep } from "../services/emailService.js";

// Save sequence
export const saveSequence = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    let sequence = await Sequence.findOne({ name });

    if (sequence) {
      sequence.nodes = nodes;
      sequence.edges = edges;
      sequence.updatedAt = Date.now();
    } else {
      sequence = new Sequence({ name, nodes, edges });
    }

    await sequence.save();
    res.json(sequence);
  } catch (err) {
    console.error("Error in saveSequence:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const executeSequence = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    let sequence = await Sequence.findOne({ name });

    if (!sequence) {
      sequence = new Sequence({ name, nodes, edges });
    } else {
      sequence.nodes = nodes;
      sequence.edges = edges;
      sequence.updatedAt = Date.now();
    }

    await sequence.save();

    const leads = await Lead.find({
      sequenceId: sequence._id,
      status: "active",
    });

    if (!leads.length) {
      return res.json({
        msg: "No leads found for this sequence. Execution started but no jobs scheduled.",
        sequence,
      });
    }

    const agenda = req.app.locals.agenda;

    for (const lead of leads) {
      // If currentNodeId is not set or set to leadSource, move to first actionable node
      const currentNode = sequence.nodes.find(
        (n) => n.id === lead.currentNodeId
      );

      if (
        !lead.currentNodeId ||
        !currentNode ||
        currentNode.type === "leadSource"
      ) {
        const firstActionNodeId = sequence.edges.find(
          (edge) => edge.source === lead.currentNodeId || !lead.currentNodeId
        )?.target;

        if (firstActionNodeId) {
          lead.currentNodeId = firstActionNodeId;
          await lead.save();
        }
      }

      await scheduleNextStep(agenda, lead, sequence);
    }

    res.json({ msg: "Sequence execution started", sequence });
  } catch (err) {
    console.error("Error in executeSequence:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};
