import React from 'react';
import { motion } from 'framer-motion';
import { useWorkbook } from '../../context/WorkbookContext';

export const Section = ({ children, className = "", id }) => {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className={`min-h-screen py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto flex flex-col justify-center print:min-h-0 print:py-12 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export const Divider = () => (
  <div className="w-full flex justify-center py-12 print:hidden">
    <div className="w-px h-24 bg-ink-muted/30"></div>
  </div>
);

export const JournalInput = ({ id, volumeId, placeholder }) => {
  const { entries, updateEntry } = useWorkbook();
  const value = entries[volumeId]?.[id] || '';
  
  return (
    <input 
      type="text" 
      value={value}
      onChange={(e) => updateEntry(volumeId, id, e.target.value)}
      placeholder={placeholder}
      className="journal-line placeholder:text-ink-muted/30 placeholder:italic print:placeholder:text-transparent"
    />
  );
};

export const JournalArea = ({ id, volumeId, lines = 4 }) => {
  const { entries, updateEntry } = useWorkbook();
  const value = entries[volumeId]?.[id] || '';
  
  return (
    <div className="relative mt-6 group">
      <textarea
        value={value}
        onChange={(e) => updateEntry(volumeId, id, e.target.value)}
        rows={lines}
        className="w-full bg-transparent border-none resize-none font-serif text-lg leading-8 focus:outline-none relative z-10"
        style={{ backgroundImage: 'radial-gradient(circle, #8C8C85 1px, transparent 1px)', backgroundSize: '100% 2rem', backgroundPosition: '0 1.9rem', backgroundRepeat: 'repeat-y' }}
      />
      {!value && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
           {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="w-full border-b border-dotted border-ink-muted h-8"></div>
          ))}
        </div>
      )}
    </div>
  );
};