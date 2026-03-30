import React, { useState } from "react";
import Header from "../layout/Header";
import ChatWindow from "../Chat/ChatWindow";
import ChatInput from "../Chat/ChatInput";
import PriceInfo from "./PriceInfo";
import { useGameStore } from "../store/useGameStore";
import PersonalityBadge from "./PersonlityBadge";

const GameContainer = () => {
  const { messages, currentPrice, round, gameOver, startGame } = useGameStore();
  const [playerName, setPlayerName] = useState("");

  return (
    <>
      <Header />

      <div className="game-layout">
        <main className="main-game-container">
          {!messages.length && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2
                className="text-gradient"
                style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
              >
                Ready to Negotiate?
              </h2>

              <p
                style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}
              >
                Buy the product at the lowest possible price.
              </p>
              <input
                type="text"
                placeholder="Enter your name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  marginBottom: "1.5rem",
                  outline: "none",
                  width: "250px",
                  textAlign: "center",
                }}
              />
              <button
                onClick={() => startGame(playerName)}
                disabled={!playerName.trim()}
                style={{
                  background: "linear-gradient(135deg, #26924C, #031D10)",
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: "30px",
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 0 20px #26924C",
                }}
              >
                Start Game
              </button>
            </div>
          )}

          <PersonalityBadge />
          <ChatWindow />

          {gameOver ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-gradient" style={{ marginBottom: "1rem" }}>
                Deal Closed! 🎉
              </h2>

              <p style={{ color: "#fff", marginBottom: "1.5rem" }}>
                You secured the item for{" "}
                <strong style={{ color: "#00f0ff", fontSize: "1.2rem" }}>
                  ₹{currentPrice ?? "--"}
                </strong>
                .
              </p>

              <button
                onClick={() => startGame(playerName)}
                style={{
                  background: "transparent",
                  border: "1px solid #00f0ff",
                  color: "#00f0ff",
                  padding: "8px 24px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Play Again
              </button>
            </div>
          ) : (
            <ChatInput />
          )}
        </main>

        {/* SIDE PANEL */}
        <aside className="side-panel">
          <PriceInfo />
        </aside>
      </div>
    </>
  );
};

export default GameContainer;
