import React, { useState } from "react";
import axiosInstance from "../axios/axiosinstinct";

const GetResume = ({ setGeminiResponse }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleClick = async (mode) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("job_description", jobDescription);
      formData.append("mode", mode);

      const res = await axiosInstance.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setGeminiResponse(res.data.response);
    } catch (err) {
      console.error("Error:", err);
      setGeminiResponse("Something went wrong.");
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 bg-transparent rounded-2xl shadow-md border border-yellow-400">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Upload Resume (PDF)</h2>
        <label className="block border border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:bg-gray-300 transition">
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
          <div className="text-center text-gray-600">
            {fileName ? (
              <p className="font-medium text-gray-600">📄 {fileName}</p>
            ) : (
              <p>Click to select a PDF file</p>
            )}
          </div>
        </label>

        <textarea
          placeholder="Enter Job Description"
          className="mt-4 w-full p-3 border border-gray-300 rounded-lg text-gray-300 bg-transparent placeholder-gray-500"
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="w-full max-w-2xl mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => handleClick("review")}
            className="w-full bg-transparent border border-gray-300 hover:bg-blue-400 hover:text-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg transition"
          >
            Tell me about the Resume
          </button>
          <button
            onClick={() => handleClick("match")}
            className="w-full bg-transparent border border-gray-300 hover:bg-green-400 hover:text-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg transition"
          >
            Percentage Match
          </button>
        </div>
      </div>
    </>
  );
};

export default GetResume;
