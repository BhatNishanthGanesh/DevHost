'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const SignupPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 
  const [page, setPage] = useState<string | null>(null);

  useEffect(() => {
    const pathname = window.location.pathname; 
    const extractedPage = pathname.split('/Signup/')[1];
    if (extractedPage) {
        setPage(extractedPage);
    } else {
        setError('Page parameter is missing.');
    }
}, []);

  // useEffect(() => {
  //   if (!page) {
  //     setError('Page parameter is missing.');
  //   }
  // }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!page) {
      setError('Page parameter is missing.');
      return;
    }

    try {
      // const response = await fetch('/Signup/student/api', {
      const response = await fetch(`https://alumni-connect-backend-iydi.onrender.com/create-profile/${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, page: page }), 
      });

      const data = await response.json();
      console.log(response);

      if (response.ok) {
        setSuccessMessage('Registration successful!');
       
        setTimeout(() => {
          router.push('/Login/student'); // Navigate to the login page
        }, 1500); // Optional: Add a delay before navigating
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2 bg-gray-50">
        <div className="w-full max-w-md space-y-6 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">Join as a User</h2>
          <p className="text-center text-gray-600">
            Sign up to connect with alumni, gain mentorship, and explore career opportunities.
          </p>

          {/* Error or Success message */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex flex-col items-center mt-6 space-y-2 text-sm text-gray-600">
            <p>Already have an account? <a href="/Login/student" className="text-indigo-600 hover:underline">Login here</a></p>
          </div>
        </div>
      </div>
      <div
        className="hidden w-1/2 bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/Assets/Image2.png')" }} 
      ></div>
    </div>
  );
};

export default SignupPage;
