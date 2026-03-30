import { create } from "zustand";
import {
  startGame,
  sendOffer,
  getLeaderboard,
  loginUser,
  registerUser,
  logoutUser,
} from "../../services/api";
import {
  playSendSound,
  playReceiveSound,
  playSuccessSound,
} from "../../utils/sound";

import { persist } from "zustand/middleware";

export const useGameStore = create(
  persist(
    (set, get) => ({
      sessionId: null,
      messages: [],
      currentPrice: null,
      round: 1,
      gameOver: false,
      loading: false,
      leaderboard: [],
      personality: null,
      hint: "",

      // AUTH
      isAuthenticated: false,
      user: null,
      currentPage: "login",

      // NAVIGATION
      setCurrentPage: (page) => set({ currentPage: page }),

      // LOGIN
      login: async (email, password) => {
        const data = await loginUser(email, password);
        if (data.success) {
          set({
            isAuthenticated: true,
            user: data.user,
            currentPage: "game",
          });
        }
      },

      // REGISTER
      register: async (name, email, password) => {
        const data = await registerUser(name, email, password);
        if (data.success) {
          set({
            isAuthenticated: true,
            user: data.user,
            currentPage: "game",
          });
        }
      },

      // LOGOUT
      logout: async () => {
        await logoutUser();

        set({
          sessionId: null,
          messages: [],
          currentPrice: null,
          round: 1,
          gameOver: false,
          leaderboard: [],
          personality: null,
          hint: "",

          isAuthenticated: false,
          user: null,
          currentPage: "login",
        });
      },

      // START GAME
      startGame: async (playerName) => {
        const data = await startGame(playerName);

        set({
          loading: true,
        });

        set({
          sessionId: data.sessionId,
          currentPrice: data.price,
          messages: [{ sender: "ai", text: data.message }],
          round: 1,
          gameOver: false,
          loading: false,
          personality: null,
          hint: "",
          playerName,
        });
      },

      // SEND MESSAGE
      sendMessage: async (text) => {
        const { sessionId, gameOver } = get();
        if (!sessionId || gameOver) return;

        playSendSound();

        set((state) => ({
          messages: [...state.messages, { sender: "user", text }],
          loading: true,
        }));

        const res = await sendOffer(sessionId, text);
        playReceiveSound();

        if (res.done) {
          playSuccessSound();
          get().fetchLeaderboard();
        }

        set((state) => ({
          messages: [...state.messages, { sender: "ai", text: res.message }],
          currentPrice: res.price,
          round: state.round + 1,
          gameOver: res.done,
          personality: res.personality,
          hint: res.hint,
          loading: false,
        }));
      },

      // LEADERBOARD
      fetchLeaderboard: async () => {
        try {
          const res = await fetch(
            "/api/negotiation/leaderboard",
            {
              credentials: "include",
            },
          );
          const data = await res.json();
           if (!res.ok) {
            console.error("Unauthorized or error response");
            set({ leaderboard: [] }); 
            return;
          }

          if (Array.isArray(data)) {
            set({ leaderboard: data });
          } else {
            set({ leaderboard: [] });
          }
        } catch (err) {
          console.error("Leaderboard fetch error", err);
        }
      },
    }),
    {
      name: "game-storage",
    },
  ),
);
