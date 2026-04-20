import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getVolumeByFortnight } from '../data/volumes';
import { Label, Title, Subtitle, Heading, Body, List } from '../components/ui/Typography';
import { JournalInput, JournalArea } from '../components/ui/Layout';
import { MoonPhase, RadiatingCircles, TriangleSymbol } from '../components/graphics/Symbols';
import { SynthesisRitual } from '../components/ui/SynthesisRitual';
import { FortnightNav } from '../components/ui/FortnightNav';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiHome,
  FiCompass,
  FiActivity,
  FiFeather,
  FiBookOpen,
  FiPlayCircle,
  FiSettings,
  FiHelpCircle,
  FiClock,
  FiMapPin,
  FiHeart,
  FiWind,
  FiEdit3,
  FiSave,
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
  if (fromElement === 'Water' && toElement === 'Air') return 'Emotion transitions from immersion to articulation.';
  if (fromElement === 'Air' && toElement === 'Water') return 'Thought condenses into feeling and absorption.';
  if (fromElement === 'Fire' && toElement === 'Water') return 'Heat tempers into emotional depth.';
  if (fromElement === 'Water' && toElement === 'Fire') return 'Feeling ignites into directed action.';
  if (fromElement === 'Earth' && toElement === 'Air') return 'Structure loosens into language and motion.';
  if (fromElement === 'Air' && toElement === 'Earth') return 'Signal grounds into form and implementation.';
  if (fromElement === 'Fire' && toElement === 'Earth') return 'Impulse refines into discipline and craft.';
  if (fromElement === 'Earth' && toElement === 'Fire') return 'Material density becomes momentum.';
  return 'Sensation converts into structure through attention.';
}

function SidebarLink({ href, icon, children, active = false }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors border-l ${
        active
          ? 'bg-paper-dark/40 text-gold border-gold'
          : 'text-ink-light border-transparent hover:bg-paper-dark/30 hover:text-gold'
      }`}
    >
      <SafeIcon icon={icon} className="text-sm" />
      <span>{children}</span>
    </a>
  );
}

function StatCard({ label, value, sublabel, icon }) {
  return (
    <div className="border border-ink/10 bg-white/70 p-5 space-y-2">
      <div className="flex items-center justify-between text-ink-light">
        <p className="text-[9px] uppercase tracking-[0.25em]">{label}</p>
        <SafeIcon icon={icon} className="text-sm" />
      </div>
      <p className="font-serif text-2xl italic text-ink leading-tight">{value}</p>
      <p className="text-[9px] uppercase tracking-[0.18em] text-ink-light opacity-70">{sublabel}</p>
    </div>
  );
}

function ProtocolArticle({ number, label, title, subtitle, description, details = [], closing, image, reverse = false, metaLeft, metaRight }) {
  return (
    <article className="relative mb-16 scroll-mt-28">
      <div className="absolute -top-4 right-4 md:-top-6 md:-right-6 w-12 h-12 bg-gold text-paper flex items-center justify-center z-10">
        <span className="font-serif text-lg">{String(number).padStart(2, '0')}</span>
      </div>

      <div className="grid grid-cols-12 border border-ink/10 bg-white/70 overflow-hidden">
        <div className={`col-span-12 md:col-span-5 relative min-h-[22rem] ${reverse ? 'md:order-2' : ''}`}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700" />
          <div className="absolute inset-4 border border-white/25 pointer-events-none" />
        </div>

        <div className={`col-span-12 md:col-span-7 p-8 md:p-10 flex flex-col justify-between ${reverse ? 'md:order-1' : ''}`}>
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-gold mb-4">{label}</p>
            <h3 className="font-serif text-3xl italic text-ink mb-2 leading-tight">{title}</h3>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-light mb-6">{subtitle}</p>
            <p className="font-serif text-base italic text-ink-light leading-relaxed mb-5">{description}</p>

            {details.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {details.map((detail) => (
                  <div key={detail.title} className="border border-ink/10 bg-paper p-3">
                    <p className="text-[8px] uppercase tracking-[0.22em] text-ink-light mb-1">{detail.title}</p>
                    <p className="font-serif text-lg italic text-gold leading-tight">{detail.value}</p>
                    <p className="text-[8px] text-ink-light mt-1 uppercase tracking-[0.16em]">{detail.subtext}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <p className="font-serif text-sm italic text-ink-light leading-relaxed">{closing}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-ink-light text-[10px] uppercase tracking-[0.18em] gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <SafeIcon icon={FiClock} className="text-sm shrink-0" />
              <span className="truncate">{metaLeft}</span>
            </div>
            <div className="flex items-center gap-2 min-w-0 text-right">
              <SafeIcon icon={FiMapPin} className="text-sm shrink-0" />
              <span className="truncate">{metaRight}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function LogCard({ label, icon, children }) {
  return (
    <div className="border border-ink/10 bg-white/70 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between text-ink-light">
        <p className="text-[9px] uppercase tracking-[0.25em]">{label}</p>
        <SafeIcon icon={icon} className="text-sm" />
      </div>
      {children}
    </div>
  );
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

  return (
    <main className="w-full min-h-screen bg-paper text-ink selection:bg-gold/25">
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-paper-dark/40 border-r border-ink/10 z-30 print:hidden flex-col pt-24">
        <div className="px-6 pb-5 border-b border-ink/10">
          <p className="text-[9px] uppercase tracking-[0.35em] text-ink-light mb-1">Workbook {String(vol.fortnight).padStart(2, '0')}</p>
          <h2 className="font-serif text-xl italic text-gold leading-tight">Lunar Chaperone</h2>
          <p className="text-[9px] uppercase tracking-[0.2em] text-ink-light mt-2">{vol.signs}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <p className="px-6 mb-2 text-[9px] uppercase tracking-[0.3em] text-ink-light">Navigation</p>
          <SidebarLink href="#overview" icon={FiHome} active>Overview</SidebarLink>
          <SidebarLink href="#context" icon={FiCompass}>Context Framing</SidebarLink>
          <SidebarLink href="#mapping" icon={FiLayers}>Energy Mapping</SidebarLink>
          <SidebarLink href="#protocols" icon={FiActivity}>Practices &amp; Protocols</SidebarLink>
          <SidebarLink href="#tracking" icon={FiBookOpen}>Practice Logs</SidebarLink>
          <SidebarLink href="#synthesis" icon={FiFeather}>Integration</SidebarLink>

          <div className="mt-5 mx-4 border-t border-ink/10 pt-4">
            <p className="px-2 mb-2 text-[9px] uppercase tracking-[0.3em] text-ink-light">Cycle Arc</p>
            <div className="space-y-1 px-2 text-[10px] uppercase tracking-[0.15em] text-ink-light">
              <div className="flex items-center justify-between border border-ink/10 px-3 py-2 bg-white/40"><span>Week I</span><span>Witness</span></div>
              <div className="flex items-center justify-between border border-ink/10 px-3 py-2 bg-white/40"><span>Week II</span><span>Apply</span></div>
            </div>
          </div>
        </nav>

        <div className="p-5 border-t border-ink/10 space-y-3">
          <button className="w-full bg-gold text-paper text-[10px] uppercase tracking-[0.25em] py-3 px-4 hover:opacity-90 transition-colors flex items-center justify-center gap-2">
            <SafeIcon icon={FiPlayCircle} className="text-sm" />
            Begin Session
          </button>
          <div className="flex gap-3">
            <button className="flex-1 text-[9px] uppercase tracking-[0.2em] text-ink-light py-2 border border-ink/10 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-1">
              <SafeIcon icon={FiSettings} className="text-xs" />
              Settings
            </button>
            <button className="flex-1 text-[9px] uppercase tracking-[0.2em] text-ink-light py-2 border border-ink/10 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-1">
              <SafeIcon icon={FiHelpCircle} className="text-xs" />
              Support
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:ml-72 pt-20">
        <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur-sm border-b border-ink/10 h-14 flex items-center px-6 md:px-8 gap-4 print:hidden">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-ink-light">
            <span>WB {String(vol.fortnight).padStart(2, '0')}</span>
            <span className="opacity-40">/</span>
            <span>{vol.title}</span>
          </div>
          <div className="flex-1" />
          <div className="text-[9px] uppercase tracking-[0.25em] text-ink-light hidden sm:block">{vol.signs}</div>
        </header>

        <div className="max-w-5xl mx-auto px-6 md:px-8 py-10">
          <section id="overview" className="mb-12 border-b border-ink/10 pb-8 scroll-mt-28">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-ink-light mb-3">Workbook {String(vol.fortnight).padStart(2, '0')} · Two-Week Cycle</p>
                <h1 className="font-serif text-5xl font-light italic text-ink leading-none mb-3">{vol.title}</h1>
                <p className="font-serif text-lg italic text-ink-light leading-relaxed max-w-2xl">
                  A structured two-week workbook for moving from {fromSign} into {toSign}, translating {fromElement.toLowerCase()} into {toElement.toLowerCase()} through the body from {sourceBody} toward {destinationBody}.
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 pt-1">
                <p className="text-[9px] uppercase tracking-[0.3em] text-ink-light">Cycle Window</p>
                <p className="font-serif text-2xl italic text-gold">14 Days</p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-ink-light opacity-70 mt-1">{fromElement} · {sourceBody} → {destinationBody}</p>
              </div>
            </div>
          </section>

          <section id="context" className="mb-14 scroll-mt-28">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Lunar Mechanics" value={`${vol.mechanics.start} → ${vol.mechanics.end}`} sublabel="Cycle threshold" icon={FiCompass} />
              <StatCard label="Somatic Axis" value={`${sourceBody} → ${destinationBody}`} sublabel="Body translation" icon={FiActivity} />
              <StatCard label="Elemental Shift" value={`${fromElement} → ${toElement}`} sublabel="Energetic movement" icon={FiWind} />
              <StatCard label="Working Metaphor" value={metaphor} sublabel="Interpretive frame" icon={FiFeather} />
            </div>

            <div className="border border-ink/10 bg-white/70 p-8 space-y-5">
              <p className="text-[9px] uppercase tracking-[0.35em] text-gold">Context Framing</p>
              <Body className="text-base md:text-lg">{vol.description}</Body>
              <Body className="text-base md:text-lg italic text-ink-light">{vol.seasonal}</Body>
              <Body className="text-sm md:text-base text-ink-light">{metaphor}</Body>
            </div>
          </section>

          <section id="mapping" className="mb-16 scroll-mt-28">
            <div className="border-b border-ink/10 pb-4 mb-8 flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-ink-light mb-2">Mapping Layer</p>
                <h2 className="font-serif text-3xl italic text-ink">Energy Mapping</h2>
              </div>
              <SafeIcon icon={FiLayers} className="text-xl text-ink-light opacity-40" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border border-ink/10 bg-white/70 p-6 space-y-5">
                <Body className="text-base">Where am I over-saturated, over-defended, overextended, or over-identified?</Body>
                <JournalArea id="field_oversaturated" volumeId={vol.id} lines={5} />
                <Body className="text-base">Where am I under-resourced, under-honest, under-supported, or under-rested?</Body>
                <JournalArea id="field_underresourced" volumeId={vol.id} lines={5} />
              </div>
              <div className="border border-gold/15 bg-white/70 p-6 space-y-5">
                <Body className="text-base">What theme, dream fragment, lyric, sensation, memory, or conflict keeps repeating?</Body>
                <JournalArea id="field_repetition_long" volumeId={vol.id} lines={5} />
                <Body className="text-base">What does the healthier {toSign} expression look like in plain language, not fantasy language?</Body>
                <JournalArea id="field_destination_language" volumeId={vol.id} lines={5} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-ink/10 bg-paper-dark/20 p-6">
                <Label className="mb-4">Healthy Expression</Label>
                <List items={['clear agreements', 'reciprocal care', 'articulated need', 'coherent pacing']} className="text-base md:text-lg" />
              </div>
              <div className="border border-ink/10 bg-paper-dark/20 p-6">
                <Label className="mb-4">Excess Expression</Label>
                <List items={['overwhelm', 'people-pleasing', 'merging for peace', 'suppressed preference']} className="text-base md:text-lg" />
              </div>
            </div>
          </section>

          <section id="protocols" className="mb-16 scroll-mt-28">
            <div className="border-b border-ink/10 pb-4 mb-8 flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-ink-light mb-2">Protocol Sequence</p>
                <h2 className="font-serif text-3xl italic text-ink">Practices &amp; Protocols</h2>
                <p className="text-[9px] uppercase tracking-[0.2em] text-ink-light mt-1 opacity-70">Modular somatic field manual</p>
              </div>
              <MoonPhase phase={isWaning ? 'full' : 'new'} className="w-8 h-8 text-ink" />
            </div>

            <ProtocolArticle
              number={1}
              label="Protocol I"
              title="Axis Breathing"
              subtitle={`${sourceBody} attunement · measured breath descent`}
              description={`A paced breath protocol for locating the ${fromSign} pattern in the body without amplifying it. The goal is accurate contact, not performance.`}
              details={[
                { title: 'Inhale', value: '4', subtext: 'counts' },
                { title: 'Hold', value: '4', subtext: 'counts' },
                { title: 'Exhale', value: '8', subtext: 'counts' },
                { title: 'Target', value: sourceBody, subtext: 'entry point' },
              ]}
              closing={`Direct awareness toward the ${sourceBody.toLowerCase()}. On the exhale, imagine the charge moving toward ${destinationBody.toLowerCase()} with less force and more precision.`}
              image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80"
              metaLeft="Duration: 11 min"
              metaRight="Seated, spine vertical"
            />

            <ProtocolArticle
              number={2}
              label="Protocol II"
              title="Voice and Boundary Toning"
              subtitle={`${toSign} language activation · vocal resonance`}
              description={`Sustained sounding, phrasing, or low-volume vocalization helps translate internal sensation into communicable structure. This is useful when the cycle is asking for clearer agreements.`}
              details={[
                { title: 'Tone', value: 'VVVV / HUM', subtext: 'resonant exhale' },
                { title: 'Duration', value: '14 min', subtext: 'sustained rounds' },
                { title: 'Function', value: 'Language', subtext: 'boundary support' },
              ]}
              closing={`Use the exhale to move from feeling into statement. Try: “I feel… I need… I will… I will not…” and notice where the body tightens or releases.`}
              image="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=900&q=80"
              metaLeft="Vocal resonance"
              metaRight="Standing or supine"
              reverse
            />

            <ProtocolArticle
              number={3}
              label="Protocol III"
              title="Descent and Structural Release"
              subtitle={`${destinationBody} grounding · behavioral integration`}
              description={`This sequence completes the translation by bringing insight down into actual structure: pacing, posture, schedule, agreements, and embodied follow-through.`}
              details={[
                { title: 'Week I', value: 'Witness', subtext: 'pattern inventory' },
                { title: 'Week II', value: 'Apply', subtext: 'behavioral shift' },
                { title: 'Method', value: 'Slow', subtext: 'no forcing' },
                { title: 'Outcome', value: 'Integration', subtext: 'not performance' },
              ]}
              closing={`Do not force catharsis. Let the body reveal the level of change it can actually sustain. Durable integration beats dramatic insight every time.`}
              image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80"
              metaLeft="Duration: 19 min"
              metaRight="Floor, chair, or wall support"
            />
          </section>

          <section id="tracking" className="mb-16 scroll-mt-28">
            <div className="border-b border-ink/10 pb-4 mb-8 flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-ink-light mb-2">Session Tracking</p>
                <h2 className="font-serif text-3xl italic text-ink">Practice Logs</h2>
                <p className="text-[9px] uppercase tracking-[0.2em] text-ink-light mt-1 opacity-70">N=1 · single-subject protocol record</p>
              </div>
              <SafeIcon icon={FiBookOpen} className="text-xl text-ink-light opacity-40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <LogCard label="Breath Rate" icon={FiWind}>
                <JournalInput id="log_breath" volumeId={vol.id} placeholder="— BPM" />
                <p className="text-[8px] uppercase tracking-[0.18em] text-ink-light opacity-70">Breaths / minute</p>
              </LogCard>
              <LogCard label="Heart Rate" icon={FiHeart}>
                <JournalInput id="log_heart" volumeId={vol.id} placeholder="— BPM" />
                <p className="text-[8px] uppercase tracking-[0.18em] text-ink-light opacity-70">Beats / minute</p>
              </LogCard>
              <LogCard label="Primary State" icon={FiCompass}>
                <JournalInput id="log_state" volumeId={vol.id} placeholder="Dormant / resonant / clear" />
                <p className="text-[8px] uppercase tracking-[0.18em] text-ink-light opacity-70">Autonomic impression</p>
              </LogCard>
              <LogCard label="Somatic Load" icon={FiLayers}>
                <JournalInput id="log_load" volumeId={vol.id} placeholder="Light / moderate / saturated" />
                <p className="text-[8px] uppercase tracking-[0.18em] text-ink-light opacity-70">Subjective load index</p>
              </LogCard>
            </div>

            <div className="border border-ink/10 bg-white/70 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-ink-light mb-1">Phenomenological Observations</p>
                  <p className="text-[8px] text-ink-light opacity-70 tracking-wide">Document bodily data, emotional weather, relational shifts, and what changed after practice.</p>
                </div>
                <SafeIcon icon={FiEdit3} className="text-lg text-ink-light opacity-40" />
              </div>
              <JournalArea id="phenomenology_notes" volumeId={vol.id} lines={8} />
              <div className="flex items-center justify-between mt-4">
                <p className="text-[8px] uppercase tracking-[0.2em] text-ink-light opacity-50">Ref: LC-{String(vol.fortnight).padStart(2, '0')}-TRACK</p>
                <button className="text-[9px] uppercase tracking-[0.25em] text-gold border border-gold px-4 py-2 hover:bg-gold hover:text-paper transition-colors flex items-center gap-2">
                  <SafeIcon icon={FiSave} className="text-xs" />
                  Commit to Archive
                </button>
              </div>
            </div>
          </section>

          <section id="synthesis" className="mb-8 scroll-mt-28">
            <div className="border-b border-ink/10 pb-4 mb-8 flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-ink-light mb-2">Final Layer</p>
                <h2 className="font-serif text-3xl italic text-ink">Integration &amp; Synthesis</h2>
              </div>
              <SafeIcon icon={FiCheckCircle} className="text-xl text-ink-light opacity-40" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-ink/10 bg-white/70 p-6 space-y-4">
                <Body className="text-base">What changed across these two weeks once the pattern was named and practiced against?</Body>
                <JournalArea id="integration_change" volumeId={vol.id} lines={6} />
              </div>
              <div className="border border-gold/15 bg-white/70 p-6 space-y-4">
                <Body className="text-base">What is the clearest measurable sign to check again in three months?</Body>
                <JournalArea id="integration_marker" volumeId={vol.id} lines={6} />
              </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto bg-white/70 border border-gold/10 p-8 md:p-12 shadow-sm">
              <SynthesisRitual volumeId={vol.id} volumeData={vol} />
            </div>
          </section>
        </div>

        <FortnightNav vol={vol} />
      </div>
    </main>
  );
}
