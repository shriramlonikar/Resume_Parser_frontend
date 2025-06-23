import React from "react";

const TextArea = ({ geminiResponse }) => {
  return (
    <div className="w-full max-w-4xl mx-auto border rounded-2xl border-yellow-400 bg-transparent min-h-[150px] p-4 text-gray-300 overflow-y-auto whitespace-pre-wrap">
      {geminiResponse || "Response will appear here after analysis."}
    </div>
  );
};

export default TextArea;
