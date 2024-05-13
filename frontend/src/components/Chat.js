import React, { useState } from "react";
import { Link } from "react-router-dom";

const db = [
  {
    name: "Jane",
    latestMsg: "hello",
    url: "../img/chat_01.jpg",
  },
  {
    name: "Jane",
    latestMsg: "hello",
    url: "../img/chat_01.jpg",
  },
  {
    name: "Jane",
    latestMsg: "hello",
    url: "../img/chat_01.jpg",
  },
  {
    name: "Jane",
    latestMsg: "hello",
    url: "../img/chat_01.jpg",
  },
];

function Chat() {
  const [text, setText] = useState("");

  const handleSend = () => {
    console.log(text);
  };

  return (
    <div className="chatHome">
      <div className="chatContainer">
        <div className="sidebar">
          <div className="navbar">
            <Link to="/" className="chatLogo">
              Take Me
              {/* <img className="mx-auto h-10 w-10 rounded-full" src={logo} alt="takeMeLogo" /> */}
            </Link>
            <p className="userName">user</p>
          </div>
          <div className="chats">
            {db.map((user, index) => (
              <div className="userChat" key={index}>
                <img src={user.url} alt={`${user.name} pic`} />
                <div className="userChatInfo">
                  <span>{user.name}</span>
                  <p>{user.latestMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat">
          <div className="chatInfo">Jane</div>
          <div className="chatScreen">
            <div className="message owner">
              <div className="messageInfo">
                <img src="../img/chat_01.jpg" alt="chatpic" />
              </div>
              <div className="messageContent">
                <p>hello</p>
              </div>
            </div>
          </div>
          <div className="chatInput">
            <input
              type="text"
              placeholder="Type something..."
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
