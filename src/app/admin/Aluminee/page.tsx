'use client';
import { Navbar } from "@/app/components/navbar";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [referralLink, setReferralLink] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the form is properly filled
    if (!referralLink || !category) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Prepare form data as JSON
    const formData = {
      url: referralLink,
      category: category,
    };

    setLoading(true);
    setMessage(""); // Reset message

    try {
      const response = await fetch("https://alumni-connect-backend-iydi.onrender.com/create-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Tell the server it's JSON
        },
        body: JSON.stringify(formData), // Send the JSON object
      });

      // Check if the response is successful
      if (response.ok) {
        const result = await response.json(); // Handle the response if needed
        setMessage("Referral link successfully submitted!");
        setReferralLink("");
        setCategory("");
      } else {
        const errorData = await response.json(); // Optionally, log the error data from the server
        setMessage(`Error: ${errorData.message || "Failed to submit referral link."}`);
      }
    } catch (error) {
      console.log("Network error:", error); // Log the error to debug further
      setMessage("Network error occurred.");
    } finally {
      setLoading(false); // Ensure loading is set to false
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-lg p-6  bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-black text-center mb-4">Submit Referral Link</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Referral Link Field */}
          <div>
            <label htmlFor="url" className="block mb-2 text-sm font-medium  text-gray-700">
              Referral Link
            </label>
            <input
              id="url"
              type="url"
              name="url"
              value={referralLink}
              onChange={(e) => setReferralLink(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-white dark:text-black"
              placeholder="https://example.com/referral"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-white dark:text-black"
              required
            >
              <option value="">Select a Category</option>
              <option value="electronics">Electronics</option>
              <option value="mechanics">Mechanics</option>
              <option value="web-app">Web App</option>
              <option value="ai-ml">AI/ML</option>
              <option value="Software">Software</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {/* Response Message */}
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default Page;
