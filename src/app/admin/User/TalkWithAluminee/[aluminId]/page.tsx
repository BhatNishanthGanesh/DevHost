"use client"
import React, { useState, useEffect } from "react";
import socket from "@/app/components/socket";
import { Navbar } from "@/app/components/navbar";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");

  useEffect(() => {
    // Get the user data from localStorage
    const user = localStorage.getItem("user");
    
    // Parse the user data
    const parsedUser = user ? JSON.parse(user) : null;

    // Access the 'id' and 'name' properties
    const userId = parsedUser?.id;
    const username = parsedUser?.name;

    console.log(username);

    // Get the last segment of the URL as receiverId
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    console.log(lastSegment);

    // Store receiverId in localStorage
    localStorage.setItem("receiverId", lastSegment);

    // Set userId and receiverId state
    setUserId(userId);
    setReceiverId(lastSegment); 

    // Emit the user identification to socket
    if (user) {
      socket.emit("identifyUser", user);
    }

    // Fetch user name using fetch API
    if (userId) {
      fetch(`https://socket-backend-xf92.onrender.com/getUserName/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserName(data.name);
        })
        .catch((err) => {
          console.error("Error fetching user name:", err);
        });
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (incomingMessage) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    // Cleanup socket event listener when the component is unmounted
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "" && receiverId && userId) {
      const newMessage = {
        text: message,
        senderId: userId,
        receiverId: receiverId,
        id: Date.now(),
      };

      // Emit the message via socket
      socket.emit("sendMessage", newMessage);
      setMessage(""); // Reset message input
    }
  };

  return (
    <div >
        <Navbar/>
      <div className="px-5 mb-[80px] py-2 text-sm text-gray-500">
        {userName ? `Hello, ${userName}` : "Loading user name..."}
      </div>
      <div className="container mx-auto shadow-lg rounded-lg">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">GoingChat</div>
        </div>
        <div className="flex flex-row justify-between bg-white">
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div
                    className={`py-3 px-4 ${msg.senderId === userId ? "bg-blue-400" : "bg-gray-400"} rounded-lg text-white max-w-xs break-words`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="py-5">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
