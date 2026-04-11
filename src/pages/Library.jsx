import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Label, Title, Body, Heading } from '../components/ui/Typography';
import { volumes } from '../data/volumes';
import { RadiatingCircles } from '../components/graphics/Symbols';

export default function Library() {
  const seriesGroups = [
    { name: "Series One", subtitle: "Waning Phase — Full Moon → New Moon", focus: "Releasing, Integrating, Distilling" },
    { name: "Series Two", subtitle: "Waxing Phase — New Moon → Full Moon", focus: "Building, Manifesting, Illuminating" },
    { name: "Advanced", subtitle: "Eclipse Portal Specials", focus: "Threshold Crossings & Radical Transformation" }
  ];

  return (
    <main className="bg-paper min-h-screen pt-32 px-6 pb-48">
      <div className="max-w-6xl mx-auto">
        <header className="mb-32 text-center">
          <Label className="mb-4">The Sequential Curriculum</Label>
          <Title className="mb-8">Lunar Chaperone</Title>
          <Body className="italic text-ink-light mx-auto max-w-xl">
            A 26-volume arc mapping the movement of consciousness through the somatic and celestial fields.
          </Body>
        </header>

        {seriesGroups.map((group) => (
          <section key={group.name} className="mb-48">
            <div className="mb-16 border-b border-ink/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Label className="text-gold mb-2">{group.name}</Label>
                <Heading>{group.subtitle}</Heading>
              </div>
              <Body className="text-sm opacity-60 italic">{group.focus}</Body>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {volumes.filter(v => v.series === group.name).map((vol) => (
                <motion.div
                  key={vol.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link 
                    to={`/workbook/${vol.id}`}
                    className="block group bg-white border border-ink/5 p-8 h-full relative overflow-hidden transition-shadow hover:shadow-xl"
                  >
                    <div className="flex justify-between items-start mb-12">
                      <Label className="opacity-40">{vol.sequence} of 26</Label>
                      <Label className="text-gold">{vol.signs}</Label>
                    </div>

                    <h3 className="font-sans text-xl uppercase tracking-widest mb-4 group-hover:text-gold transition-colors">
                      {vol.title}
                    </h3>
                    
                    <Body className="text-xs italic text-ink-muted mb-6 leading-relaxed">
                      {vol.shift}
                    </Body>

                    <div className="pt-6 border-t border-ink/5 mt-auto">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
                        <span>{vol.somatic.split('→')[0]}</span>
                        <span className="text-gold">→</span>
                        <span>{vol.somatic.split('→')[1]}</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 border-b-2 border-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}