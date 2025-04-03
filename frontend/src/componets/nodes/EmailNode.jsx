import React, { useState } from "react";
import { Handle } from "reactflow";

const EmailNode = ({ id, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    data.onChange(id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="p-3 rounded-lg shadow bg-white border-2 border-green-500 w-64">
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
          <div className="font-medium">Email</div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {isExpanded ? (
        <div className="mt-3 space-y-2">
          {/* New Input for Recipient's Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient Email
            </label>
            <input
              type="email"
              name="recipient"
              value={data.recipient || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm border"
              placeholder="Enter recipient email"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={data.subject || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm border"
              placeholder="Email subject"
            />
          </div>

          {/* Email Body Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Body
            </label>
            <textarea
              name="body"
              value={data.body || ""}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm border"
              placeholder="Email content..."
            ></textarea>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-600 truncate">
          {data.subject
            ? `Subject: ${data.subject}`
            : "Click + to configure email"}
        </div>
      )}

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
