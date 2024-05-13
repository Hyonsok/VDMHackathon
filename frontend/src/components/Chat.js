import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Chat() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Add state for current user ID
  const [recipientId, setRecipientId] = useState(null);

  // Sample chat data
  const chatData = [
    {
      recipientId: "test-1",
      name: "Jane",
      latestMsg: "Hello there!",
      url: "../img/rabbit_01.jpg",
    },
    // {
    //   recipientId: "2",
    //   name: "John",
    //   latestMsg: "Hey!",
    //   url: "../img/chat_02.jpg",
    // },
    // Add more chat items as needed
  ];

  const currentUserData = JSON.parse(localStorage.getItem("currentUser"));

  // Fetch messages for a specific user
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/messages/${currentUserData.userId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [currentUserData.userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/${currentUserData.userId}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  console.log(currentUser)

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:4000/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from_userId: currentUserData.userId, to_userId: recipientId, message: text }),
      });
      if (response.ok) {
        console.log('Message sent successfully');
        // Update messages state with the new message
        const newMessage = { from_userId: currentUserData.userId, to_userId: recipientId, message: text };
        setMessages([...messages, newMessage]);
        // Clear the input field
        setText('');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatHome">
      <div className="chatContainer">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="navbar">
            <Link to="/" className="chatLogo">
              Take Me
            </Link>
            <p className="userName">user</p>
          </div>
          {/* Chats */}
          <div className="chats">
            {/* Display user chats */}
            {chatData.map((chat) => (
              <div
                className="chatItem"
                key={chat.recipientId}
                onClick={() => setRecipientId(chat.recipientId)}
              >
                <img src={chat.url} alt={`${chat.name} pic`} className="chatImage"/>
                <div className="chatInfo">
                  <span>{chat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chat */}
        <div className="chat">
          {/* Chat info */}
          <div className="chatInfo">{recipientId ? `Chat with ${chatData.find(chat => chat.recipientId === recipientId).name}` : 'Select a chat'}</div>
          {/* Chat screen */}
          <div className="chatScreen">
            {/* Display messages */}
            {messages.map((message, index) => (
              <div className="message owner" key={index}>
                <div className="messageInfo">
                  <img src={message.from_userId === currentUserData.userId ? `../img/${currentUser.image}` : ''} alt="chatpic" />
                </div>
                <div className="messageContent">
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Chat input */}
          <div className="chatInput">
            <input
              type="text"
              placeholder="Type something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="send">
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
