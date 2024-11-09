"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/app/components/navbar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

interface Aluminee {
  _id: string;
  name: string;
  phone_number: string;
  password: string;
  company: string;
  stack: string[];
  package: number;
  location: string;
  advice: string[];
  comment: string;
  requirements: string[];
  chats: string[];
  __v: number;
}

const Page = () => {
  const rowsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [alumineesData, setAlumineesData] = useState<Aluminee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAlum, setSelectedAlum] = useState<Aluminee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('name');
  const router = useRouter();

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await fetch("https://alumni-connect-backend-iydi.onrender.com/get-all-alumni");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        const filteredData = data.alumni.map((alum: any) => ({
          ...alum,
        }));

        filteredData.sort((a: any, b: any) => b.package - a.package);
        setAlumineesData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumniData();
  }, []);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageData = () => {
    const filteredData = filterAluminees(alumineesData);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const filterAluminees = (data: Aluminee[]) => {
    let filteredData = data;
    if (selectedCategory === 'name') {
      filteredData = data.filter((alum) => alum.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    filteredData.sort((a, b) => {
      if (selectedCategory === 'name') return a.name.localeCompare(b.name);
      if (selectedCategory === 'company') return a.company.localeCompare(b.company);
      return b.package - a.package;
    });

    return filteredData;
  };

  const handleChatClick = (alumId: string) => {
    router.push(`/admin/User/TalkWithAluminee/${alumId}`);
  };

  return (
    <div className='dark:bg-gray-900 min-h-screen'>
      <Navbar />
      <div className="pt-[100px] px-6">
        <h1 className="text-4xl font-bold text-center mb-6">Meet Past Alumni's</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">Explore the success stories of our alumni who made remarkable strides in their careers</p>

        <div className="flex justify-between mb-4">
          <div className="relative w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full py-2 pl-10 pr-4 rounded-full border-2 border-gray-400 dark:bg-neutral-300 text-neutral-700 dark:placeholder-neutral-700 placeholder-neutral-700 focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-neutral-700 text-neutral-500">
              <FiSearch />
            </span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-2 rounded-full dark:bg-white dark:text-gray-800 cursor-pointer p-2"
          >
            <option value="name" className='cursor-pointer'>Name</option>
            <option value="company" className='cursor-pointer'>Company</option>
            <option value="package" className='cursor-pointer'>Package</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getCurrentPageData().map((alum) => (
            <div
              key={alum._id}
              className="p-4 border rounded-lg dark:bg-gray-600 shadow-lg cursor-pointer hover:shadow-none"
              onClick={() => setSelectedAlum(alum)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {alum.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{alum.name}</h2>
                  <p className="text-gray-600 dark:text-gray-200">{alum.company}</p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-200 mt-2">Stack: {alum.stack.join(', ')}</p>
              <p className="text-gray-500 dark:text-gray-200">Package: ₹{alum.package} LPA</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
              className={`px-4 py-2 mx-2 rounded-md ${pageNumber === currentPage ? 'bg-gray-200 text-black' : 'bg-gray-900 text-white'}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {selectedAlum && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Alumni Details</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedAlum.name}</p>
                <p><strong>Phone Number:</strong> {selectedAlum.phone_number}</p>
                <p><strong>Company:</strong> {selectedAlum.company}</p>
                <p><strong>Stack:</strong> {selectedAlum.stack.join(', ')}</p>
                <p><strong>Package:</strong> ₹{selectedAlum.package} LPA</p>
                <p><strong>Location:</strong> {selectedAlum.location}</p>
                <p><strong>Advice:</strong> {selectedAlum.advice.join(', ')}</p>
                <p><strong>Requirements:</strong> {selectedAlum.requirements.join(', ')}</p>
              </div>
              <div className="mt-6 flex justify-between">
                <Button onClick={() => setSelectedAlum(null)} className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600">Close</Button>
                <Button
                  onClick={() => handleChatClick(selectedAlum._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
