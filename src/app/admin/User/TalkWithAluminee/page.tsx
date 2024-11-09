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
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [alumineesData, setAlumineesData] = useState<Aluminee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAlum, setSelectedAlum] = useState<Aluminee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('name');
  const router = useRouter();

  // Fetch alumni data from the API
  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await fetch("https://alumni-connect-backend-iydi.onrender.com/get-all-alumni");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(data);

          const filteredData = data.alumni.map((alum: any) => ({
            _id: alum._id,
            name: alum.name,
            phone_number: alum.phone_number,
            password: alum.password,
            company: alum.company,
            stack: alum.stack,
            package: alum.package,
            location: alum.location,
            advice: alum.advice,
            comment: alum.comment,
            requirements: alum.requirements,
            chats: alum.chats,
            __v: alum.__v
          }));

          // Sort alumni by highest LPA first
          filteredData.sort((a: any, b: any) => b.package - a.package);

          setAlumineesData(filteredData);
          setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
        } else {
          throw new Error("Expected JSON response, but received non-JSON content");
        }
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
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return alumineesData.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const openModal = (alum: Aluminee) => {
    setSelectedAlum(alum);
  };

  const closeModal = () => {
    setSelectedAlum(null);
  };

  const filterAluminees = (data: Aluminee[]) => {
    return data.filter((alum) => {
      if (selectedCategory === 'name') {
        return alum.name.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (selectedCategory === 'company') {
        return alum.company.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (selectedCategory === 'package') {
        return alum.package.toString().includes(searchQuery);
      }
      return true;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Meet Past Alumni</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Explore the success stories of our alumni who made remarkable strides in their careers</p>

        {/* Search and Category Selection */}
        <div className="flex justify-between mb-4">
          <div className="relative w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-full border-2 dark:bg-neutral-800 text-neutral-700 placeholder-neutral-400 focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <FiSearch />
            </span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-2 rounded-full p-2"
          >
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="package">Package</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterAluminees(getCurrentPageData()).map((alum) => (
            <div
              key={alum._id}
              className="p-4 border rounded-lg shadow-lg cursor-pointer"
              onClick={() => openModal(alum)}
            >
              <h2 className="text-xl font-semibold">{alum.name}</h2>
              <p className="text-gray-600">{alum.company}</p>
              <p className="text-gray-500">{alum.stack.join(', ')}</p>
              <p className="text-gray-500">Package: ₹{alum.package} LPA</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
              className={`px-4 py-2 mx-2 rounded-md ${
                pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Modal for showing selected alumni details */}
        {selectedAlum && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Alumni Details</h2>
              <div>
                <p><strong>Name:</strong> {selectedAlum.name}</p>
                <p><strong>Phone Number:</strong> {selectedAlum.phone_number}</p>
                <p><strong>Company:</strong> {selectedAlum.company}</p>
                <p><strong>Stack:</strong> {selectedAlum.stack.join(', ')}</p>
                <p><strong>Package:</strong> ₹{selectedAlum.package} LPA</p>
                <p><strong>Location:</strong> {selectedAlum.location}</p>
                <p><strong>Advice:</strong> {selectedAlum.advice.join(', ')}</p>
                <p><strong>Comment:</strong> {selectedAlum.comment}</p>
                <p><strong>Requirements:</strong> {selectedAlum.requirements.join(', ')}</p>
                <div>
                  <Button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Close
                  </Button>
                  <Button onClick={() => {
                    localStorage.setItem('currentChatId', selectedAlum._id);
                    localStorage.setItem('chatWithName', selectedAlum.name);
                    router.push(`/admin/User/TalkWithAluminee/${selectedAlum._id}`);
                  }}>
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
