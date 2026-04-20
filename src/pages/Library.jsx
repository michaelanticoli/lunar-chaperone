import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Label, Title, Body, Heading } from '../components/ui/Typography';
import { LUNAR_CYCLES } from '../data/volumes';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCompass, FiLayers, FiWind, FiActivity, FiMoon, FiArrowRight, FiFilter, FiBookOpen } = FiIcons;

const PHASE_GLYPH = { waxing: '🌒', waning: '🌘', eclipse: '⊙' };
const PHASE_MECHANICS = { waxing: 'New → Full', waning: 'Full → New', eclipse: 'Portal' };

function inferElement(sign) {
  const map = { Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water', Leo: 'Fire', Virgo: 'Earth', Libra: 'Air', Scorpio: 'Water', Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water' };
  return map[sign] || 'Element';
}

function inferBodyRegion(text = '') {
  return text.split('/')[0]?.trim() || text.trim();
}

export default function Library() {
  const [filter, setFilter] = useState('all');
  const allVolumes = useMemo(() => LUNAR_CYCLES.flatMap((group) => group.fortnights), []);
  const filteredVolumes = useMemo(() => allVolumes.filter((v) => filter === 'all' || v.phase === filter), [allVolumes, filter]);

  return (
    <main className="bg-paper min-h-screen pt-28 px-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Label className="tracking-[0.35em]">The Sequential Lunar Arc</Label>
                <Title className="text-4xl md:text-6xl leading-[1.05]">26 Lunar Workbooks</Title>
              </div>
              <Body className="italic text-ink-light max-w-3xl text-lg md:text-xl leading-relaxed">
                A structured archive of two-week lunar workbooks mapping consciousness through somatic, elemental, and relational change.
              </Body>
            </div>
            <div className="lg:col-span-5 border border-ink/10 bg-white/70 p-6 space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <SafeIcon icon={FiCompass} className="text-lg" />
                <Label className="text-gold">Index Framing</Label>
              </div>
              <Body className="text-base leading-relaxed">
                Each workbook covers a two-week arc with a directional movement through signs, body regions, elemental logic, and lunar mechanics.
              </Body>
            </div>
          </div>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="border border-ink/10 bg-white/70 p-5"><Label>Total Workbooks</Label><p className="font-serif text-2xl italic mt-2">26</p></div>
          <div className="border border-ink/10 bg-white/70 p-5"><Label>Cycle Length</Label><p className="font-serif text-2xl italic mt-2">14 Days</p></div>
          <div className="border border-ink/10 bg-white/70 p-5"><Label>Primary Method</Label><p className="font-serif text-2xl italic mt-2">Somatic + Lunar</p></div>
          <div className="border border-ink/10 bg-white/70 p-5"><Label>Index Logic</Label><p className="font-serif text-2xl italic mt-2">Sequential</p></div>
        </section>

        <section className="mb-12 border border-ink/10 bg-paper-dark/20 p-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-2 text-ink-light"><SafeIcon icon={FiFilter} className="text-sm" /><Label>Filter Index</Label></div>
          {['all','waxing','waning','eclipse'].map((key)=> <button key={key} onClick={()=>setFilter(key)} className={`px-5 py-3 text-[11px] uppercase tracking-[0.22em] border ${filter===key?'bg-ink text-paper border-ink':'border-ink/15 bg-white/60 hover:border-gold hover:text-gold'}`}>{key==='all'?'All 26':key==='waxing'?'Waxing Cycles':key==='waning'?'Waning Cycles':'Eclipse Portals'}</button>)}
        </section>

        <div className="border-b border-ink/10 pb-4 mb-12 flex justify-between items-end">
          <div><Label className="text-gold mb-1">Current View</Label><Heading>{filteredVolumes.length} workbooks visible</Heading></div>
          <Body className="text-xs italic opacity-50 hidden md:block">Each card now shows phase, body axis, elemental shift, and mechanics.</Body>
        </div>

        {LUNAR_CYCLES.map((group) => {
          const visible = group.fortnights.filter(v => filter === 'all' || v.phase === filter);
          if (!visible.length) return null;
          return (
            <section key={group.cycle} className="mb-16">
              <div className="mb-8 border-b border-ink/10 pb-5 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <Label className="text-gold mb-1">{group.label}</Label>
                  <Heading className="text-sm opacity-60">{group.fortnights.length === 2 ? `Workbooks ${group.fortnights[0]?.fortnight} & ${group.fortnights[1]?.fortnight}` : 'Portal sequence'}</Heading>
                </div>
                <Body className="text-xs opacity-45 italic hidden md:block">{group.fortnights.map(v => v.signs.split('→')[0].trim()).join(' · ')}</Body>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visible.map((vol) => {
                  const [fromSign, toSign] = vol.signs.split('→').map((s) => s.trim());
                  const [source, destination] = vol.somatic.split('→').map((s) => s.trim());
                  return (
                    <motion.div key={vol.id} whileHover={{ y: -4 }} transition={{ duration: 0.35 }}>
                      <Link to={`/cycle/${vol.fortnight}`} className="block group border border-ink/10 bg-white/75 p-6 md:p-7 h-full relative overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all">
                        <div className="flex justify-between items-start gap-3 mb-5">
                          <div className="flex items-center gap-2"><span>{PHASE_GLYPH[vol.phase]}</span><Label className="opacity-40 text-[10px]">Workbook {vol.fortnight} of 26</Label></div>
                          <Label className="text-gold text-[10px] text-right">{vol.signs}</Label>
                        </div>
                        <h3 className="font-sans text-lg uppercase tracking-[0.22em] mb-3 group-hover:text-gold transition-colors leading-snug">{vol.title}</h3>
                        <Body className="text-sm italic text-ink-light mb-5 leading-relaxed">{vol.shift}</Body>
                        <div className="grid grid-cols-2 gap-3 mb-5 text-[10px] uppercase tracking-[0.16em] text-ink-light">
                          <div className="border border-ink/8 bg-paper-dark/20 p-3"><div className="mb-1 opacity-50">Body Axis</div><div className="text-ink">{inferBodyRegion(source)} → {inferBodyRegion(destination)}</div></div>
                          <div className="border border-ink/8 bg-paper-dark/20 p-3"><div className="mb-1 opacity-50">Elemental Shift</div><div className="text-ink">{inferElement(fromSign)} → {inferElement(toSign)}</div></div>
                        </div>
                        <div className="pt-4 border-t border-ink/8 flex justify-between items-center text-[10px] uppercase tracking-[0.18em] text-ink-light gap-4">
                          <span>{PHASE_MECHANICS[vol.phase]}</span>
                          <span>{vol.mechanics.start} → {vol.mechanics.end}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-gold opacity-0 group-hover:opacity-100 transition-opacity"><span>Open workbook</span><SafeIcon icon={FiArrowRight} className="text-sm" /></div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <footer className="mt-20 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-60">
          <Label className="text-[10px]">Moontuner Canonical System — Sequential Lunar Arc v4.0</Label>
          <Label className="text-[10px] italic">The 96-cell sign×phase reference grid remains a separate companion resource</Label>
        </footer>
      </div>
    </main>
  );
}
