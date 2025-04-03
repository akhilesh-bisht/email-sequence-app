// src/components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Email Sequence Builder</h2>
        <p className="text-sm text-gray-600">
          Drag nodes onto the canvas to build your email sequence.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">Available Nodes</h3>

        <div
          className="bg-blue-100 p-3 rounded border border-blue-300 cursor-move flex items-center"
          onDragStart={(event) => onDragStart(event, "leadSource")}
          draggable
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span>Lead Source</span>
        </div>

        <div
          className="bg-green-100 p-3 rounded border border-green-300 cursor-move flex items-center"
          onDragStart={(event) => onDragStart(event, "emailNode")}
          draggable
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span>Email Node</span>
        </div>

        <div
          className="bg-yellow-100 p-3 rounded border border-yellow-300 cursor-move flex items-center"
          onDragStart={(event) => onDragStart(event, "waitNode")}
          draggable
        >
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span>Wait/Delay</span>
        </div>
      </div>

      <div className="mt-8 p-3 bg-gray-200 rounded text-sm">
        <h4 className="font-medium mb-1">Tips:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Start with a Lead Source node</li>
          <li>Connect nodes by dragging between handles</li>
          <li>Configure each node by clicking on it</li>
          <li>Save your sequence before executing</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
