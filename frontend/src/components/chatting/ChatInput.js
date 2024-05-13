import React, { useState } from "react";

function ChatInput() {
  const [text, setText] = useState("");

  const handleSend = () => {
    console.log(text);
  };

  return (
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
  );
}

export default ChatInput;
