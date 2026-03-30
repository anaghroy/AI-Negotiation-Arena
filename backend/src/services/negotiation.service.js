export function createSession() {
  const floorPrice = 3000 + Math.floor(Math.random() * 1000);
  const targetPrice = floorPrice + 1500;

  const personalities = ["stubborn", "neutral", "motivated"];
  const personality =
    personalities[Math.floor(Math.random() * personalities.length)];

  return {
    floorPrice,
    targetPrice,
    currentPrice: targetPrice,
    startingPrice: targetPrice,
    patience: 100,
    personality,
    rounds: 0,
    lastTactic: null,
    tacticHistory: [],

    bluffProbability: Math.random() * 0.3,
    dealClosed: false,
  };
}
function generateHint(session, tactic, previousTactic) {
  if (previousTactic === tactic) {
    return "Avoid repeating the same tactic.";
  }

  if (session.patience < 30) {
    return "Seller is losing patience. Push harder now.";
  }

  if (session.personality === "stubborn") {
    return "Try competitor pricing. This seller is stubborn.";
  }

  if (session.personality === "motivated") {
    return "Use urgency like 'I'll buy now'.";
  }

  return "Try a different negotiation approach.";
}
export function processNegotiation(session, userInput) {
  if (session.dealClosed) {
    return {
      message: "Deal already closed.",
      price: session.currentPrice,
      done: true,
    };
  }

  session.rounds += 1;
  session.patience -= 8;

  const tactic = detectTactic(userInput);
  const previousTactic = session.lastTactic;
  session.tacticHistory.push(tactic);

  const userPrice = extractPrice(userInput);
  let reduction = 0;
  if (userPrice && userPrice >= session.currentPrice - 100) {
    reduction += 200;
  }

  switch (tactic) {
    case "competitor":
      reduction += 250;
      break;
    case "urgency":
      reduction += 180;
      break;
    case "pressure":
      reduction += 120;
      break;
    case "incentive":
      reduction += 200;
      break;
    default:
      reduction += 80;
  }

  if (session.personality === "stubborn") {
    reduction *= tactic === "competitor" ? 1.2 : 0.6;
  }

  if (session.personality === "motivated") {
    if (tactic === "urgency" || tactic === "incentive") {
      reduction *= 1.4;
    }
  }

  if (session.lastTactic === tactic) {
    reduction *= 0.5;
  }

  session.lastTactic = tactic;

  const lastTwo = session.tacticHistory.slice(-2);
  if (lastTwo.length === 2 && lastTwo[0] === lastTwo[1]) {
    reduction *= 0.7;
  }

  if (session.patience < 30) {
    reduction += 250;
  }

  if (session.rounds > 4) {
    reduction += 150;
  }

  if (session.rounds <= 2) {
    reduction += 100;
  }

  if (Math.random() < session.bluffProbability) {
    reduction *= 0.5;
  }

  let newPrice = session.currentPrice - reduction;

  if (newPrice <= session.floorPrice) {
    newPrice = session.floorPrice;
  }

  newPrice = Math.floor(newPrice);
  session.currentPrice = newPrice;

  let done = false;
  if (newPrice <= session.floorPrice || session.rounds >= 8) {
    done = true;
    session.dealClosed = true;
  }

  return {
    message: generateMessage(session, tactic, newPrice, done),
    price: newPrice,
    done,
    personality: session.personality,
    hint: generateHint(session, tactic, previousTactic),
  };
}
function generateMessage(session, tactic, price, done) {
  if (done) {
    return `Alright... ₹${price}. This is my final offer.`;
  }

  if (session.personality === "stubborn") {
    return `Hmm... ₹${price}. Don't expect much lower.`;
  }

  if (session.personality === "motivated") {
    return `I can do ₹${price} if we close quickly.`;
  }

  return `I can offer ₹${price}.`;
}
export function calculateEfficiency(session) {
  const { startingPrice, currentPrice, floorPrice } = session;

  const efficiency =
    ((startingPrice - currentPrice) / (startingPrice - floorPrice)) * 100;

  return Math.max(0, Math.round(efficiency));
}
function detectTactic(input) {
  const text = input.toLowerCase();

  if (text.includes("other") || text.includes("competitor"))
    return "competitor";

  if (text.includes("final") || text.includes("last")) return "urgency";

  if (text.includes("cheap") || text.includes("too expensive"))
    return "pressure";

  if (text.includes("cash") || text.includes("upfront")) return "incentive";

  return "neutral";
}
function extractPrice(input) {
  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}
