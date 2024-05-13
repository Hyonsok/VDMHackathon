import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function ChatWrapper() {
  return (
    <div className="chatHome">
      <div className="chatContainer">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default ChatWrapper;
