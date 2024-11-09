"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from "sonner"

const AlumniSignupPage = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [stack, setStack] = useState<string[]>([]);
    const [packageAmount, setPackageAmount] = useState<number | ''>('');
    const [location, setLocation] = useState('');
    const [advice, setAdvice] = useState('');
    const [comment, setComment] = useState('');
    const [requirements, setRequirements] = useState<string[]>([]);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        if (!page) {
            setError('Page parameter is missing.');
            setLoading(false);
            return;
        }

        try {
            // const response = await fetch(`/Signup/alumni/api`, {
            const response = await fetch(`https://alumni-connect-backend-iydi.onrender.com/create-profile/${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone_number: phoneNumber,
                    password,
                    company,
                    stack,
                    package: packageAmount,
                    location,
                    advice,
                    comment,
                    requirements,
                    page
                }),
            });
            

            const data = await response.json();

            if (response.ok) {
               
                toast.success('Registration successful!')
                setTimeout(() => {
                    router.push('/Login/alumni');
                }, 1500);
            } else {
                toast.error(data.message || 'Registration failed')
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
                    <h2 className="text-3xl font-bold text-center text-gray-800">Join as Alumni</h2>
                    <p className="text-center text-gray-600">
                        Become part of our alumni community to mentor and inspire.
                    </p>

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
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your phone number"
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
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your company"
                            />
                        </div>
                        <div>
                            <label htmlFor="stack" className="block text-sm font-medium text-gray-700">Stack</label>
                            <input
                                type="text"
                                id="stack"
                                name="stack"
                                value={stack.join(', ')}
                                onChange={(e) => setStack(e.target.value.split(',').map(item => item.trim()))}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your stack (e.g. Backend, Data Science)"
                            />
                        </div>
                        <div>
                            <label htmlFor="package" className="block text-sm font-medium text-gray-700">Package</label>
                            <input
                                type="number"
                                id="package"
                                name="package"
                                value={packageAmount}
                                onChange={(e) => setPackageAmount(e.target.valueAsNumber)}
                                required
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your package"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your location"
                            />
                        </div>
                        <div>
                            <label htmlFor="advice" className="block text-sm font-medium text-gray-700">Advice</label>
                            <input
                                type="text"
                                id="advice"
                                name="advice"
                                value={advice}
                                onChange={(e) => setAdvice(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your advice (e.g. Take on challenging projects)"
                            />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your comment"
                            />
                        </div>
                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                            <input
                                type="text"
                                id="requirements"
                                name="requirements"
                                value={requirements.join(', ')}
                                onChange={(e) => setRequirements(e.target.value.split(',').map(item => item.trim()))}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your requirements (e.g. Python, Data Science)"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    {successMessage && <p className="text-green-600 text-center mt-2">{successMessage}</p>}

                    <div className="flex flex-col items-center mt-6 space-y-2 text-sm text-gray-600">
                        <p>Already have an account? <Link href="/Login/alumni" className="text-indigo-600 hover:underline">Login here</Link></p>
                    </div>
                </div>
            </div>

            <div
                className="hidden w-1/2 bg-cover bg-center lg:block"
                style={{ backgroundImage: "url('/Assets/Image3.jpg')" }}
            ></div>
        </div>
    );
};

export default AlumniSignupPage;
