import React from 'react';
import { Label, Title, Subtitle, Heading, Body, List } from '../components/ui/Typography';
import { Section, Divider, JournalInput, JournalArea } from '../components/ui/Layout';
import { MoonPhase, RadiatingCircles, TriangleSymbol } from '../components/graphics/Symbols';
import { SynthesisRitual } from '../components/ui/SynthesisRitual';

export default function Workbook() {
  return (
    <main className="w-full bg-paper min-h-screen selection:bg-gold/30">
      
      {/* 1. TITLE PAGE */}
      <Section className="text-center items-center">
        <Label className="mb-8">Moontuner</Label>
        <Title className="mb-6">From Soul<br/>To Balance</Title>
        <div className="flex items-center justify-center space-x-4 my-8 text-ink">
          <MoonPhase phase="full" className="w-8 h-8" />
          <span className="w-12 h-px bg-ink"></span>
          <MoonPhase phase="new" className="w-8 h-8" />
        </div>
        <Subtitle className="mb-4">Pisces → Libra</Subtitle>
        <Label>Full Moon → New Moon</Label>
        
        <div className="mt-24 max-w-sm mx-auto">
          <Body className="text-center italic text-ink-light">
            The movement from immersion<br/>to articulation.
          </Body>
        </div>
      </Section>

      {/* 2. ARC I OVERVIEW */}
      <Section>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <Label className="mb-4">Arc I — Integration Cycle</Label>
            <Heading className="mb-8">Full Moon → New Moon<br/>Release → Distill → Recalibrate</Heading>
            
            <div className="space-y-6">
              <Body>This volume maps a compression arc.</Body>
              <Body>Pisces expands perception beyond boundary.<br/>Libra restores boundary through relation.</Body>
              <Body>The psyche first dissolves.<br/>Then defines.</Body>
              <Body className="font-semibold mt-8">This is phasecraft.</Body>
            </div>
          </div>
          
          <div className="flex-1 bg-paper-dark/50 p-8 pt-10 border border-ink/10 rounded-sm w-full print:border-none print:bg-transparent">
            <Label className="mb-2">Body Axis</Label>
            <Body className="mb-8">Feet → Kidneys / Lower Back</Body>
            
            <Label className="mb-2">Seasonal Arc</Label>
            <Body>Spring Transcendence → Autumn Harmony</Body>
            
            <div className="mt-12 flex justify-center print:hidden">
              <RadiatingCircles className="w-48 h-48 text-ink" />
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* 3. PHASE MECHANICS */}
      <Section>
        <Label className="mb-16 text-center">Phase Mechanics</Label>
        
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Full Moon */}
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <MoonPhase phase="full" className="w-12 h-12 text-ink" />
              <Heading>Full Moon — Saturation</Heading>
            </div>
            
            <div className="space-y-4 mb-8">
              <Body>At the Full Moon, signal amplifies.</Body>
              <Body>Emotion becomes ambient.<br/>Sensitivity increases.<br/>Distinction softens.</Body>
              <Body>Pisces governs the field state of consciousness —<br/>where self and other blur.</Body>
            </div>
            
            <Label className="mb-4 text-ink">Healthy Expression:</Label>
            <List items={['compassion', 'creativity', 'intuitive awareness']} className="mb-8" />
            
            <Label className="mb-4 text-ink">Excess Expression:</Label>
            <List items={['overwhelm', 'savior dynamics', 'exhaustion from over-merging']} className="mb-8" />
            
            <Body className="italic text-ink-light">This phase is not pathology.<br/>It is expanded bandwidth.</Body>
          </div>

          {/* New Moon */}
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <MoonPhase phase="new" className="w-12 h-12 text-ink" />
              <Heading>New Moon — Recalibration</Heading>
            </div>
            
            <div className="space-y-4 mb-8">
              <Body>The Libra New Moon restores architecture.</Body>
              <Body>Emotion becomes language.<br/>Language becomes boundary.<br/>Boundary becomes balance.</Body>
              <Body>Libra governs relational equilibrium —<br/>where identity is clarified through exchange.</Body>
            </div>
            
            <Label className="mb-4 text-ink">Healthy Expression:</Label>
            <List items={['clear agreements', 'reciprocal care', 'aesthetic coherence']} className="mb-8" />
            
            <Label className="mb-4 text-ink">Excess Expression:</Label>
            <List items={['indecision', 'people-pleasing', 'suppressed preference']} className="mb-8" />
            
            <Body className="italic text-ink-light">Integration requires articulation.</Body>
          </div>
        </div>
      </Section>

      <Divider />

      {/* 4. ARCHETYPAL ARCHITECTURE */}
      <Section>
        <Label className="mb-16 text-center">Archetypal Architecture</Label>
        
        <div className="space-y-24">
          {/* Pisces */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 flex justify-center md:justify-start print:hidden">
              <RadiatingCircles className="w-40 h-40 text-ink" />
            </div>
            <div className="md:col-span-8">
              <Heading className="mb-2">Pisces — Permeability</Heading>
              <Body className="italic mb-8 text-ink-light">Archetype of dissolution.</Body>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <Label className="mb-2">Psychological Function</Label>
                  <Body>Absorption.</Body>
                </div>
                <div>
                  <Label className="mb-2">Somatic Correspondence</Label>
                  <Body>Feet — contact with ground and collective field.</Body>
                </div>
                <div className="sm:col-span-2">
                  <Label className="mb-2">Neurobiological Parallel</Label>
                  <Body>Heightened limbic activity. Reduced filtering of emotional stimuli.</Body>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-paper-dark/30 border-l-2 border-ink print:bg-transparent">
                <Body>Pisces widens the lens of perception.</Body>
                <Body>Without containment, it becomes diffusion.</Body>
                <Body className="mt-4 font-semibold">Containment begins with naming.</Body>
                <div className="mt-6 space-y-4 max-w-sm">
                   <JournalInput id="p_feel" placeholder="I feel..." />
                   <JournalInput id="p_need" placeholder="I need..." />
                </div>
              </div>
            </div>
          </div>

          {/* Libra */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
             <div className="md:col-span-4 flex justify-center md:justify-start md:order-last print:hidden">
              <TriangleSymbol className="w-40 h-40 text-ink" />
            </div>
            <div className="md:col-span-8">
              <Heading className="mb-2">Libra — Equilibrium</Heading>
              <Body className="italic mb-8 text-ink-light">Archetype of relational symmetry.</Body>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <Label className="mb-2">Psychological Function</Label>
                  <Body>Boundary articulation.</Body>
                </div>
                <div>
                  <Label className="mb-2">Somatic Correspondence</Label>
                  <Body>Kidneys / lower back — balance and bilateral regulation.</Body>
                </div>
                <div className="sm:col-span-2">
                  <Label className="mb-2">Neurobiological Parallel</Label>
                  <Body>Prefrontal modulation of emotional response. Social cognition networks engaged.</Body>
                </div>
              </div>
              
              <div className="mt-8">
                <Body className="italic text-ink-light">Libra does not erase feeling.<br/>It refines it into agreement.</Body>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* 5. SOMATIC PRACTICE */}
      <Section className="bg-ink text-paper items-center text-center py-32 rounded-3xl mx-4 md:mx-12 max-w-[calc(100%-2rem)] md:max-w-[calc(100%-6rem)] print:bg-transparent print:text-ink print:border print:border-ink">
        <Label className="text-gold mb-12">Somatic Practice</Label>
        
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-4xl mx-auto px-6 text-left">
          {/* Grounding */}
          <div>
            <Heading className="text-paper print:text-ink mb-6">Grounding the Field</Heading>
            <div className="space-y-4 mb-8 text-paper/80 print:text-ink font-serif text-lg">
              <p>Stand barefoot.</p>
              <p>Shift weight slowly side to side.<br/>Notice subtle instability.</p>
              <p>Stay for three minutes.</p>
            </div>
            
            <div className="bg-paper text-ink p-6 rounded-sm mt-8 print:border print:border-ink/20">
              <Label className="mb-4">Journal</Label>
              <Body className="mb-2 text-sm">What feels diffuse?</Body>
              <JournalInput id="som_diffuse" />
              <Body className="mb-2 mt-4 text-sm">What seeks definition?</Body>
              <JournalInput id="som_define" />
            </div>
          </div>

          {/* Breath */}
          <div>
            <Heading className="text-paper print:text-ink mb-6">Bilateral Breath</Heading>
            <div className="space-y-4 mb-8 text-paper/80 print:text-ink font-serif text-lg">
              <p>Inhale for four.</p>
              <p>Pause for four.</p>
              <p>Exhale for four.</p>
              <p>Pause for four.</p>
            </div>
            <div className="pt-4 border-t border-paper/20 print:border-ink/20">
              <Heading className="text-gold mb-4 text-sm tracking-[0.3em]">Equalize.</Heading>
              <p className="font-serif italic text-paper/60 print:text-ink/60">Observe the nervous system settle.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. WEEKLY PRACTICES */}
      <Section>
        <Label className="mb-16 text-center">Integration Timeline</Label>
        <div className="space-y-24">
          
          <div className="border-t border-ink-muted/30 pt-8">
            <Label className="text-gold mb-2">Week One</Label>
            <Heading className="mb-6">Dissolve</Heading>
            <Body className="mb-8">Audit energetic leakage.</Body>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <Body className="mb-4 text-sm uppercase tracking-wide opacity-60">Where am I absorbing what is not mine?</Body>
                <JournalArea id="w1_leakage_1" lines={3} />
              </div>
              <div>
                <Body className="mb-4 text-sm uppercase tracking-wide opacity-60">Where have I merged to maintain peace?</Body>
                <JournalArea id="w1_leakage_2" lines={3} />
              </div>
            </div>
          </div>

          <div className="border-t border-ink-muted/30 pt-8">
            <Label className="text-gold mb-2">Week Two</Label>
            <Heading className="mb-6">Distill</Heading>
            <div className="max-w-lg space-y-6">
              <div className="flex items-end gap-4">
                <span className="font-serif text-xl">I feel</span>
                <JournalInput id="w2_distill_feel" />
              </div>
              <div className="flex items-end gap-4">
                <span className="font-serif text-xl">I need</span>
                <JournalInput id="w2_distill_need" />
              </div>
            </div>
          </div>

          <div className="border-t border-ink-muted/30 pt-8">
            <Label className="text-gold mb-2">Week Three</Label>
            <Heading className="mb-6">Calibrate</Heading>
            <div className="space-y-6 max-w-2xl">
              <Body className="mb-4 text-sm uppercase tracking-wide opacity-60">Map three relationships. Is exchange reciprocal?</Body>
              {[1,2,3].map(num => (
                <div key={num} className="flex items-end gap-4">
                  <span className="font-sans text-xs text-ink-muted">{num}.</span>
                  <div className="flex-1"><JournalInput id={`w3_rel_${num}`} placeholder="Relationship..." /></div>
                  <div className="w-24"><JournalInput id={`w3_rel_status_${num}`} placeholder="Reciprocal?" /></div>
                </div>
              ))}
              <div className="mt-12">
                <Label className="mb-4">One clarifying statement to deliver:</Label>
                <JournalInput id="w3_boundary" />
              </div>
            </div>
          </div>

          <div className="border-t border-ink-muted/30 pt-8">
            <Label className="text-gold mb-2">Week Four</Label>
            <Heading className="mb-6">Equilibrium</Heading>
            <div className="mt-8">
              <Label className="mb-4">Write your integration statement</Label>
              <JournalArea id="w4_statement" lines={3} />
            </div>
          </div>

        </div>
      </Section>

      <Divider />

      {/* 7. PHASE PROTOCOLS & SYNTHESIS */}
      <Section>
        <div className="grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2 space-y-12">
            <Label className="mb-8 block">Phase Protocols</Label>
            <div>
              <Heading className="mb-2 text-sm">Water Release</Heading>
              <Body className="text-sm italic text-ink-light mb-2">Emotion externalized becomes manageable.</Body>
              <Body className="text-sm">Bowl. Salt. Whisper. Release.</Body>
            </div>
            <div>
              <Heading className="mb-2 text-sm">Scale Visualization</Heading>
              <Body className="text-sm mb-2">Inhale left. Exhale right.</Body>
              <Body className="text-sm italic text-ink-light">Imagine symmetry returning.</Body>
            </div>
          </div>

          <div className="md:col-span-3 bg-white p-8 md:p-12 shadow-sm border border-ink/5 print:border-none print:shadow-none">
            <Label className="mb-8 text-center block">Reflection Synthesis</Label>
            <div className="space-y-8">
              <div>
                <Body className="mb-2 text-sm">What dissolved?</Body>
                <JournalArea id="sync_dissolve" lines={2} />
              </div>
              <div>
                <Body className="mb-2 text-sm">What clarified?</Body>
                <JournalArea id="sync_clarify" lines={2} />
              </div>
            </div>
          </div>
        </div>

        {/* The Actionable Component */}
        <SynthesisRitual />
      </Section>

      {/* 8. CLOSING */}
      <Section className="text-center items-center pb-48">
        <MoonPhase phase="waxing" className="w-16 h-16 text-gold mb-12" />
        <Label className="mb-8">Closing Declaration</Label>
        <div className="space-y-6 mb-16">
          <Title className="text-2xl md:text-4xl normal-case tracking-normal">I release what is not mine.</Title>
          <Title className="text-2xl md:text-4xl normal-case tracking-normal">I articulate my needs clearly.</Title>
          <Title className="text-2xl md:text-4xl normal-case tracking-normal text-gold">I allow balanced exchange.</Title>
        </div>
        
        <div className="flex justify-center gap-12 w-full max-w-md mt-16">
          <div className="flex-1">
             <JournalInput id="final_sign" />
             <Label className="mt-2 text-[10px]">Sign</Label>
          </div>
          <div className="flex-1">
             <JournalInput id="final_date" />
             <Label className="mt-2 text-[10px]">Date</Label>
          </div>
        </div>
      </Section>

    </main>
  );
}