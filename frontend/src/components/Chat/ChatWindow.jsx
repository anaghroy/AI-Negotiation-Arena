import React, { useEffect, useRef } from "react";
import { useGameStore } from "../store/useGameStore";

const ChatWindow = () => {
  const messages = useGameStore((state) => state.messages);
  const loading = useGameStore((state) => state.loading);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-window">
      
         {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${
            msg.sender === "user" ? "user" : "ai"
          }`}
        >
          {msg.text}
        </div>
      ))}

         {loading && (
        <div className="message-bubble ai typing">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;