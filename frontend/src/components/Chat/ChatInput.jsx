import React, { useState } from "react";
import { Send } from "lucide-react";
import { useGameStore } from "../store/useGameStore";

const ChatInput = () => {
  const [input, setInput] = useState("");

  const { sendMessage, gameOver, loading } = useGameStore();

  const quickActions = [
    "Too Expensive",
    "Other seller is cheaper",
    "Final Offer",
    "Can you do better?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim() || gameOver || loading) return;

    sendMessage(input);
    setInput("");
  };

  const handleQuickAction = (action) => {
    if (gameOver || loading) return;

    sendMessage(action);
  };

  return (
    <div className="input-section">
      <div className="quick-actions">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            className="chip"
            onClick={() => handleQuickAction(action)}
            disabled={gameOver || loading}
          >
            {action}
          </button>
        ))}
      </div>

      <form className="input-wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Make your offer or negotiate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={gameOver || loading}
        />

        <button
          type="submit"
          className="send-btn"
          disabled={gameOver || loading || !input.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
