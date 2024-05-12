import React from "react";
import ChatScreen from "./ChatScreen";
import ChatInput from "./ChatInput";

function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">Jane</div>
      <ChatScreen />
      <ChatInput />
    </div>
  );
}

export default Chat;
