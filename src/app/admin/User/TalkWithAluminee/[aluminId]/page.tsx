"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ChatPage = () => {
  const { alumniId } = useParams();
  const [chatWithName, setChatWithName] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const API_URL = "https://chat-app-b39u.onrender.com/api";

  useEffect(() => {
    // Check if window is available (i.e., we're on the client side)
    if (typeof window !== "undefined") {
      const storedAuthToken = localStorage.getItem("authToken");
      const storedChatId = localStorage.getItem("currentChatId");
      const storedChatWithName = localStorage.getItem("chatWithName");

      setAuthToken(storedAuthToken);
      setCurrentChatId(storedChatId);

      if (storedChatWithName) {
        setChatWithName(storedChatWithName);
      }
    }
  }, []);

  useEffect(() => {
    if (currentChatId) {
      loadMessages();
    }

    const interval = setInterval(() => {
      if (currentChatId) {
        loadMessages();
      }
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [currentChatId, alumniId]);

  // Load messages from API
  const loadMessages = async () => {
    try {
      let url = `${API_URL}/chat/messages/${currentChatId}`;
      if (lastMessageId) {
        url += `?after=${lastMessageId}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);

      if (data.length > 0) {
        setLastMessageId(data[data.length - 1]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!message || !currentChatId) {
      alert("Please type a message");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          receiverId: currentChatId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      if (data._id) {
        loadMessages();
        setMessage(""); // Clear input field
      }
    } catch (err) {
      console.error(err);
    }
  };

  // End the chat session
  const endChat = () => {
    localStorage.removeItem("currentChatId");
    localStorage.removeItem("chatWithName");
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <div className="container mt-5 chat-container">
      <h1 className="text-center">Chat with {chatWithName}</h1>

      {/* Chat Interface */}
      <div id="chatInterface" className="mt-5">
        <div
          id="messages"
          style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", backgroundColor: "#f9f9f9" }}
        >
          {messages.map((message, index) => {
            const isSender = message.sender._id !== currentChatId;
            return (
              <div
                key={message._id}
                className={`message ${isSender ? "sender" : "receiver"}`}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isSender ? "flex-end" : "flex-start",
                }}
              >
                <span className="sender" style={{ fontWeight: "bold", color: "#555" }}>
                  {message.sender.username}:
                </span>
                <span
                  className="text"
                  style={{
                    marginLeft: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: isSender ? "#0084ff" : "#e0e0e0",
                    color: isSender ? "white" : "black",
                    maxWidth: "70%",
                  }}
                >
                  {message.message}
                </span>
              </div>
            );
          })}
        </div>

        <div className="input-group mt-3" style={{ display: "flex", gap: "10px" }}>
          <textarea
            id="message"
            className="form-control"
            placeholder="Type your message..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          ></textarea>
          <button className="btn btn-success" onClick={sendMessage} style={{ padding: "10px 20px" }}>
            Send
          </button>
        </div>

        <button className="btn btn-secondary mt-3" onClick={endChat} style={{ padding: "10px 20px" }}>
          End Chat
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
