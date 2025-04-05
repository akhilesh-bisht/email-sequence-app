import React, { useState } from "react";
import { Handle } from "reactflow";

const EmailNode = ({ id, data }) => {
  // To show/hide the input fields
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle input change and call parent's onChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    data.onChange(id, { [name]: value });
  };

  return (
    <div className="p-3 w-64 bg-white border-2 border-green-500 rounded-lg shadow">
      {/* Top connection handle */}
      <Handle
        type="target"
        position="top"
        style={{
          background: "#48bb78",
          width: "12px",
          height: "12px",
          top: "-6px",
        }}
      />

      {/* Header with icon and expand button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mr-2">
            {/* Email icon */}
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
          <div className="font-medium">Email</div>
        </div>

        {/* Expand/collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {/* Input fields when expanded */}
      {isExpanded ? (
        <div className="mt-3 space-y-2">
          {/* Recipient Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient Email
            </label>
            <input
              type="email"
              name="recipient"
              value={data.recipient || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-sm border rounded-md border-gray-300 shadow-sm"
              placeholder="Enter recipient email"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={data.subject || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full text-sm border rounded-md border-gray-300 shadow-sm"
              placeholder="Email subject"
            />
          </div>

          {/* Email Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Body
            </label>
            <textarea
              name="body"
              value={data.body || ""}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 w-full text-sm border rounded-md border-gray-300 shadow-sm"
              placeholder="Email content..."
            />
          </div>
        </div>
      ) : (
        // Preview subject when collapsed
        <div className="mt-2 text-sm text-gray-600 truncate">
          {data.subject
            ? `Subject: ${data.subject}`
            : "Click + to configure email"}
        </div>
      )}

      {/* Bottom connection handle */}
      <Handle
        type="source"
        position="bottom"
        id="a"
        style={{
          background: "#48bb78",
          width: "12px",
          height: "12px",
          bottom: "-6px",
        }}
      />
    </div>
  );
};

export default EmailNode;
