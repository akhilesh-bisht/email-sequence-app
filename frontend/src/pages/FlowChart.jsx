import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "../componets/Sidebar";
import LeadSourceNode from "../componets/nodes/LeadSourceNode";
import EmailNode from "../componets/nodes/EmailNode";
import WaitNode from "../componets/nodes/WaitNode";
import { saveSequence, executeSequence, createLead, logout } from "../api/api";
import { useNavigate } from "react-router-dom";

// Define custom node
const nodeTypes = {
  leadSource: LeadSourceNode,
  emailNode: EmailNode,
  waitNode: WaitNode,
};

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const navigate = useNavigate();

  // State for managing nodes and edges in the flow
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [sequenceName, setSequenceName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  // When a new connection is made between nodes
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges]
  );

  // When React Flow is initialized
  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  // When an item is dragged over the canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //    logout handle
  const handleLogout = async () => {
    try {
      await logout(); // optional if API supports it
    } catch (err) {
      console.error("Server logout failed, proceeding to clear local");
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  // When a new node is dropped onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      // Calculate position based on drop
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create a new node with default data
      const newNode = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: {
          label: `${type} node`,
          onChange: (id, data) => {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === id
                  ? { ...node, data: { ...node.data, ...data } }
                  : node
              )
            );
          },
        },
      };

      // Add default fields for email node
      if (type === "emailNode") {
        newNode.data.subject = "";
        newNode.data.body = "";
        newNode.data.recipient = "";
      }

      // Add default duration for wait node
      if (type === "waitNode") {
        newNode.data.duration = 1;
      }

      // Add new node to state
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Function to save the flow and execute it
  const handleSaveAndRun = async () => {
    if (!sequenceName) {
      setSavedMessage("Please enter a sequence name");
      setStatusType("error");
      return;
    }

    try {
      setIsSaving(true);
      setStatusType("processing");

      const flow = reactFlowInstance.toObject();

      // Format node data for saving
      const formattedNodes = flow.nodes.map((node) => ({
        id: node.id,
        type:
          node.type === "emailNode"
            ? "email"
            : node.type === "waitNode"
            ? "wait"
            : "leadSource",
        data: node.data,
      }));

      // Format edge data for saving
      const formattedEdges = flow.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      }));

      // Save sequence to the server
      const saveRes = await saveSequence({
        name: sequenceName,
        nodes: formattedNodes,
        edges: formattedEdges,
      });

      const sequenceId = saveRes.data._id || saveRes.data.id;
      localStorage.setItem("lastSequenceId", sequenceId);

      // Find the first email node to extract recipient
      const emailNode = flow.nodes.find((n) => n.type === "emailNode");
      const email = emailNode?.data?.recipient;

      if (!email) {
        setSavedMessage("Email not found in Email Node");
        setStatusType("error");
        return;
      }

      // Create a new lead in the database
      await createLead({
        email,
        sequenceId,
        currentNodeId: "1",
        status: "active",
      });

      // Start sequence execution
      await executeSequence({
        name: sequenceName,
        nodes: formattedNodes,
        edges: formattedEdges,
      });

      setSavedMessage(
        `Sequence "${sequenceName}" saved, lead created and executed.`
      );
      setSequenceName("");
      setStatusType("success");

      // Clear message after 3 seconds
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setSavedMessage("Failed during save or execute");
      setStatusType("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header with input and button */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              placeholder="Sequence Name"
              className="border p-2 rounded"
            />
            <button
              onClick={handleSaveAndRun}
              disabled={isSaving}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {isSaving ? "Processing..." : "Save & Run"}
            </button>
          </div>

          {/*   log out */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
          {/* Show status message */}
          {savedMessage && (
            <div
              className={
                statusType === "success"
                  ? "text-green-600"
                  : statusType === "error"
                  ? "text-red-600"
                  : "text-blue-600"
              }
            >
              {savedMessage}
            </div>
          )}
        </div>

        {/* Main canvas for React Flow */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background variant="dots" gap={12} size={1} />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
