import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Label, Body } from './Typography';
import { LUNAR_CYCLES } from '../../data/volumes';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX } = FiIcons;

const PHASE_GLYPH = { waxing: '🌒', waning: '🌘', eclipse: '⊙' };

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location]);

  // Highlight the active fortnight in the menu
  const currentFortnight = (() => {
    const m = location.pathname.match(/\/cycle\/(\d+)/);
    return m ? Number(m[1]) : null;
  })();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference print:hidden">
        <Link to="/cycle" className="text-paper hover:opacity-70 transition-opacity">
          <Label className="text-paper">Moontuner</Label>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="text-paper p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Open navigation"
        >
          <SafeIcon icon={FiMenu} className="text-2xl" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink text-paper overflow-y-auto print:hidden"
          >
            <div className="min-h-full p-8 md:p-16 flex flex-col">

              {/* Header row */}
              <div className="flex justify-between items-center mb-12">
                <Label className="text-gold">26-Fortnight Arc</Label>
                <button onClick={() => setIsOpen(false)} aria-label="Close navigation">
                  <SafeIcon icon={FiX} className="text-3xl" />
                </button>
              </div>

              {/* Lunar cycles: 12 pairs + eclipses */}
              <div className="flex-1 space-y-10">
                {LUNAR_CYCLES.map((group) => (
                  <section key={group.cycle}>
                    <div className="border-b border-paper/10 pb-3 mb-4">
                      <Label className="text-[10px] opacity-40 uppercase tracking-widest">
                        {group.label}
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {group.fortnights.map((vol) => {
                        const isActive = vol.fortnight === currentFortnight;
                        return (
                          <Link
                            key={vol.id}
                            to={`/cycle/${vol.fortnight}`}
                            className={`flex items-center gap-3 py-2 px-3 rounded transition-colors ${
                              isActive
                                ? 'bg-gold/20 text-gold'
                                : 'hover:bg-paper/5 hover:text-gold'
                            }`}
                          >
                            <span className="text-sm shrink-0">{PHASE_GLYPH[vol.phase]}</span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <Label className={`text-[9px] shrink-0 ${isActive ? 'opacity-80' : 'opacity-30'}`}>
                                  {String(vol.fortnight).padStart(2, '0')}
                                </Label>
                                <p className="font-serif italic text-sm truncate leading-tight">
                                  {vol.title}
                                </p>
                              </div>
                              <Body className="text-[10px] opacity-40 truncate">{vol.signs}</Body>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-paper/10 flex justify-between items-end opacity-40">
                <Label className="text-[10px]">Sequential Arc v3.0</Label>
                <div className="text-right">
                  <Label className="text-[10px] block">Moontuner Canonical System</Label>
                  <Label className="text-[10px] block uppercase italic">
                    96-cell reference grid available separately
                  </Label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
