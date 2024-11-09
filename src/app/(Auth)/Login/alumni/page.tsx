"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from "sonner"

const AlumniLoginPage = () => {
  const router = useRouter();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://alumni-connect-backend-iydi.onrender.com/login/alumni`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      console.log(data);
      

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_id', data.userId);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect or perform any post-login action
      router.push('/admin/Aluminee'); // Redirect to dashboard on successful login
    } catch (err: any) {
      toast.error(err.message)

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden w-1/2 bg-cover shadow-lg bg-center lg:block" style={{ backgroundImage: "url('/Assets/Image1.png')" }}></div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2 bg-gray-50">
        <div className="w-full max-w-md space-y-6 bg-white p-10 rounded-lg shadow-lg">
          {/* Left Arrow to go to Landing Page */}
          <Link href="/">
              <FaArrowLeft className="w-6 h-6" />
           
          </Link>

          <h2 className="text-3xl font-bold text-center text-gray-800">Alumni Login</h2>
          <p className="text-center text-gray-600">Reconnect with your alma mater and help guide the next generation.</p>

          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Aluminee Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Alumni name"
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
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="flex flex-row items-center mt-6 space-x-2 text-sm text-gray-600">
  <p>New to the alumni network?</p>
  <p className='text-blue-700'><Link href="/Signup/alumni">Join as Alumni</Link></p>
</div>
        </div>
      </div>
    </div>
  );
};

export default AlumniLoginPage;
