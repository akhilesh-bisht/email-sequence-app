import React from "react";
import { Handle } from "reactflow";

const LeadSourceNode = () => {
  return (
    <div className="p-3 rounded-lg shadow bg-white border-2 border-blue-500 w-64">
      {/* Header with Icon */}
      <div className="flex items-center">
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
        <div className="font-medium">Lead Source</div>
      </div>

      {/* Description */}
      <div className="mt-2 text-sm text-gray-600">
        Starting point for your sequence
      </div>

      {/* Output Handle (Connection to Next Node) */}
      <Handle
        type="source"
        position="bottom"
        id="lead-source-output"
        style={{
          background: "#4299e1",
          width: "12px",
          height: "12px",
          bottom: "-6px",
        }}
      />
    </div>
  );
};

export default LeadSourceNode;
