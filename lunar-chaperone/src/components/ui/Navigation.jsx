import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Label, Body } from './Typography';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiLayers, FiZap, FiTarget } = FiIcons;

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference print:hidden">
        <Link to="/" className="text-paper hover:opacity-70 transition-opacity">
          <Label className="text-paper">Moontuner</Label>
        </Link>
        <button onClick={() => setIsOpen(true)} className="text-paper p-2 hover:bg-white/10 rounded-full transition-colors">
          <SafeIcon icon={FiMenu} className="text-2xl" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            className="fixed inset-0 z-[60] bg-ink text-paper overflow-y-auto"
          >
            <div className="min-h-full p-8 md:p-16 flex flex-col">
              <div className="flex justify-between items-center mb-16 md:mb-24">
                <Label className="text-gold">Curriculum Index</Label>
                <button onClick={() => setIsOpen(false)}>
                  <SafeIcon icon={FiX} className="text-3xl" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-16 md:gap-24">
                {/* Series One */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-paper/10 pb-4">
                    <SafeIcon icon={FiLayers} className="text-gold" />
                    <Label className="opacity-40">Series One (1-12)</Label>
                  </div>
                  <div className="space-y-4">
                    <Link to="/workbook/vol-01" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 01: Bone to Heart</Link>
                    <Link to="/workbook/vol-05" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 05: Soul to Balance</Link>
                    <Link to="/workbook/vol-09" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 09: Root to Vision</Link>
                    <Link to="/" className="block text-xs uppercase tracking-widest opacity-40 hover:opacity-100">View Full Series</Link>
                  </div>
                </section>

                {/* Series Two */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-paper/10 pb-4">
                    <SafeIcon icon={FiZap} className="text-gold" />
                    <Label className="opacity-40">Series Two (13-24)</Label>
                  </div>
                  <div className="space-y-4">
                    <Link to="/workbook/vol-13" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 13: Heart to Mind</Link>
                    <Link to="/workbook/vol-17" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 17: Balance to Fire</Link>
                    <Link to="/workbook/vol-21" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 21: Vision to Voice</Link>
                    <Link to="/" className="block text-xs uppercase tracking-widest opacity-40 hover:opacity-100">View Full Series</Link>
                  </div>
                </section>

                {/* Advanced */}
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-paper/10 pb-4">
                    <SafeIcon icon={FiTarget} className="text-gold" />
                    <Label className="opacity-40">Advanced (25-26)</Label>
                  </div>
                  <div className="space-y-4">
                    <Link to="/workbook/vol-25" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 25: Virgo–Aries Eclipse</Link>
                    <Link to="/workbook/vol-26" className="block text-xl hover:text-gold transition-colors font-serif italic">Vol 26: Pisces–Virgo Eclipse</Link>
                  </div>
                </section>
              </div>

              <div className="mt-auto pt-12 border-t border-paper/10 flex justify-between items-end opacity-40">
                <Label className="text-[10px]">Sequential Arc v2.1</Label>
                <div className="text-right">
                  <Label className="text-[10px] block">Moontuner Canonical System</Label>
                  <Label className="text-[10px] block uppercase">Private Archive</Label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};