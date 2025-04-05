import { scheduleNextStep } from "../services/emailService.js";
import Lead from "../models/Lead.js";
import Sequence from "../models/sequence.js";

const defineJobs = (agenda) => {
  agenda.define("process sequence step", async (job, done) => {
    try {
      console.log("🔄 Processing job:", job.attrs.data);

      const { leadId, nextNodeId } = job.attrs.data;
      const lead = await Lead.findById(leadId);
      if (!lead || lead.status !== "active") {
        console.log("❌ Lead not found or inactive.");
        return done();
      }

      const sequence = await Sequence.findById(lead.sequenceId);
      if (!sequence || !sequence.active) {
        console.log("❌ Sequence not active.");
        return done();
      }

      lead.currentNodeId = nextNodeId;
      await lead.save();
      console.log("✅ Lead updated to next step:", nextNodeId);

      //  Call the function to handle next step
      await scheduleNextStep(agenda, lead, sequence);

      done();
    } catch (error) {
      console.error("❌ Error processing job:", error);
      done(error);
    }
  });
};

export default defineJobs;
