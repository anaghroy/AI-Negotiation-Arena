import { useEffect } from "react";
import GameContainer from "./components/GamePanel/GameContainer";
import { useGameStore } from "./components/store/useGameStore";
import ErrorBoundary from "./components/ErrorBoundary";
import { LeaderboardPage } from "./components/Leaderboard/LeaderboardPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  const fetchLeaderboard = useGameStore((s) => s.fetchLeaderboard);

  const currentPage = useGameStore((s) => s.currentPage);
  const isAuthenticated = useGameStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeaderboard();
    }
  }, [isAuthenticated]);

  const renderPage = () => {
    // Protected Routes
    if (!isAuthenticated) {
      if (currentPage === "register") return <Register />;
      return <Login />;
    }

    switch (currentPage) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "game":
      default:
        return <GameContainer />;
    }
  };

  return (
    <div className="app-wrapper">
      <ErrorBoundary>{renderPage()}</ErrorBoundary>
    </div>
  );
}

export default App;
