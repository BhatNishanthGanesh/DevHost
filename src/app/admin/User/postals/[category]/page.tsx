"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Import useParams to get dynamic params
import { FaReact, FaBriefcase, FaTools } from "react-icons/fa"; // Example icons from react-icons
import { Navbar } from "@/app/components/navbar";

// Default images for categories
const categoryImages: { [key: string]: string } = {
  "web/app": "/images/web-app.jpg",
  electronics: "/Assets/electronics.jpg",
  others: "/Assets/others.jpg",
  business: "/Assets/business.jpg",
};

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the dynamic route
  const [categoryUrls, setCategoryUrls] = useState<any[]>([]); // To store fetched URLs
  const [isLoading, setIsLoading] = useState<boolean>(false); // For loading state

  // Fetch category URLs based on the category from the URL
  useEffect(() => {
    if (category) {
      // @ts-ignore
      fetchCategoryUrls(category); // Fetch URLs when category changes
    }
  }, [category]);

  // Fetch URLs for the selected category
  const fetchCategoryUrls = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://alumni-connect-backend-iydi.onrender.com/get-all-urls"
      );
      const data = await response.json();

      // Get the current URL and cut the last part
      const currentUrl = window.location.pathname;
      const currentCategory = currentUrl.split("/").pop(); // Split and get the last part

      // Filter URLs based on the category
      const filteredUrls = data.data.filter(
        (item: { category: string; url: string }) => item.category === category
      );

      // Set filtered URLs
      setCategoryUrls(filteredUrls);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCategoryUrls([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get the category icon or image based on the category
  const getCategoryImage = (category: string) => {
    return categoryImages[category] || "/Assets/Image1.png";
  };

  // Function to extract the domain from the URL without '//' and '.com'
  const extractUrlSegment = (url: string) => {
    const regex = /(?:\/\/)?([^\/]+\.com)/; // Updated regex to exclude '//' part
    const match = url.match(regex);
    return match ? match[1] : url; // Return domain without '//' or the whole URL if no match
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen pt-[100px] flex flex-col p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          {category}
        </h1>

        {/* Category Image */}
        <div className="flex justify-center mb-6">
          <img
            /* @ts-ignore */
            src={getCategoryImage(category)}
            /* @ts-ignore */
            alt={category}
            className="w-40 h-40 object-cover rounded-full shadow-md"
          />
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : categoryUrls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categoryUrls.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-lg hover:shadow-none transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {/* Category Icon */}
                    {category === "web/app" && (
                      <FaReact size={30} color="#61dafb" />
                    )}
                    {category === "electronics" && (
                      <FaTools size={30} color="#4caf50" />
                    )}
                    {category === "others" && (
                      <FaBriefcase size={30} color="#ff9800" />
                    )}
                    <div className="text-lg font-semibold">
                      {extractUrlSegment(item.url)} {/* Display URL segment without '//' */}
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(item.url, "_blank")}
                    className="bg-blue-500 text-white p-2 rounded-md w-full text-center"
                  >
                    Open URL
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No Jobs aren't right now at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
