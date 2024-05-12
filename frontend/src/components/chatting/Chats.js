import React from "react";

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

function Chats() {
  return (
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
  );
}

export default Chats;
