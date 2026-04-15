import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Label, Title, Body, Heading } from '../components/ui/Typography';
import { LUNAR_CYCLES } from '../data/volumes';

const PHASE_GLYPH = { waxing: '🌒', waning: '🌘', eclipse: '⊙' };
const PHASE_LABEL = { waxing: 'New → Full', waning: 'Full → New', eclipse: 'Eclipse' };

export default function Library() {
  const [filter, setFilter] = useState('all'); // 'all' | 'waxing' | 'waning' | 'eclipse'

  return (
    <main className="bg-paper min-h-screen pt-32 px-6 pb-48">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-24 text-center">
          <Label className="mb-4">The Sequential Arc</Label>
          <Title className="mb-8">26 Fortnights</Title>
          <Body className="italic text-ink-light mx-auto max-w-xl">
            A single consecutive curriculum mapping consciousness through the somatic and celestial fields —
            alternating waxing and waning through all 12 sign pairs, then the eclipse portals.
          </Body>
        </header>

        {/* Phase filter */}
        <div className="flex justify-center gap-3 mb-24 flex-wrap">
          {[
            { key: 'all', label: 'All 26' },
            { key: 'waxing', label: '🌒 Waxing' },
            { key: 'waning', label: '🌘 Waning' },
            { key: 'eclipse', label: '⊙ Eclipse' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-colors ${
                filter === key
                  ? 'bg-ink text-paper border-ink'
                  : 'border-ink/20 hover:border-ink/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cycle groups */}
        {LUNAR_CYCLES.map((group) => {
          const visible = group.fortnights.filter(
            v => filter === 'all' || v.phase === filter
          );
          if (visible.length === 0) return null;

          return (
            <section key={group.cycle} className="mb-24">
              <div className="mb-10 border-b border-ink/10 pb-6 flex items-end justify-between gap-4">
                <div>
                  <Label className="text-gold mb-1">{group.label}</Label>
                  {group.fortnights.length === 2 && (
                    <Heading className="text-sm opacity-50">
                      Fortnights {group.fortnights[0]?.fortnight} &amp; {group.fortnights[1]?.fortnight}
                    </Heading>
                  )}
                </div>
                {group.fortnights.length === 2 && (
                  <Body className="text-xs opacity-40 italic hidden md:block">
                    {group.fortnights.map(v => v.signs.split('→')[0].trim()).join(' · ')}
                  </Body>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visible.map((vol) => (
                  <motion.div
                    key={vol.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link
                      to={`/cycle/${vol.fortnight}`}
                      className="block group bg-white border border-ink/5 p-6 h-full relative overflow-hidden transition-shadow hover:shadow-lg"
                    >
                      {/* Top row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{PHASE_GLYPH[vol.phase]}</span>
                          <Label className="opacity-40 text-[10px]">
                            Fortnight {vol.fortnight} of 26
                          </Label>
                        </div>
                        <Label className="text-gold text-[10px]">{vol.signs}</Label>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-lg uppercase tracking-widest mb-3 group-hover:text-gold transition-colors leading-snug">
                        {vol.title}
                      </h3>

                      {/* Shift */}
                      <Body className="text-xs italic text-ink-muted mb-5 leading-relaxed line-clamp-2">
                        {vol.shift}
                      </Body>

                      {/* Footer */}
                      <div className="pt-4 border-t border-ink/5 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
                        <span>{PHASE_LABEL[vol.phase]}</span>
                        <span>{vol.mechanics.start} → {vol.mechanics.end}</span>
                      </div>

                      <div className="absolute inset-0 border-b-2 border-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Reference grid footnote */}
        <footer className="mt-32 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-4 opacity-40">
          <Label className="text-[10px]">Moontuner Canonical System — Sequential Arc v3.0</Label>
          <Label className="text-[10px] italic">
            The 96-cell sign×phase reference grid is available separately
          </Label>
        </footer>
      </div>
    </main>
  );
}
