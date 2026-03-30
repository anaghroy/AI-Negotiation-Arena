import React from 'react';
import { useGameStore } from '../store/useGameStore';

const PriceInfo = () => {
  const currentPrice = useGameStore((s) => s.currentPrice);
  const round = useGameStore((s) => s.round);
  const gameOver = useGameStore((s) => s.gameOver);

  const initialPrice = 1000; // or your default product price
  const maxRounds = 7;
  const status = gameOver ? 'Deal Closed 🎉' : 'Negotiating...';

  return (
    <div className="price-info-panel" style={{ padding: '1.5rem', background: 'rgba(20, 20, 35, 0.4)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      
      <h3 style={{ marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        Current Offer
      </h3>
      
      {/* ✅ SAFE PRICE */}
      <div
        className="price-display"
        style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#0cee79',
          textShadow: '0 0 15px #1E4D35',
          marginBottom: '1rem'
        }}
      >
        ₹{currentPrice ? currentPrice.toLocaleString() : '--'}
      </div>
      
      {/* RETAIL */}
      <div className="stats-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Target / Retail</span>
        <span style={{ color: '#fff' }}>₹{initialPrice.toLocaleString()}</span>
      </div>
      
      {/* ROUND */}
      <div className="stats-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Round</span>
        <span style={{ color: '#fff' }}>
          {round || 1} / {maxRounds}
        </span>
      </div>
      
      {/* STATUS */}
      <div
        className="status-badge"
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: '20px',
          background: status === 'Deal Closed 🎉'
            ? 'rgba(0, 255, 100, 0.2)'
            : 'rgba(112, 0, 255, 0.2)',
          color: status === 'Deal Closed 🎉'
            ? '#00ffa0'
            : '#d0a0ff',
          border: `1px solid ${
            status === 'Deal Closed 🎉'
              ? 'rgba(0, 255, 100, 0.4)'
              : 'rgba(112, 0, 255, 0.4)'
          }`,
          fontSize: '0.85rem',
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        {status}
      </div>
    </div>
  );
};

export default PriceInfo;