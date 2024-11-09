"use client";

import { Navbar } from '@/app/components/navbar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Page = () => {
  const router = useRouter();

  // Function to handle button click and navigate to another page
  const handleCategoryClick = (category:any) => {
    router.push(`/admin/User/postals/${category}`);
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen pt-[90px] flex flex-col bg-white dark:bg-gray-800">
        <h1 className="text-3xl text-center mb-5">Job Postings Open</h1>
        <div className="flex-grow flex justify-center items-center p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <CategoryCard
              category="mechanics"
              image="/Assets/mech.jpg"
              description="Explore jobs in mechanics engineering"
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="web-app"
              image="/Assets/web.jpg"
              description="Openings for web developers"
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="ai-ml"
              image="/Assets/ai.jpg"
              description="Positions in AI & machine learning"
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="electronics"
              image="/Assets/electronics.jpg"
              description="Roles in electronics engineering"
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="Software"
              image="/Assets/software.jpg"
              description="Software development jobs"
              onClick={handleCategoryClick}
            />
            <CategoryCard
              category="others"
              image="/Assets/others.jpg"
              description="Various other positions"
              onClick={handleCategoryClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category, image, description, onClick }:any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="rounded-lg shadow-lg overflow-hidden border dark:border-gray-600"
    >
      <div className="relative w-full h-32 overflow-hidden">
        <img src={image} alt={category} className="object-cover w-full h-full" />
      </div>
      <div className="p-4 flex flex-col items-center text-center">
        <h2 className="text-xl font-bold mb-2">{category}</h2>
        <p className="text-sm mb-4">{description}</p>
        <Button
          className="text-white bg-gray-500 rounded-md px-4 py-2 hover:bg-gray-700"
          onClick={() => onClick(category)}
        >
          Explore
        </Button>
      </div>
    </motion.div>
  );
};

export default Page;
