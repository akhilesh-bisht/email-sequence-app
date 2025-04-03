// src/components/FlowBuilder.jsx
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
import LeadSourceNode from "./nodes/LeadSourceNode";
import EmailNode from "./nodes/EmailNode";
import WaitNode from "./nodes/WaitNode";
import Sidebar from "./Sidebar";
// import axios from 'axi`os';

// Custom node types
const nodeTypes = {
  leadSource: LeadSourceNode,
  emailNode: EmailNode,
  waitNode: WaitNode,
};

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [sequenceName, setSequenceName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  // Handle connections between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  // Initialize the flow instance
  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  // Handle dropping new nodes onto the canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let newNode = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      // Add custom data based on node type
      if (type === "emailNode") {
        newNode.data = {
          ...newNode.data,
          subject: "",
          body: "",
          onChange: (id, data) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === id) {
                  node.data = { ...node.data, ...data };
                }
                return node;
              })
            );
          },
        };
      } else if (type === "waitNode") {
        newNode.data = {
          ...newNode.data,
          delay: 1,
          delayUnit: "days",
          onChange: (id, data) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === id) {
                  node.data = { ...node.data, ...data };
                }
                return node;
              })
            );
          },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Save flow to database
  const saveFlow = async () => {
    if (!sequenceName) {
      setSavedMessage("Please enter a sequence name");
      return;
    }

    try {
      setIsSaving(true);
      const flow = reactFlowInstance.toObject();
      console.log({
        name: sequenceName,
        nodes: flow.nodes,
        edges: flow.edges,
      });

      // const response = await axios.post("/api/sequences", {
      //   name: sequenceName,
      //   nodes: flow.nodes,
      //   edges: flow.edges,
      // });

      // setSavedMessage(`Sequence "${sequenceName}" saved successfully!`);
      // setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Error saving sequence:", error);
      setSavedMessage("Error saving sequence. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Execute flow (schedule the email sequence)
  const executeFlow = async () => {
    try {
      setIsSaving(true);
      const flow = reactFlowInstance.toObject();

      await axios.post("/api/sequences/execute", {
        name: sequenceName,
        nodes: flow.nodes,
        edges: flow.edges,
      });

      setSavedMessage(`Sequence "${sequenceName}" scheduled for execution!`);
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Error executing sequence:", error);
      setSavedMessage("Error executing sequence. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              placeholder="Sequence Name"
              className="border p-2 rounded"
            />
            <button
              onClick={saveFlow}
              disabled={isSaving}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Sequence"}
            </button>
            <button
              onClick={executeFlow}
              disabled={isSaving}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isSaving ? "Processing..." : "Execute Sequence"}
            </button>
          </div>
          {savedMessage && <div className="text-green-600">{savedMessage}</div>}
        </div>
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
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
