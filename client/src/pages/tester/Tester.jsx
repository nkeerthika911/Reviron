import React, { useState } from 'react';
import { Navbar } from '../Navbar';

export const Tester = () => {
  const [collectorName, setCollectorName] = useState('');
  const [productName, setProductName] = useState('');
  const [testingReport, setTestingReport] = useState('');
  const [nonWorkingParts, setNonWorkingParts] = useState('');
  const [workingParts, setWorkingParts] = useState('');
  const [testingDate, setTestingDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      collectorName,
      productName,
      testingReport,
      nonWorkingParts,
      workingParts,
      testingDate,
    });
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Navbar />

      {/* Scrollable content starts here */}
      <div className="flex-1 overflow-y-auto pt-8 pb-8 flex justify-center items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            Tester - Product Testing Form
          </h2>

          <label className="block mb-2 font-medium">Collector Name/ID</label>
          <input
            type="text"
            value={collectorName}
            onChange={(e) => setCollectorName(e.target.value)}
            placeholder="Enter Collector Name or ID"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter Product Name"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">
            Testing Report (working/non-working parts)
          </label>
          <textarea
            value={testingReport}
            onChange={(e) => setTestingReport(e.target.value)}
            placeholder="Enter testing report..."
            rows="4"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">Non-working Parts List</label>
          <input
            type="text"
            value={nonWorkingParts}
            onChange={(e) => setNonWorkingParts(e.target.value)}
            placeholder="List of non-working parts"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">Working Parts List</label>
          <input
            type="text"
            value={workingParts}
            onChange={(e) => setWorkingParts(e.target.value)}
            placeholder="List of working parts"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">Testing Date</label>
          <input
            type="date"
            value={testingDate}
            onChange={(e) => setTestingDate(e.target.value)}
            className="w-full p-3 mb-6 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-[#81AD87] text-white py-3 rounded-lg hover:bg-[#92BE98] shadow-sm transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
