'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from "sonner"


const LoginPage = () => {
  const router = useRouter();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if username and password are not empty before submitting
    if (!name || !password) {
      setError('Username and password are required.');
      setLoading(false);
      return;
    }

    try {
      // Sending the login request to the API route
      const response = await fetch('https://alumni-connect-backend-iydi.onrender.com/login/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, page: 'student' }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_id', data.userId);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to /admin/user page if login is successful
        toast.success('Successfully Logged In')
        
        router.push('/admin/User');
      } else {
        setError(data.message || 'Invalid credentials');
        toast.error('Event has not been created')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      toast.error('Event has not been created')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center">
        <img
          src="/Assets/UserLogin.jpg"
          alt="Alumni Network"
          className="w-3/4 h-3/4 object-cover shadow-lg rounded-md"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <Link
            href="/"
            className="absolute top-4 left-4 text-white p-2 bg-black rounded-full hover:text-gray-200"
          >
            <FaArrowLeft className="w-6 h-6" />
          </Link>
          <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back User</h2>
          <p className="text-center text-gray-500">Login to connect with alumni</p>

          {/* Error message */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out"
                placeholder="Your secure password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="flex flex-col items-center mt-8 space-y-2 text-sm text-gray-600">
            <p>
              New User here?{' '}
              <Link href="/Signup/student" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                Sign up
              </Link>
            </p>
            <p>
              Are you an alum?{' '}
              <Link href="/Login/alumni" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                Log in as alumni
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
