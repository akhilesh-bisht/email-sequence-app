import { sendEmail } from "./mailer.js";

export const scheduleNextStep = async (agenda, lead, sequence) => {
  // console.log(" Scheduling next step for:", lead.email);

  console.log("lead.currentNodeId:", lead.currentNodeId);
  console.log(
    " sequence.nodes:",
    sequence.nodes.map((n) => n.id)
  );

  const currentNode = sequence.nodes.find(
    (node) => node.id === lead.currentNodeId
  );

  if (!currentNode) {
    // console.error("❌ Current node not found in sequence.");
    return;
  }

  // console.log("✅ Found current node:", currentNode);

  if (currentNode.type === "email") {
    // console.log(" Sending email to:", lead.email);
    await sendEmail(
      lead.email,
      currentNode.data.subject,
      currentNode.data.body
    );
    // console.log("✅ Email function finished");

    const nextEdge = sequence.edges.find(
      (edge) => edge.source === currentNode.id
    );
    if (nextEdge) {
      console.log(
        "🕒 Scheduling job in 1 minute for next step:",
        nextEdge.target
      );
      await agenda.schedule("in 1 minute", "process sequence step", {
        leadId: lead._id,
        nextNodeId: nextEdge.target,
      });
    }
  } else if (currentNode.type === "wait") {
    // console.log("⏳ Wait node reached");

    const delayTime = currentNode.data.duration || 60;
    await agenda.schedule(`in ${delayTime} minutes`, "process sequence step", {
      leadId: lead._id,
      nextNodeId: sequence.edges.find((edge) => edge.source === currentNode.id)
        ?.target,
    });
  }
};
