import Sequence from "../models/sequence.js";

// ✅ Save or Update Sequence
export const saveSequence = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    let sequence = await Sequence.findOne({ name });

    if (sequence) {
      sequence.nodes = nodes;
      sequence.edges = edges;
      sequence.updatedAt = Date.now();
      await sequence.save();
    } else {
      sequence = new Sequence({ name, nodes, edges });
      await sequence.save();
    }

    res.json(sequence);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// ✅ Execute Sequence
export const executeSequence = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    let sequence = await Sequence.findOne({ name });

    if (!sequence) {
      sequence = new Sequence({ name, nodes, edges });
      await sequence.save();
    }

    sequence.nodes = nodes;
    sequence.edges = edges;
    sequence.updatedAt = Date.now();
    await sequence.save();

    res.json({ msg: "Sequence execution started", sequence });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
