import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getVolumeByFortnight } from '../data/volumes';
import { Label, Title, Subtitle, Heading, Body } from '../components/ui/Typography';
import { Section, Divider, JournalInput, JournalArea } from '../components/ui/Layout';
import { MoonPhase, TriangleSymbol, RadiatingCircles } from '../components/graphics/Symbols';
import { SynthesisRitual } from '../components/ui/SynthesisRitual';
import { FortnightNav } from '../components/ui/FortnightNav';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCompass, FiActivity, FiAnchor, FiSun } = FiIcons;

export default function WorkbookPage() {
  const { fortnight } = useParams();
  const vol = getVolumeByFortnight(fortnight);

  if (!vol) return <Navigate to="/cycle" replace />;

  const isWaning = vol.phase === 'waning';
  const [source, destination] = vol.somatic.split('→').map(t => t.trim());

  return (
    <main className="w-full bg-paper min-h-screen selection:bg-gold/30">

      {/* ── Top fortnight nav ─────────────────────────────────────────────────── */}
      <div className="pt-20">
        <FortnightNav vol={vol} />
      </div>

      {/* 1. ARCHIVAL HEADER (The Cover) */}
      <Section className="text-center items-center min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="relative"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
            <RadiatingCircles className="w-96 h-96" />
          </div>

          <Label className="mb-12 tracking-[0.4em] opacity-40">
            Fortnight {String(vol.fortnight).padStart(2, '0')} of 26
          </Label>
          <Title className="mb-8 leading-[1.1] text-4xl md:text-7xl max-w-5xl mx-auto font-light">
            {vol.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'italic font-serif block md:inline' : ''}>
                {word}{' '}
              </span>
            ))}
          </Title>

          <div className="flex items-center justify-center space-x-12 my-20 text-ink">
            <MoonPhase phase={isWaning ? 'full' : 'new'} className="w-16 h-16 opacity-20" />
            <div className="h-px w-64 bg-ink/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <MoonPhase phase={isWaning ? 'new' : 'full'} className="w-16 h-16 text-gold" />
          </div>

          <Subtitle className="mb-6 text-3xl md:text-4xl">{vol.signs}</Subtitle>
          <div className="flex flex-col items-center gap-2">
            <Label className="text-gold capitalize">{vol.phase}</Label>
            <Label className="text-[10px] opacity-30">{vol.mechanics.start} Phase Begins</Label>
          </div>
        </motion.div>
      </Section>

      {/* 2. THE AXIAL FIELD (Research & Somatics) */}
      <Section className="bg-white/30 border-y border-ink/5">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-32">
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gold">
                <SafeIcon icon={FiCompass} />
                <Label>The Somatic Axis</Label>
              </div>
              <Heading className="text-3xl lowercase italic font-serif tracking-normal">{vol.somatic}</Heading>
              <Body className="text-lg opacity-70 leading-relaxed">
                This fortnight navigates the bio-energetic channel between{' '}
                <span className="text-ink font-semibold">{source}</span> and{' '}
                <span className="text-ink font-semibold">{destination}</span>.{' '}
                We are mapping how {vol.signs.split('→')[0].trim()}'s essential nature informs the{' '}
                {vol.signs.split('→')[1].trim()} expression.
              </Body>
            </div>

            <div className="p-8 bg-paper border border-ink/5 shadow-sm">
              <Label className="mb-6 opacity-40">Seasonal Intelligence</Label>
              <Heading className="text-sm mb-4">{vol.seasonal}</Heading>
              <Body className="text-base italic text-ink-light">
                "The environment reflects the internal landscape. As the light{' '}
                {isWaning ? 'recedes' : 'returns'}, the nervous system seeks{' '}
                {isWaning ? 'containment' : 'expansion'}."
              </Body>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="sticky top-32 space-y-12">
              <div className="relative aspect-[4/5] bg-ink/5 flex items-center justify-center overflow-hidden border border-ink/10">
                <div className="absolute inset-0 opacity-10">
                  <RadiatingCircles className="w-full h-full scale-150" />
                </div>
                <div className="relative text-center p-12">
                  <Label className="text-gold mb-8">Volume Intent</Label>
                  <Title className="text-2xl md:text-3xl normal-case font-serif italic leading-snug">
                    {vol.description}
                  </Title>
                </div>
              </div>
              <div className="flex justify-between items-center opacity-30">
                <Label className="text-[10px]">Canonical Ref: {vol.id.toUpperCase()}</Label>
                <Label className="text-[10px]">Sequential Logic v2.1</Label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. ALCHEMICAL WORKBENCH (The Practice) */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-32">
          <header className="text-center space-y-4">
            <div className="flex justify-center mb-8">
              <SafeIcon icon={FiActivity} className="text-gold text-3xl" />
            </div>
            <Heading>The Fortnight Lab</Heading>
            <Body className="text-ink-muted italic">Process the transit through the body-mind complex.</Body>
          </header>

          <div className="space-y-24">
            {/* Week 1: Observation */}
            <div className="group">
              <div className="flex items-baseline gap-6 mb-8 border-b border-ink/10 pb-4">
                <span className="font-serif italic text-4xl opacity-20 group-hover:opacity-100 transition-opacity duration-700">01</span>
                <Heading className="text-xl">Initial Saturation</Heading>
              </div>
              <div className="space-y-12 pl-12">
                <div>
                  <Label className="mb-4 text-gold">Somatic Audit</Label>
                  <Body className="text-sm italic opacity-60 mb-8">Where is the {source} holding the residue of the previous cycle?</Body>
                  <JournalArea id="audit_1" volumeId={vol.id} lines={5} />
                </div>
                <div>
                  <Label className="mb-4 text-gold">Relational Field</Label>
                  <Body className="text-sm italic opacity-60 mb-8">
                    Identify one agreement that feels "heavy" in the current {vol.signs.split('→')[0].trim()} light.
                  </Body>
                  <JournalArea id="audit_2" volumeId={vol.id} lines={4} />
                </div>
              </div>
            </div>

            {/* Week 2: Distillation */}
            <div className="group">
              <div className="flex items-baseline gap-6 mb-8 border-b border-ink/10 pb-4">
                <span className="font-serif italic text-4xl opacity-20 group-hover:opacity-100 transition-opacity duration-700">02</span>
                <Heading className="text-xl">Core Distillation</Heading>
              </div>
              <div className="space-y-12 pl-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6 bg-paper-dark/30 p-8">
                    <Label className="text-xs">The Release</Label>
                    <Body className="text-sm">Identify the specific behavior or thought pattern being composted.</Body>
                    <JournalInput id="distill_release" volumeId={vol.id} placeholder="Composting..." />
                  </div>
                  <div className="space-y-6 bg-gold/5 p-8 border border-gold/10">
                    <Label className="text-xs text-gold">The Seed</Label>
                    <Body className="text-sm">What is the singular truth remaining after the noise is filtered?</Body>
                    <JournalInput id="distill_truth" volumeId={vol.id} placeholder="The remaining signal..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* 4. SOMATIC ARCHITECTURE (Poetic Protocols) */}
      <Section className="bg-ink text-paper py-48 px-12 md:px-24 rounded-[4rem] mx-4 md:mx-12 max-w-none print:bg-transparent print:text-ink print:border print:border-ink">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div className="space-y-8">
                <Label className="text-gold">Somatic Protocol</Label>
                <Title className="text-3xl md:text-5xl normal-case text-paper print:text-ink">Bilateral Alignment</Title>
                <Body className="text-paper/60 print:text-ink italic text-2xl leading-relaxed">
                  "The body is the most honest archive we possess. To move from {source} to {destination} is to re-wire the internal map."
                </Body>
              </div>

              <div className="space-y-12 border-l border-gold/30 pl-12">
                <div className="space-y-2">
                  <Label className="text-gold text-[10px]">Step 01</Label>
                  <Body className="text-paper print:text-ink">Locate the {source} in your physical awareness. Breathe into the space behind the sensation.</Body>
                </div>
                <div className="space-y-2">
                  <Label className="text-gold text-[10px]">Step 02</Label>
                  <Body className="text-paper print:text-ink">Visualize a line of gold light connecting to the {destination}. This is your current transit.</Body>
                </div>
                <div className="space-y-2">
                  <Label className="text-gold text-[10px]">Step 03</Label>
                  <Body className="text-paper print:text-ink">Exhale sharply through the mouth, releasing the {vol.signs.split('→')[0].trim()} tension.</Body>
                </div>
              </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 border border-gold/20 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-16 border border-gold/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              <TriangleSymbol className="w-64 h-64 text-gold opacity-50" />
              <div className="absolute bottom-0 text-center w-full">
                <Label className="text-gold animate-pulse">Holding Axis...</Label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. SYNTHESIS RITUAL */}
      <Section className="relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
          <Title className="text-[20vw] whitespace-nowrap">SYNTHESIS</Title>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto bg-white/40 backdrop-blur-sm border border-gold/10 p-12 md:p-32 shadow-2xl">
          <SynthesisRitual volumeId={vol.id} volumeData={vol} />
        </div>
      </Section>

      {/* 6. ARCHIVAL CLOSING */}
      <Section className="text-center items-center pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-24 w-full"
        >
          <div className="space-y-8">
            <SafeIcon icon={FiSun} className="w-12 h-12 text-gold mx-auto" />
            <Label className="opacity-40 tracking-[0.5em]">The Integration Point</Label>
            <Title className="text-2xl md:text-4xl normal-case italic text-ink-light max-w-3xl mx-auto leading-relaxed">
              "I have observed the shift from {source} to {destination}. I carry the clarity of{' '}
              {vol.signs.split('→')[1].trim()} into the next ingress."
            </Title>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-2xl mx-auto border-t border-ink/5 pt-16">
            <div className="text-left space-y-4">
              <Label className="text-[10px] opacity-40">Archival Witness</Label>
              <JournalInput id="final_sign" volumeId={vol.id} placeholder="Your Signature" />
            </div>
            <div className="text-left space-y-4">
              <Label className="text-[10px] opacity-40">Temporal Marker</Label>
              <JournalInput id="final_date" volumeId={vol.id} placeholder="Current Calibration" />
            </div>
          </div>

          <div className="pt-12 opacity-20 hover:opacity-100 transition-opacity">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full border border-ink flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all">
                <SafeIcon icon={FiAnchor} />
              </div>
              <Label className="text-[9px]">Return to Origin</Label>
            </button>
          </div>
        </motion.div>
      </Section>

      {/* ── Bottom fortnight nav ──────────────────────────────────────────────── */}
      <FortnightNav vol={vol} />
    </main>
  );
}
