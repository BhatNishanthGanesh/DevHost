"use client";

import { Navbar } from '@/app/components/navbar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const Page = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle button click and navigate to another page
  const handleCategoryClick = (category: string) => {
    router.push(`/admin/User/postals/${category}`); // Navigate to category page with category as a URL parameter
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {/* Category Buttons */}
        <Button
          className="bg-teal-600 text-white p-10 rounded-lg text-2xl font-semibold shadow-md hover:bg-teal-700 transition duration-300 h-full"
          onClick={() => handleCategoryClick('mechanics')}
        >
          mechanics
        </Button>

        <Button
          className="bg-blue-600 text-white p-10 rounded-lg text-2xl font-semibold shadow-md hover:bg-blue-700 transition duration-300 h-full"
          onClick={() => handleCategoryClick('web/app')}
        >
          web/app
        </Button>

        <Button
          className="bg-purple-600 text-white p-10 rounded-lg text-2xl font-semibold shadow-md hover:bg-purple-700 transition duration-300 h-full"
          onClick={() => handleCategoryClick('ai_ml')}
        >
          ai/ml
        </Button>

        <Button
          className="bg-orange-600 text-white p-10 rounded-lg text-2xl font-semibold shadow-md hover:bg-orange-700 transition duration-300 h-full"
          onClick={() => handleCategoryClick('electronics')}
        >
          electronics
        </Button>

        <Button
          className="bg-green-600 text-white p-10 rounded-lg text-2xl font-semibold shadow-md hover:bg-green-700 transition duration-300 h-full"
          onClick={() => handleCategoryClick('Software')}
        >
          Software
        </Button>

        <Button
          className="bg-gray-600 text-white p-10 rounded-lg text-2xl font-semibold shadow-md hover:bg-gray-700 transition duration-300 h-full"
          onClick={() => handleCategoryClick('others')}
        >
          others
        </Button>
      </div>
    </div>
  );
};

export default Page;
