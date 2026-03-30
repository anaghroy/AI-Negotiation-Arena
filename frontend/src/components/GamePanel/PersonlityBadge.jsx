import React from "react";
import { useGameStore } from "../store/useGameStore";

const PersonalityBadge = () => {
  const personality = useGameStore((s) => s.personality);

  if (!personality) return null;

  let label = "";
  let emoji = "";
  let color = "";
  let bg = "";
  let border = "";

  switch (personality) {
    case "stubborn":
      label = "Stubborn Seller";
      emoji = "😤";
      color = "#ff6b6b";
      bg = "rgba(255, 107, 107, 0.15)";
      border = "rgba(255, 107, 107, 0.4)";
      break;

    case "motivated":
      label = "Motivated Seller";
      emoji = "🔥";
      color = "#00ffa0";
      bg = "rgba(0, 255, 160, 0.15)";
      border = "rgba(0, 255, 160, 0.4)";
      break;

    default:
      label = "Neutral Seller";
      emoji = "😐";
      color = "#aaa";
      bg = "rgba(255,255,255,0.08)";
      border = "rgba(255,255,255,0.2)";
  }

  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "10px 14px",
        borderRadius: "20px",
        background: bg,
        color: color,
        border: `1px solid ${border}`,
        fontSize: "0.9rem",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        backdropFilter: "blur(6px)",
      }}
    >
      <span>{emoji}</span>
      {label}
    </div>
  );
};

export default PersonalityBadge;