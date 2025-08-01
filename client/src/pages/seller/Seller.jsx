import React, { useState } from 'react';
import { Navbar } from '../Navbar';

export const Seller = () => {
  const [testerName, setTesterName] = useState('');
  const [productName, setProductName] = useState('');
  const [workingParts, setWorkingParts] = useState('');
  const [nonWorkingParts, setNonWorkingParts] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      testerName,
      productName,
      workingParts,
      nonWorkingParts,
      date,
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl pb-7"
        >
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            Seller - Upload Refurbished Product
          </h2>

          <label className="block mb-2 font-medium">Tester Name/ID</label>
          <input
            type="text"
            value={testerName}
            onChange={(e) => setTesterName(e.target.value)}
            placeholder="Enter Tester Name or ID"
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

          <label className="block mb-2 font-medium">Verified Working Parts List</label>
          <input
            type="text"
            value={workingParts}
            onChange={(e) => setWorkingParts(e.target.value)}
            placeholder="List of working parts"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">Verified Non-Working Parts List</label>
          <input
            type="text"
            value={nonWorkingParts}
            onChange={(e) => setNonWorkingParts(e.target.value)}
            placeholder="List of non-working parts"
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block mb-2 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-6 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
