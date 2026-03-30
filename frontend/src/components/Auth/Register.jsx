import React, { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { User, AtSign, Key, Zap } from "lucide-react";
import Header from "../layout/Header";

const Register = () => {
  const { register, setCurrentPage } = useGameStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please provide all required initialization parameters.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await register(username, email, password);
    } catch (err) {
      setError(err?.message || "Initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      
      <div className="auth-container">
        
        <div className="auth-header">
          <div className="req-level">ACCESS REQUEST LEVEL 01</div>
          <h1>INITIALIZE<span>PROTOCOL</span></h1>
          
          <div className="sys-status">
            <div className="node">ARENA NODE: 77-B</div>
            <div className="latency">LATENCY: 0.04MS</div>
            <div className="active">AI NEGOTIATION ACTIVE</div>
          </div>
        </div>

        <div className="auth-box">
          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label>ALIAS DESIGNATION (USERNAME)</label>
              <div className="input-wrap">
                <input 
                  type="text" 
                  placeholder="V_STRATEGIST" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  autoComplete="username"
                />
                <User className="input-icon" size={16} />
              </div>
            </div>

            <div className="input-group">
              <label>NEURALID (EMAIL)</label>
              <div className="input-wrap">
                <input 
                  type="email" 
                  placeholder="neural@arbiter.net" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                />
                <AtSign className="input-icon" size={16} />
              </div>
            </div>

            <div className="input-group">
              <label>ACCESS KEY (PASSWORD)</label>
              <div className="input-wrap">
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <Key className="input-icon" size={16} />
              </div>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "INITIALIZING..." : "INITIALIZE PROTOCOL"} <Zap size={18} fill="currentColor" className="zap-icon" />
            </button>
            
            <div className="divider">
              <span>LEGACY AUTHENTICATION</span>
            </div>

            <button 
              type="button" 
              className="secondary-btn"
              onClick={() => setCurrentPage("login")}
            >
              VERIFY EXISTING ENTITY (LOGIN)
            </button>

          </form>
        </div>

        <div className="auth-footer">
            <div className="metric">
              <div className="m-label">ENCRYPTION</div>
              <div className="m-val cyan">AES-256<br/>QUANTUM</div>
            </div>
            <div className="metric">
              <div className="m-label">PRIVACY</div>
              <div className="m-val cyan">ZERO-<br/>KNOWLEDGE</div>
            </div>
            <div className="metric">
              <div className="m-label">STATUS</div>
              <div className="m-val pink">AWAITING<br/>HANDSHAKE</div>
            </div>
            <div className="metric">
              <div className="m-label">UPTIME</div>
              <div className="m-val white">99.999%</div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
