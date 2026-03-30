import React, { useEffect } from "react";
import Header from "../layout/Header";
import { useGameStore } from "../store/useGameStore";
import { ChevronRight } from "lucide-react";
import { playSuccessSound } from "../../utils/sound";

export const LeaderboardPage = () => {
  const { leaderboard, fetchLeaderboard } = useGameStore();

  useEffect(() => {
    fetchLeaderboard();
    playSuccessSound();
  }, []);

  const roles = [
    "THE SOVEREIGN ARBITER",
    "STRATEGIC GHOST",
    "CALCULATED RISK",
    "Vocal Specialist",
    "Data Aggregator",
    "Market Specialist",
    "Aggressive Leverage",
    "High-Frequency Arb",
  ];

  const safeLeaderboard = (leaderboard || [])
    .slice()
    .sort((a, b) => a.finalPrice - b.finalPrice);

  const displayPlayers = safeLeaderboard;

  const topPlayers = displayPlayers.slice(0, 3);
  const otherPlayers = displayPlayers.slice(3) || [];

  const getAvatarUrl = (id, rank) =>
    `https://robohash.org/${id || rank}?set=set3`;

  const getStatus = (rank) => {
    if (rank % 3 === 0) return { label: "IN SESSION", class: "in-session" };
    if (rank % 4 === 0) return { label: "REBOOTING", class: "rebooting" };
    return { label: "STANDBY", class: "standby" };
  };

  const getEfficiency = (player) => {
    if (!player?.initialPrice || !player?.finalPrice) return "0.0";

    const efficiency =
      ((player.initialPrice - player.finalPrice) / player.initialPrice) * 100;

    return Math.max(efficiency, 0).toFixed(1);
  };

  const top1 = topPlayers[0] || null;
  const top2 = topPlayers[1] || null;
  const top3 = topPlayers[2] || null;

  return (
    <div className="leaderboard-page">
      <Header />

      <div className="page-container">
        <div className="page-title">
          <h2>Elite Arbiters</h2>
        </div>

        {/* TOP 3 CARDS */}
        <div className="elite-arbiters">
          {/* Card 2 (Left) */}
          {top2?.playerName && (
            <div className="arbiter-card rank-2" data-rank="02">
              <div className="avatar-wrap">
                <img
                  src={getAvatarUrl(top2._id, 2)}
                  className="avatar"
                  alt="p2"
                />
                <div className="badge">2nd</div>
              </div>
              <div className="name">{top2?.playerName || "Anonymous"}</div>
              <div className="role">{roles[1]}</div>
              <div className="stats">
                <div className="stat-blk">
                  <div className="s-label">Efficiency</div>
                  <div className="s-val eff">{getEfficiency(top2)}%</div>
                </div>
                <div
                  className="stat-blk"
                  style={{ textAlign: "right", alignItems: "flex-end" }}
                >
                  <div className="s-label">Earnings</div>
                  <div className="s-val">
                    ₹{top2.finalPrice?.toLocaleString() || "7,12,000"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 1 (Center) */}
          {top1?.playerName && (
            <div className="arbiter-card rank-1" data-rank="01">
              <div className="avatar-wrap">
                <img
                  src={getAvatarUrl(top1._id, 1)}
                  className="avatar"
                  alt="p1"
                />
                <div className="badge">GRANDMASTER</div>
              </div>
              <div className="name">{top1?.playerName || "Anonymous"}</div>
              <div className="role">{roles[0]}</div>
              <div className="stats" style={{ marginTop: "1rem" }}>
                <div className="stat-blk">
                  <div className="s-label">Efficiency</div>
                  <div className="s-val eff">{getEfficiency(top1)}%</div>
                </div>
                <div
                  className="stat-blk"
                  style={{ textAlign: "right", alignItems: "flex-end" }}
                >
                  <div className="s-label">Total Earnings</div>
                  <div className="s-val">
                    ₹{top1.finalPrice?.toLocaleString() || "12,45,900"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3 (Right) */}
          {top3?.playerName && (
            <div className="arbiter-card rank-3" data-rank="03">
              <div className="avatar-wrap">
                <img
                  src={getAvatarUrl(top3._id, 3)}
                  className="avatar"
                  alt="p3"
                />
                <div className="badge">3rd</div>
              </div>
              <div className="name">{top3?.playerName || "Anonymous"}</div>
              <div className="role">{roles[2]}</div>
              <div className="stats">
                <div className="stat-blk">
                  <div className="s-label">Efficiency</div>
                  <div className="s-val eff">{getEfficiency(top3)}%</div>
                </div>
                <div
                  className="stat-blk"
                  style={{ textAlign: "right", alignItems: "flex-end" }}
                >
                  <div className="s-label">Earnings</div>
                  <div className="s-val">
                    ₹{top3.finalPrice?.toLocaleString() || "6,88,400"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LIST SECTION */}
        <div className="rankings-section">
          <div className="section-header">
            <div className="title-group">
              <h3>Top Players Ranking</h3>
              <p>Real-time performance analytics of active negotiators</p>
            </div>
            <div className="live-indicator">LIVE ARENA UPDATES</div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <div>RANK</div>
              <div>NEGOTIATOR</div>
              <div>STATUS</div>
              <div>EFFICIENCY</div>
              <div>TOTAL EARNINGS</div>
            </div>

            {otherPlayers.map((p, idx) => {
              const rank = idx + 4;
              const status = getStatus(rank);
              const effStr = getEfficiency(p);
              return (
                <div className="table-row" key={p._id || idx}>
                  <div className="col-rank">
                    #{rank < 10 ? `0${rank}` : rank}
                  </div>

                  <div className="col-negotiator">
                    <img
                      src={getAvatarUrl(p._id, rank)}
                      className="list-avatar"
                      alt="av"
                    />
                    <div className="n-info">
                      <div className="n-name">
                        {p.playerName || `PLAYER-${rank}`}
                      </div>
                      <div className="n-role">
                        {roles[(idx + 3) % roles.length] || "Data Agent"}
                      </div>
                    </div>
                  </div>

                  <div className="col-status">
                    <span className={`status-badge ${status.class}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="col-eff">
                    <div className="eff-bar-bg">
                      <div
                        className="eff-bar-fill"
                        style={{ width: `${effStr}%` }}
                      ></div>
                    </div>
                    <div className="eff-val">{effStr}%</div>
                  </div>

                  <div className="col-earnings">
                    ₹{p.finalPrice?.toLocaleString() || "4,20,000"}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="load-more">
            LOAD NEXT 10 RANKINGS <ChevronRight size={16} />
          </button>
        </div>

        {/* FOOTER STATS */}
        <div className="footer-stats">
          <div className="stat-item">
            <div className="st-label">Active Arenas</div>
            <div className="st-val">1,204</div>
          </div>
          <div className="stat-item">
            <div className="st-label">Total Volume</div>
            <div className="st-val">₹8.42 Cr</div>
          </div>
          <div className="stat-item">
            <div className="st-label">Avg. Leverage</div>
            <div className="st-val cyan">84%</div>
          </div>
          <div className="stat-item">
            <div className="st-label">Global Users</div>
            <div className="st-val">42,900</div>
          </div>
        </div>
      </div>
    </div>
  );
};
