import { sendEmail } from "./mailer.js";

export const scheduleNextStep = async (agenda, lead, sequence) => {
  const currentNode = sequence.nodes.find(
    (node) => node.id === lead.currentNodeId
  );
  if (!currentNode) return;

  if (currentNode.type === "email") {
    await sendEmail(
      lead.email,
      currentNode.data.subject,
      currentNode.data.body
    );

    const nextEdge = sequence.edges.find(
      (edge) => edge.source === currentNode.id
    );
    if (nextEdge) {
      await agenda.schedule("in 1 minute", "process sequence step", {
        leadId: lead._id,
        nextNodeId: nextEdge.target,
      });
    }
  } else if (currentNode.type === "wait") {
    const delayTime = currentNode.data.duration || 60;
    await agenda.schedule(`in ${delayTime} minutes`, "process sequence step", {
      leadId: lead._id,
      nextNodeId: sequence.edges.find((edge) => edge.source === currentNode.id)
        ?.target,
    });
  }
};
