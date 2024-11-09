"use client";

import { Navbar } from '@/app/components/navbar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { motion } from 'framer-motion';

const Page = () => {
  const router = useRouter(); 

  // Function to handle button click and navigate to another page
  const handleCategoryClick = (category: string) => {
    router.push(`/admin/User/postals/${category}`); 
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-800">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {/* Category Buttons */}
          <CategoryButton
            category="mechanics"
            color="bg-teal-600"
            onClick={handleCategoryClick}
          />
          <CategoryButton
            category="web-app"
            color="bg-blue-600"
            onClick={handleCategoryClick}
          />
          <CategoryButton
            category="ai_ml"
            color="bg-purple-600"
            onClick={handleCategoryClick}
          />
          <CategoryButton
            category="electronics"
            color="bg-orange-600"
            onClick={handleCategoryClick}
          />
          <CategoryButton
            category="Software"
            color="bg-green-600"
            onClick={handleCategoryClick}
          />
          <CategoryButton
            category="others"
            color="bg-gray-600"
            onClick={handleCategoryClick}
          />
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({ category, color, onClick }: any) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        <Button
          className={`relative ${color} text-white text-3xl font-semibold shadow-lg hover:scale-105 transform transition duration-300 ease-in-out 
          w-64 h-48 border-l-8 border-gray-800 hover:border-gray-600 dark:hover:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color.split('-')[0]}-500`}
          onClick={() => onClick(category)}
        >
          {category}
        </Button>
      </motion.div>
    );
  };
  
export default Page;


