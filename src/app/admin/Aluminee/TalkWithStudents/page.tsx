'use client';

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [alumniData, setAlumniData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://alumni-connect-backend-iydi.onrender.com/get-all-alumni")
      .then((response) => response.json())
      .then((data) => setAlumniData(data.alumni))
      .catch((err) => console.log("Error fetching alumni data:", err));
  }, []);

  return (
    <div>
      <h1>Alumni Details</h1>
      {alumniData.length > 0 ? (
        alumniData.map((alumni, index) => (
          <div key={index} className="alumni-card">
            <h2>{alumni.name}</h2>
            <h2>{alumni._id}</h2>
            <p><strong>Phone:</strong> {alumni.phone_number}</p>
            <p><strong>Company:</strong> {alumni.company}</p>
            <p><strong>Location:</strong> {alumni.location}</p>
            <p><strong>Advice:</strong> {alumni.advice.join(', ')}</p>
            <p><strong>Requirements:</strong> {alumni.requirements.join(', ')}</p>
            <p><strong>Chats:</strong></p>
            <ul>
              {alumni.chats.length > 0 ? (
                alumni.chats.map((chatId:any, index:any) => (
                  <li key={index}>Chat ID: {chatId}</li>
                ))
              ) : (
                <li>No chats available</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading alumni data...</p>
      )}
    </div>
  );
};

export default Page;
