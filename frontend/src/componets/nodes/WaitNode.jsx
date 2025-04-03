import React, { useState } from "react";
import { Handle } from "reactflow";

const WaitNode = ({ id, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "delay" ? parseInt(value, 10) || 1 : value;
    data.onChange(id, { [name]: updatedValue });
  };

  return (
    <div className="p-3 rounded-lg shadow bg-white border-2 border-yellow-500 w-64">
      {/* Input Handle */}
      <Handle
        type="target"
        position="top"
        id="wait-target"
        style={{
          background: "#ecc94b",
          width: "12px",
          height: "12px",
          top: "-6px",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
          <div className="font-medium">Wait/Delay</div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {/* Expanded Section */}
      {isExpanded ? (
        <div className="mt-3 flex items-center space-x-2">
          <label className="block text-sm font-medium text-gray-700">
            Wait for
          </label>
          <input
            type="number"
            name="delay"
            value={data.delay || 1}
            onChange={handleChange}
            min="1"
            className="block w-16 rounded-md border-gray-300 shadow-sm p-2 text-sm border"
          />
          <select
            name="delayUnit"
            value={data.delayUnit || "days"}
            onChange={handleChange}
            className="block rounded-md border-gray-300 shadow-sm p-2 text-sm border"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-600">
          Wait for {data.delay || 1} {data.delayUnit || "days"}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position="bottom"
        id="wait-source"
        style={{
          background: "#ecc94b",
          width: "12px",
          height: "12px",
          bottom: "-6px",
        }}
      />
    </div>
  );
};

export default WaitNode;
