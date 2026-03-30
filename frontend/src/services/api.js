const BASE_URL = "/api/negotiation";

// 🔹 START GAME
export async function startGame(playerName) {
  try {
    const res = await fetch(`${BASE_URL}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName }),
    });

    if (!res.ok) throw new Error("Failed to start game");

    return await res.json();
  } catch (error) {
    console.error("Start Game Error:", error);
    return null;
  }
}

// 🔹 SEND OFFER (NEGOTIATE)
export async function sendOffer(sessionId, message) {
  try {
    const res = await fetch(`${BASE_URL}/offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, message }),
    });

    if (!res.ok) throw new Error("Failed to send offer");

    return await res.json();
  } catch (error) {
    console.error("Send Offer Error:", error);
    return null;
  }
}

// 🔹 GET LEADERBOARD
export async function getLeaderboard() {
  try {
    const res = await fetch(`${BASE_URL}/leaderboard`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch leaderboard");

    return await res.json();
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return [];
  }
}

const AUTH_URL = "/api/auth";

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(`${AUTH_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Logout failed");

    return data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
}
