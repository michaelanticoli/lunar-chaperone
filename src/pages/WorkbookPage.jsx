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

const {
  FiCompass,
  FiActivity,
  FiAnchor,
  FiSun,
  FiWind,
  FiDroplet,
  FiBookOpen,
  FiFeather,
  FiLayers,
  FiCheckCircle,
} = FiIcons;

function inferElement(sign) {
  const map = {
    Aries: 'Fire',
    Taurus: 'Earth',
    Gemini: 'Air',
    Cancer: 'Water',
    Leo: 'Fire',
    Virgo: 'Earth',
    Libra: 'Air',
    Scorpio: 'Water',
    Sagittarius: 'Fire',
    Capricorn: 'Earth',
    Aquarius: 'Air',
    Pisces: 'Water',
  };
  return map[sign] || 'Element';
}

function inferBodyRegion(text = '') {
  return text.split('/')[0]?.trim() || text.trim();
}

function inferMetaphor(fromElement, toElement) {
  if (fromElement === 'Water' && toElement === 'Air') return 'Evaporation, mist, breath, translation';
  if (fromElement === 'Air' && toElement === 'Water') return 'Condensation, feeling, softening, absorption';
  if (fromElement === 'Fire' && toElement === 'Water') return 'Tempering, cooling, emotional depth';
  if (fromElement === 'Water' && toElement === 'Fire') return 'Ignition, steam, emotional activation';
  if (fromElement === 'Earth' && toElement === 'Air') return 'Loosening, articulation, mobility';
  if (fromElement === 'Air' && toElement === 'Earth') return 'Grounding, embodiment, making it real';
  if (fromElement === 'Fire' && toElement === 'Earth') return 'Containment, craft, disciplined expression';
  if (fromElement === 'Earth' && toElement === 'Fire') return 'Animation, vitality, momentum';
  if (fromElement === 'Fire' && toElement === 'Air') return 'Spark becoming signal';
  if (fromElement === 'Air' && toElement === 'Fire') return 'Idea becoming action';
  if (fromElement === 'Earth' && toElement === 'Water') return 'Softening structure into feeling';
  if (fromElement === 'Water' && toElement === 'Earth') return 'Settling insight into form';
  return 'Transition, translation, embodiment';
}

export default function WorkbookPage() {
  const { fortnight } = useParams();
  const vol = getVolumeByFortnight(fortnight);

  if (!vol) return <Navigate to="/cycle" replace />;

  const isWaning = vol.phase === 'waning';
  const [fromSign, toSign] = vol.signs.split('→').map((t) => t.trim());
  const [source, destination] = vol.somatic.split('→').map((t) => t.trim());
  const sourceBody = inferBodyRegion(source);
  const destinationBody = inferBodyRegion(destination);
  const fromElement = inferElement(fromSign);
  const toElement = inferElement(toSign);
  const metaphor = inferMetaphor(fromElement, toElement);

  const attunements = [
    {
      title: 'Dream or signal capture',
      text: `Record the symbol, lyric, memory, mood, or image that keeps returning as ${fromSign} gives way to ${toSign}. Let repetition reveal the real subject.`
    },
    {
      title: 'Somatic mapping',
      text: `Track how ${sourceBody.toLowerCase()} shifts when you breathe toward ${destinationBody.toLowerCase()}. Notice where sensation pools, tightens, opens, or travels.`
    },
    {
      title: 'Relational witness',
      text: `Ask: what am I trying to protect, prove, preserve, or release as this cycle evolves from ${fromSign} into ${toSign}?`
    },
  ];

  const transitionCards = [
    {
      title: `${fromSign} patterning`,
      prompt: `Name the dominant state you are moving out of. What has become excessive, sticky, loud, avoidant, or overgrown in the ${fromSign} expression?`,
      id: 'transition_pattern',
      lines: 5,
    },
    {
      title: `${toSign} correction`,
      prompt: `What would a more regulated, skillful, or beautifully contained ${toSign} expression look like in the same situation?`,
      id: 'transition_correction',
      lines: 5,
    },
    {
      title: 'Threshold sentence',
      prompt: `Write one sentence beginning with: “I am learning to move from ___ into ___ without abandoning myself.”`,
      id: 'transition_threshold',
      lines: 4,
    },
  ];

  const practiceDomains = [
    {
      title: 'Physical',
      icon: FiActivity,
      prompts: [
        `What does ${fromSign} feel like in the body when it is overdriving the system?`,
        `What movement, stretch, pacing, or breath most effectively helps ${destinationBody.toLowerCase()} come online?`,
      ],
      ids: ['physical_overdrive', 'physical_regulation'],
    },
    {
      title: 'Emotional',
      icon: FiDroplet,
      prompts: [
        `What feeling keeps trying to become language during this cycle?`,
        `What feeling softens or organizes once it is given a boundary, container, or honest name?`,
      ],
      ids: ['emotional_language', 'emotional_soften'],
    },
    {
      title: 'Relational',
      icon: FiWind,
      prompts: [
        `Where am I over-giving, over-merging, over-performing, or over-defending?`,
        `What one clearer agreement, statement, or boundary would improve the field immediately?`,
      ],
      ids: ['relational_pattern', 'relational_boundary'],
    },
  ];

  return (
    <main className="w-full bg-paper min-h-screen selection:bg-gold/30">
      <div className="pt-20">
        <FortnightNav vol={vol} />
      </div>

      <Section className="text-center items-center min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'circOut' }}
          className="relative w-full"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
            <RadiatingCircles className="w-96 h-96" />
          </div>

          <Label className="mb-10 tracking-[0.35em] opacity-40">
            Cycle Workbook {String(vol.fortnight).padStart(2, '0')} of 26
          </Label>

          <Title className="mb-8 leading-[1.1] text-4xl md:text-7xl max-w-5xl mx-auto font-light">
            {vol.title}
          </Title>

          <div className="flex items-center justify-center space-x-12 my-16 text-ink">
            <MoonPhase phase={isWaning ? 'full' : 'new'} className="w-16 h-16 opacity-20" />
            <div className="h-px w-64 bg-ink/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <MoonPhase phase={isWaning ? 'new' : 'full'} className="w-16 h-16 text-gold" />
          </div>

          <Subtitle className="mb-5 text-3xl md:text-4xl">{vol.signs}</Subtitle>
          <Body className="max-w-3xl mx-auto text-lg md:text-2xl opacity-75">
            A two-week guided passage from <span className="font-semibold text-ink">{fromSign}</span> into <span className="font-semibold text-ink">{toSign}</span>, moving through the body from <span className="font-semibold text-ink">{sourceBody}</span> toward <span className="font-semibold text-ink">{destinationBody}</span>.
          </Body>
          <div className="flex flex-col items-center gap-2 mt-8">
            <Label className="text-gold">{vol.mechanics.start} to {vol.mechanics.end}</Label>
            <Label className="text-[10px] opacity-30">Two-week integration arc</Label>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-white/40 border-y border-ink/5">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-gold">
                <SafeIcon icon={FiCompass} />
                <Label>Context and framing</Label>
              </div>
              <Heading className="text-3xl lowercase italic font-serif tracking-normal">{vol.somatic}</Heading>
              <Body className="text-lg opacity-75 leading-relaxed">{vol.description}</Body>
            </div>

            <div className="p-8 bg-paper border border-ink/5 shadow-sm space-y-4">
              <Label className="opacity-40">Elemental translation</Label>
              <Heading className="text-sm">{fromElement} → {toElement}</Heading>
              <Body className="text-base italic text-ink-light">{metaphor}</Body>
            </div>

            <div className="p-8 bg-paper border border-ink/5 shadow-sm space-y-4">
              <Label className="opacity-40">Seasonal intelligence</Label>
              <Heading className="text-sm">{vol.seasonal}</Heading>
              <Body className="text-base italic text-ink-light">
                Let the environment teach the method. Notice what in you is ripening, drying out, thawing, consolidating, loosening, or seeking proportion.
              </Body>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative bg-ink/5 border border-ink/10 p-10 md:p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <RadiatingCircles className="w-full h-full scale-150" />
              </div>
              <div className="relative space-y-6">
                <Label className="text-gold">How to use this workbook</Label>
                <Body className="text-lg leading-relaxed">
                  This workbook is built for a two-week span. Week one is for noticing, naming, and mapping the dominant pattern. Week two is for adjustment, practice, and embodied application. Treat the prompts as a living lab, not a questionnaire to rush through.
                </Body>
                <Body className="text-lg leading-relaxed">
                  Use it as a reflective companion, a ritual scaffold, a somatic journal, or a research notebook. What matters is not filling every field. What matters is getting honest enough to watch the cycle change you in real time.
                </Body>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {attunements.map((item, index) => (
                <div key={item.title} className="bg-paper border border-ink/5 p-6 space-y-4">
                  <Label className="text-gold">Attunement {index + 1}</Label>
                  <Heading className="text-base normal-case tracking-normal font-serif italic">{item.title}</Heading>
                  <Body className="text-base">{item.text}</Body>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="text-center space-y-4">
            <div className="flex justify-center mb-8">
              <SafeIcon icon={FiLayers} className="text-gold text-3xl" />
            </div>
            <Heading>Energy mapping and transition work</Heading>
            <Body className="text-ink-muted italic max-w-3xl mx-auto">
              Before you try to improve the cycle, describe it. The first job is to witness the pattern accurately.
            </Body>
          </header>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-paper border border-ink/5 p-8 space-y-6">
              <Label className="text-gold">Field notes</Label>
              <div>
                <Body className="text-base mb-4">Where am I over-saturated, over-explaining, over-feeling, overworking, or over-identifying right now?</Body>
                <JournalArea id="field_oversaturated" volumeId={vol.id} lines={5} />
              </div>
              <div>
                <Body className="text-base mb-4">Where am I under-resourced, under-honest, under-rested, under-defended, or under-supported?</Body>
                <JournalArea id="field_underresourced" volumeId={vol.id} lines={5} />
              </div>
              <div>
                <Body className="text-base mb-4">What theme, line of thought, dream fragment, or song keeps repeating?</Body>
                <JournalInput id="field_repetition" volumeId={vol.id} placeholder="The repeating signal..." />
              </div>
            </div>

            <div className="bg-white/60 border border-gold/10 p-8 space-y-6">
              <Label className="text-gold">Axis reflection</Label>
              <Body className="text-base">
                Write 150–300 words on what this transition is actually asking of you. Not the fantasy version. The real version.
              </Body>
              <JournalArea id="axis_reflection" volumeId={vol.id} lines={11} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {transitionCards.map((card) => (
              <div key={card.id} className="border border-ink/5 bg-paper p-8 space-y-5">
                <Label className="text-gold">Transition prompt</Label>
                <Heading className="text-base normal-case tracking-normal font-serif italic">{card.title}</Heading>
                <Body className="text-base">{card.prompt}</Body>
                <JournalArea id={card.id} volumeId={vol.id} lines={card.lines} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      <Section className="bg-ink text-paper py-32 px-8 md:px-16 rounded-[3rem] mx-4 md:mx-10 max-w-none print:bg-transparent print:text-ink print:border print:border-ink">
        <div className="max-w-6xl mx-auto space-y-20">
          <header className="text-center space-y-6">
            <SafeIcon icon={FiActivity} className="text-gold text-3xl mx-auto" />
            <Heading className="text-paper print:text-ink">Practice domains</Heading>
            <Body className="text-paper/70 print:text-ink max-w-3xl mx-auto">
              This section is where insight either gets embodied or stays decorative. Choose the practices that actually alter behavior.
            </Body>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            {practiceDomains.map((domain) => (
              <div key={domain.title} className="border border-gold/15 bg-white/5 p-8 space-y-6 print:border-ink/10 print:bg-transparent">
                <div className="flex items-center gap-4 text-gold">
                  <SafeIcon icon={domain.icon} />
                  <Label className="text-gold">{domain.title}</Label>
                </div>
                <div>
                  <Body className="text-paper print:text-ink text-base mb-4">{domain.prompts[0]}</Body>
                  <JournalArea id={domain.ids[0]} volumeId={vol.id} lines={5} />
                </div>
                <div>
                  <Body className="text-paper print:text-ink text-base mb-4">{domain.prompts[1]}</Body>
                  <JournalArea id={domain.ids[1]} volumeId={vol.id} lines={5} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8 border-l border-gold/30 pl-8">
              <div className="space-y-2">
                <Label className="text-gold text-[10px]">Protocol 01</Label>
                <Body className="text-paper print:text-ink">Locate the dominant sensation in the {sourceBody.toLowerCase()}. Breathe behind it rather than trying to overpower it.</Body>
              </div>
              <div className="space-y-2">
                <Label className="text-gold text-[10px]">Protocol 02</Label>
                <Body className="text-paper print:text-ink">Name the corresponding need in plain language. No poetry until the truth is stable enough to bear it.</Body>
              </div>
              <div className="space-y-2">
                <Label className="text-gold text-[10px]">Protocol 03</Label>
                <Body className="text-paper print:text-ink">Translate the need into a visible action, agreement, boundary, ask, or ritual. Insight without action is drift.</Body>
              </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 border border-gold/20 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-16 border border-gold/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              <TriangleSymbol className="w-64 h-64 text-gold opacity-50" />
              <div className="absolute bottom-0 text-center w-full">
                <Label className="text-gold animate-pulse">Embodiment in progress</Label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto space-y-20">
          <header className="text-center space-y-4">
            <SafeIcon icon={FiBookOpen} className="text-gold text-3xl mx-auto" />
            <Heading>Two-week integration plan</Heading>
            <Body className="text-ink-muted italic max-w-3xl mx-auto">
              This is a two-week workbook. The structure below matches the actual cycle length instead of pretending it spans a month.
            </Body>
          </header>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border border-ink/5 bg-paper p-8 space-y-6">
              <Label className="text-gold">Week 1 — notice and name</Label>
              <Body className="text-base">Focus on observation, saturation, pattern recognition, and honest inventory.</Body>
              <div>
                <Body className="text-base mb-4">What am I noticing in my body, mood, schedule, relationships, and recurring thoughts?</Body>
                <JournalArea id="week1_noticing" volumeId={vol.id} lines={6} />
              </div>
              <div>
                <Body className="text-base mb-4">What specifically needs less fuel, less fantasy, less avoidance, or less force?</Body>
                <JournalArea id="week1_reduce" volumeId={vol.id} lines={6} />
              </div>
              <div>
                <Body className="text-base mb-4">Name one measurable sign that week one is doing its job.</Body>
                <JournalInput id="week1_measure" volumeId={vol.id} placeholder="A sign of useful movement..." />
              </div>
            </div>

            <div className="border border-gold/10 bg-white/60 p-8 space-y-6">
              <Label className="text-gold">Week 2 — adjust and apply</Label>
              <Body className="text-base">Focus on clearer action, better phrasing, stronger boundaries, cleaner rituals, and visible behavioral shifts.</Body>
              <div>
                <Body className="text-base mb-4">What action, ritual, statement, or agreement best represents the healthier {toSign} expression?</Body>
                <JournalArea id="week2_action" volumeId={vol.id} lines={6} />
              </div>
              <div>
                <Body className="text-base mb-4">What changed once I stopped feeding the old pattern and started practicing the new one?</Body>
                <JournalArea id="week2_shift" volumeId={vol.id} lines={6} />
              </div>
              <div>
                <Body className="text-base mb-4">Name one measurable sign that week two produced integration rather than performance.</Body>
                <JournalInput id="week2_measure" volumeId={vol.id} placeholder="A sign of actual integration..." />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-ink/5 p-8 bg-paper space-y-5">
              <Label className="text-gold">Daily check-in</Label>
              <Body className="text-base">Morning: what am I carrying? Evening: what changed once named?</Body>
              <JournalArea id="daily_checkin" volumeId={vol.id} lines={8} />
            </div>
            <div className="border border-ink/5 p-8 bg-paper space-y-5">
              <Label className="text-gold">Conversation and boundary log</Label>
              <Body className="text-base">Track the interactions, asks, clarifications, refusals, or acknowledgments that moved this cycle forward.</Body>
              <JournalArea id="boundary_log" volumeId={vol.id} lines={8} />
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      <Section>
        <div className="max-w-6xl mx-auto space-y-20">
          <header className="text-center space-y-4">
            <SafeIcon icon={FiFeather} className="text-gold text-3xl mx-auto" />
            <Heading>Ritual, research, and synthesis</Heading>
            <Body className="text-ink-muted italic max-w-3xl mx-auto">
              The workbook can be devotional, practical, academic, or all three. Use the mode that gets results.
            </Body>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="border border-ink/5 bg-paper p-8 space-y-5">
              <Label className="text-gold">Ritual script</Label>
              <Body className="text-base">Design a short rite for moving from {fromSign} into {toSign}. Keep it simple enough to actually repeat.</Body>
              <JournalArea id="ritual_script" volumeId={vol.id} lines={8} />
            </div>
            <div className="border border-ink/5 bg-paper p-8 space-y-5">
              <Label className="text-gold">Research lens</Label>
              <Body className="text-base">Choose a lens — somatics, attachment, ritual theory, phenomenology, communication, behavioral design — and describe how it interprets this cycle.</Body>
              <JournalArea id="research_lens" volumeId={vol.id} lines={8} />
            </div>
            <div className="border border-ink/5 bg-paper p-8 space-y-5">
              <Label className="text-gold">Applied hypothesis</Label>
              <Body className="text-base">If you repeat one practice across these two weeks, what do you predict will change in mood, body, behavior, or relationships?</Body>
              <JournalArea id="applied_hypothesis" volumeId={vol.id} lines={8} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
          <Title className="text-[20vw] whitespace-nowrap">SYNTHESIS</Title>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto bg-white/40 backdrop-blur-sm border border-gold/10 p-12 md:p-24 shadow-2xl space-y-12">
          <div className="text-center space-y-4">
            <SafeIcon icon={FiCheckCircle} className="text-gold text-3xl mx-auto" />
            <Heading>Final integration</Heading>
            <Body className="max-w-2xl mx-auto text-base md:text-lg">
              Name what actually changed. Not what sounded beautiful. Not what almost happened. What changed.
            </Body>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label className="mb-4 text-gold">One-sentence synthesis</Label>
              <JournalArea id="final_synthesis_sentence" volumeId={vol.id} lines={4} />
            </div>
            <div>
              <Label className="mb-4 text-gold">Three-month check-in marker</Label>
              <JournalArea id="final_marker" volumeId={vol.id} lines={4} />
            </div>
          </div>

          <SynthesisRitual volumeId={vol.id} volumeData={vol} />
        </div>
      </Section>

      <Section className="text-center items-center pb-32">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-20 w-full">
          <div className="space-y-8">
            <SafeIcon icon={FiSun} className="w-12 h-12 text-gold mx-auto" />
            <Label className="opacity-40 tracking-[0.5em]">Closing witness</Label>
            <Title className="text-2xl md:text-4xl normal-case italic text-ink-light max-w-3xl mx-auto leading-relaxed">
              “I have tracked the movement from {sourceBody} toward {destinationBody}. I know more now about what this cycle asks of me, and what I will no longer pretend not to know.”
            </Title>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-2xl mx-auto border-t border-ink/5 pt-16">
            <div className="text-left space-y-4">
              <Label className="text-[10px] opacity-40">Signature</Label>
              <JournalInput id="final_sign" volumeId={vol.id} placeholder="Your name" />
            </div>
            <div className="text-left space-y-4">
              <Label className="text-[10px] opacity-40">Date</Label>
              <JournalInput id="final_date" volumeId={vol.id} placeholder="Today" />
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
              <Label className="text-[9px]">Back to top</Label>
            </button>
          </div>
        </motion.div>
      </Section>

      <FortnightNav vol={vol} />
    </main>
  );
}
