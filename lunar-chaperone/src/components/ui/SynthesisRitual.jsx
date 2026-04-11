import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkbook } from '../../context/WorkbookContext';
import { Label, Title, Body, Heading } from './Typography';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiWind, FiCheck, FiPrinter, FiTrash2, FiZap } = FiIcons;

export const SynthesisRitual = ({ volumeId, volumeData }) => {
  const { entries, clearVolume } = useWorkbook();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const processSynthesis = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const volEntries = entries[volumeId] || {};
      const weekly1 = volEntries['weekly_01'] || 'the raw impulse';
      
      // Safety fallbacks in case volumeData is partial
      const mantraDestination = volumeData?.mechanics?.end?.phase || 'a new equilibrium';
      const anchor = volumeData?.focus?.split('→')[0] || 'your core center';
      const volTitle = volumeData?.title || 'current';
      
      setResult({
        mantra: `I am moving from ${weekly1.substring(0, 30)}... toward a state of ${mantraDestination}.`,
        instruction: `In this ${volTitle} cycle, your primary somatic anchor is the ${anchor}. Return here whenever the field becomes saturated.`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
      setIsProcessing(false);
    }, 4000);
  };

  return (
    <div className="text-center print:hidden">
      <AnimatePresence mode="wait">
        {!result && !isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex justify-center">
              <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center animate-pulse">
                <SafeIcon icon={FiZap} className="text-gold text-2xl" />
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <Heading className="mb-4">The Synthesis Ritual</Heading>
              <Body className="text-base text-ink-muted">
                Distill your fourteen-day journey into a singular directive for the next cycle.
              </Body>
            </div>
            <button 
              onClick={processSynthesis} 
              className="group relative px-16 py-5 overflow-hidden border border-ink/20 hover:border-gold transition-all duration-700"
            >
              <span className="relative z-10 font-sans tracking-widest uppercase text-xs">Begin Distillation</span>
              <motion.div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </button>
            <div className="flex justify-center gap-12 mt-12 opacity-40 hover:opacity-100 transition-opacity">
              <button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <SafeIcon icon={FiPrinter} /> Print Volume
              </button>
              <button onClick={() => clearVolume(volumeId)} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-800">
                <SafeIcon icon={FiTrash2} /> Dissolve Reflections
              </button>
            </div>
          </motion.div>
        )}

        {isProcessing && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-12">
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
              transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }} 
              className="w-24 h-24 text-gold"
            >
              <SafeIcon icon={FiWind} className="w-full h-full opacity-20" />
            </motion.div>
            <div className="space-y-2">
              <Body className="italic">Filtering noise into signal...</Body>
              <Label className="text-[10px] animate-pulse">Analyzing Reflections</Label>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-left bg-paper p-12 md:p-20 border border-gold shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <SafeIcon icon={FiZap} className="text-9xl" />
            </div>
            <Label className="text-gold mb-12">Canonical Insight — {result.date}</Label>
            <Title className="text-2xl md:text-3xl normal-case mb-12 leading-relaxed">
              "{result.mantra}"
            </Title>
            <div className="space-y-8 border-t border-gold/20 pt-12">
              <div>
                <Heading className="text-xs mb-4">Integrative Directive</Heading>
                <Body className="text-lg leading-relaxed italic text-ink-light">
                  {result.instruction}
                </Body>
              </div>
            </div>
            <button 
              onClick={() => setResult(null)} 
              className="mt-16 text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors flex items-center gap-2"
            >
              <SafeIcon icon={FiCheck} /> Return to Archive
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};