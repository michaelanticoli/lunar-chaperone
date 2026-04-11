import React from 'react';
import { motion } from 'framer-motion';

export const Label = ({ children, className = "" }) => (
  <h6 className={`font-sans uppercase tracking-[0.2em] text-xs font-medium text-ink-light ${className}`}>
    {children}
  </h6>
);

export const Title = ({ children, className = "" }) => (
  <h1 className={`font-sans uppercase tracking-widest text-3xl md:text-5xl font-light text-ink ${className}`}>
    {children}
  </h1>
);

export const Subtitle = ({ children, className = "" }) => (
  <h2 className={`font-serif italic text-2xl md:text-3xl text-ink-light ${className}`}>
    {children}
  </h2>
);

export const Heading = ({ children, className = "" }) => (
  <h3 className={`font-sans uppercase tracking-[0.15em] text-lg font-medium text-ink ${className}`}>
    {children}
  </h3>
);

export const Body = ({ children, className = "" }) => (
  <p className={`font-serif text-lg md:text-xl leading-relaxed text-ink ${className}`}>
    {children}
  </p>
);

export const List = ({ items, className = "" }) => (
  <ul className={`font-serif text-lg md:text-xl leading-relaxed text-ink space-y-2 ${className}`}>
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start">
        <span className="mr-3 text-gold text-sm mt-2">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);