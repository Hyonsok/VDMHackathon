import React from "react";
import SingleMessage from "./SingleMessage";

function ChatScreen() {
  return (
    <div className="chatScreen">
      {/* mapping needed */}
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
    </div>
  );
}

export default ChatScreen;
