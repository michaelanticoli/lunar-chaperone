import React from 'react';
import { motion } from 'framer-motion';

export const MoonPhase = ({ phase = 'full', className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
      {phase === 'full' && <circle cx="50" cy="50" r="48" fill="currentColor" />}
      {phase === 'new' && <circle cx="50" cy="50" r="48" fill="transparent" />}
      {phase === 'waxing' && (
        <path d="M50 2 A 48 48 0 0 1 50 98 A 24 48 0 0 0 50 2 Z" fill="currentColor" />
      )}
      {phase === 'waning' && (
        <path d="M50 2 A 48 48 0 0 0 50 98 A 24 48 0 0 1 50 2 Z" fill="currentColor" />
      )}
    </svg>
  );
};

export const RadiatingCircles = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {[10, 20, 30, 40, 48].map((r, i) => (
      <circle key={i} cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold opacity-50" />
    ))}
    <circle cx="50" cy="50" r="5" fill="currentColor" className="text-gold" />
  </svg>
);

export const TriangleSymbol = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="55" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
    <circle cx="50" cy="55" r="5" fill="currentColor" className="text-gold" />
  </svg>
);