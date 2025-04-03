import Lead from "../models/Lead.js";
import Sequence from "../models/sequence.js";
import emailProcessor from "../services/emailService.js";

const defineJobs = (agenda) => {
  agenda.define("process sequence step", async (job, done) => {
    try {
      const { leadId, nextNodeId } = job.attrs.data;

      const lead = await Lead.findById(leadId);
      if (!lead || lead.status !== "active") return done();

      const sequence = await Sequence.findById(lead.sequenceId);
      if (!sequence || !sequence.active) return done();

      lead.currentNodeId = nextNodeId;
      await lead.save();
      await emailProcessor.scheduleNextStep(agenda, lead, sequence);

      done();
    } catch (error) {
      done(error);
    }
  });
};

export default defineJobs;
