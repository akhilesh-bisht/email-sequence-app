import Lead from "../models/Lead.js";
import Sequence from "../models/sequence.js";
import { scheduleNextStep } from "../services/emailService.js";

//  Add Lead to Sequence
export const addLead = async (req, res) => {
  try {
    const { email, name, sequenceId } = req.body;
    const sequence = await Sequence.findById(sequenceId);

    if (!sequence) return res.status(404).json({ msg: "Sequence not found" });

    const leadSourceNode = sequence.nodes.find(
      (node) => node.type === "leadSource"
    );
    if (!leadSourceNode)
      return res.status(400).json({ msg: "No lead source node" });

    const lead = new Lead({
      email,
      name,
      sequenceId,
      currentNodeId: leadSourceNode.id,
      status: "active",
    });
    await lead.save();

    const agenda = req.app.locals.agenda;
    await scheduleNextStep(agenda, lead, sequence);

    res.json(lead);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
