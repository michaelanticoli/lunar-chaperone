// 26-fortnight sequential arc: alternating waxing/waning through all 12 sign pairs
// Fortnights 1-12 = first pass (waxing odd, waning even)
// Fortnights 13-24 = second pass (opposite phase for each pair)
// Fortnights 25-26 = eclipse portals
//
// Each entry retains its original vol-XX id and sequence number for backward
// compatibility with saved localStorage entries. The `fortnight` field is the
// canonical arc position (1-26). `phase` replaces `type` (waxing/waning/eclipse).

export const volumes = [
  // ── Fortnight 1 ─────────────────────────────────────────────────────────────
  {
    id: "vol-18",
    sequence: 18,
    fortnight: 1,
    phase: "waxing",
    series: "Series Two",
    title: "Fire Deepening to Shadow",
    signs: "Aries → Scorpio",
    type: "Waxing (Ascent)",
    shift: "Action evolving into psychological mastery",
    somatic: "Head/Initiative → Reproductive Organs/Transformation",
    seasonal: "Spring action deepening into autumn transformation",
    description: "Moving from the surface act to the deep psychological transformation beneath it.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: null,
    nextId: "vol-08",
  },

  // ── Fortnight 2 ─────────────────────────────────────────────────────────────
  {
    id: "vol-08",
    sequence: 8,
    fortnight: 2,
    phase: "waning",
    series: "Series One",
    title: "From Depth to Root",
    signs: "Scorpio → Taurus",
    type: "Waning (Descent)",
    shift: "Hidden power grounding into embodied voice",
    somatic: "Reproductive Organs/Shadow → Throat/Voice",
    seasonal: "Autumn depths rooting into spring embodiment",
    description: "Distilling transformative intensity into the steady, vocalized presence of the physical body.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-18",
    nextId: "vol-21",
  },

  // ── Fortnight 3 ─────────────────────────────────────────────────────────────
  {
    id: "vol-21",
    sequence: 21,
    fortnight: 3,
    phase: "waxing",
    series: "Series Two",
    title: "Root Expanding to Vision",
    signs: "Taurus → Sagittarius",
    type: "Waxing (Ascent)",
    shift: "Embodied stability building toward philosophical exploration",
    somatic: "Throat/Voice/Stability → Hips/Expansion",
    seasonal: "Spring embodiment building into autumn wisdom",
    description: "Building from the rooted, vocalized presence of the physical body toward the expansive horizon of higher meaning.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-08",
    nextId: "vol-10",
  },

  // ── Fortnight 4 ─────────────────────────────────────────────────────────────
  {
    id: "vol-10",
    sequence: 10,
    fortnight: 4,
    phase: "waning",
    series: "Series One",
    title: "From Vision to Voice",
    signs: "Sagittarius → Gemini",
    type: "Waning (Descent)",
    shift: "Wisdom translated into communication",
    somatic: "Hips/Philosophy → Lungs/Communication",
    seasonal: "Autumn wisdom speaking into spring communication",
    description: "Condensing grand philosophies into the immediate, breathable exchange of ideas.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-21",
    nextId: "vol-23",
  },

  // ── Fortnight 5 ─────────────────────────────────────────────────────────────
  {
    id: "vol-23",
    sequence: 23,
    fortnight: 5,
    phase: "waxing",
    series: "Series Two",
    title: "Voice Softening to Womb",
    signs: "Gemini → Cancer",
    type: "Waxing (Ascent)",
    shift: "Intellectual exchange building toward emotional nourishment",
    somatic: "Lungs/Arms/Communication → Breast/Nurturing",
    seasonal: "Spring communication building into summer care",
    description: "Moving from the electricity of shared information toward the warm, visceral nourishment of belonging.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-10",
    nextId: "vol-12",
  },

  // ── Fortnight 6 ─────────────────────────────────────────────────────────────
  {
    id: "vol-12",
    sequence: 12,
    fortnight: 6,
    phase: "waning",
    series: "Series One",
    title: "From Womb to Bone",
    signs: "Cancer → Capricorn",
    type: "Waning (Descent)",
    shift: "Emotional grounding forming long-term structure",
    somatic: "Breast/Stomach/Home → Knees/Bones/Structure",
    seasonal: "Summer nurturing structuring into winter foundation",
    description: "Distilling emotional care into the enduring architecture of life and destiny.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-23",
    nextId: "vol-19",
  },

  // ── Fortnight 7 ─────────────────────────────────────────────────────────────
  {
    id: "vol-19",
    sequence: 19,
    fortnight: 7,
    phase: "waxing",
    series: "Series Two",
    title: "Bone Ascending to Heart",
    signs: "Capricorn → Leo",
    type: "Waxing (Ascent)",
    shift: "Structural wisdom building toward expressive creative fire",
    somatic: "Knees/Bones → Heart/Solar Plexus",
    seasonal: "Winter foundation building into summer expression",
    description: "Rising from the deep scaffolding of the skeleton into the radiant pulse of creative self-expression.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-12",
    nextId: "vol-02",
  },

  // ── Fortnight 8 ─────────────────────────────────────────────────────────────
  {
    id: "vol-02",
    sequence: 2,
    fortnight: 8,
    phase: "waning",
    series: "Series One",
    title: "From Heart to Mind",
    signs: "Leo → Aquarius",
    type: "Waning (Descent)",
    shift: "Creative identity expanding into collective innovation",
    somatic: "Heart/Solar Plexus → Nervous System/Higher Mind",
    seasonal: "Summer creativity expanding into winter innovation",
    description: "Distilling personal expression into visionary concepts that serve the wider human network.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-19",
    nextId: "vol-14",
  },

  // ── Fortnight 9 ─────────────────────────────────────────────────────────────
  {
    id: "vol-14",
    sequence: 14,
    fortnight: 9,
    phase: "waxing",
    series: "Series Two",
    title: "Mind Manifesting Through Gut",
    signs: "Aquarius → Virgo",
    type: "Waxing (Ascent)",
    shift: "Innovation becoming practical implementation",
    somatic: "Nervous System/Higher Mind → Digestive System",
    seasonal: "Winter innovation manifesting into late summer harvest",
    description: "Taking visionary ideas and building the functional systems to sustain them.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-02",
    nextId: "vol-04",
  },

  // ── Fortnight 10 ────────────────────────────────────────────────────────────
  {
    id: "vol-04",
    sequence: 4,
    fortnight: 10,
    phase: "waning",
    series: "Series One",
    title: "From Gut to Soul",
    signs: "Virgo → Pisces",
    type: "Waning (Descent)",
    shift: "Precision dissolving into universal compassion",
    somatic: "Digestive System/Gut Instinct → Feet/Etheric Body",
    seasonal: "Harvest wisdom flowing into spring transcendence",
    description: "Releasing the need for perfect order to merge with the infinite ocean of the soul.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-14",
    nextId: "vol-16",
  },

  // ── Fortnight 11 ────────────────────────────────────────────────────────────
  {
    id: "vol-16",
    sequence: 16,
    fortnight: 11,
    phase: "waxing",
    series: "Series Two",
    title: "Soul Balancing Through Harmony",
    signs: "Pisces → Libra",
    type: "Waxing (Ascent)",
    shift: "Transcendence manifesting as relational harmony",
    somatic: "Feet/Etheric Body → Kidneys/Balance",
    seasonal: "Spring transcendence balancing into autumn harmony",
    description: "Anchoring mystical unity into the clear agreements of partnership.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-04",
    nextId: "vol-06",
  },

  // ── Fortnight 12 ────────────────────────────────────────────────────────────
  {
    id: "vol-06",
    sequence: 6,
    fortnight: 12,
    phase: "waning",
    series: "Series One",
    title: "From Balance to Fire",
    signs: "Libra → Aries",
    type: "Waning (Descent)",
    shift: "Harmony igniting bold individual action",
    somatic: "Kidneys/Balance → Head/Initiation",
    seasonal: "Autumn balance sparking into spring initiation",
    description: "Shedding the need for consensus to ignite the raw spark of individual will.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-16",
    nextId: "vol-07",
  },

  // ── Fortnight 13 — second pass begins (opposite phase per pair) ──────────────
  {
    id: "vol-07",
    sequence: 7,
    fortnight: 13,
    phase: "waning",
    series: "Series One",
    title: "From Fire to Depth",
    signs: "Aries → Scorpio",
    type: "Waning (Descent)",
    shift: "Raw energy deepening into transformative power",
    somatic: "Head/Initiative → Reproductive Organs/Transformation",
    seasonal: "Spring initiation deepening into autumn transformation",
    description: "Descending from the surface fire of action into the deep, alchemical waters of the psyche.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-06",
    nextId: "vol-20",
  },

  // ── Fortnight 14 ────────────────────────────────────────────────────────────
  {
    id: "vol-20",
    sequence: 20,
    fortnight: 14,
    phase: "waxing",
    series: "Series Two",
    title: "Depth Rooting to Ground",
    signs: "Scorpio → Taurus",
    type: "Waxing (Ascent)",
    shift: "Transformative power building into embodied voice",
    somatic: "Reproductive Organs/Shadow → Throat/Voice",
    seasonal: "Autumn depths building into spring embodiment",
    description: "Channeling the alchemical intensity of the psyche into the steady, grounded resonance of the body's voice.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-07",
    nextId: "vol-09",
  },

  // ── Fortnight 15 ────────────────────────────────────────────────────────────
  {
    id: "vol-09",
    sequence: 9,
    fortnight: 15,
    phase: "waning",
    series: "Series One",
    title: "From Root to Vision",
    signs: "Taurus → Sagittarius",
    type: "Waning (Descent)",
    shift: "Stability opening into philosophical exploration",
    somatic: "Throat/Voice/Stability → Hips/Expansion",
    seasonal: "Spring embodiment expanding into autumn wisdom",
    description: "Releasing the comfort of the known to embark on the quest for higher meaning.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-20",
    nextId: "vol-22",
  },

  // ── Fortnight 16 ────────────────────────────────────────────────────────────
  {
    id: "vol-22",
    sequence: 22,
    fortnight: 16,
    phase: "waxing",
    series: "Series Two",
    title: "Vision Speaking Through Voice",
    signs: "Sagittarius → Gemini",
    type: "Waxing (Ascent)",
    shift: "Philosophical wisdom building toward intellectual exchange",
    somatic: "Hips/Philosophy → Lungs/Communication",
    seasonal: "Autumn wisdom building into spring communication",
    description: "Channeling grand philosophical insights into the animated, breath-driven exchange of immediate ideas.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-09",
    nextId: "vol-11",
  },

  // ── Fortnight 17 ────────────────────────────────────────────────────────────
  {
    id: "vol-11",
    sequence: 11,
    fortnight: 17,
    phase: "waning",
    series: "Series One",
    title: "From Voice to Womb",
    signs: "Gemini → Cancer",
    type: "Waning (Descent)",
    shift: "Intellectual connection softening into emotional nourishment",
    somatic: "Lungs/Arms/Communication → Breast/Nurturing",
    seasonal: "Spring communication nurturing into summer care",
    description: "Moving from external information to internal, visceral nourishment and safety.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-22",
    nextId: "vol-24",
  },

  // ── Fortnight 18 ────────────────────────────────────────────────────────────
  {
    id: "vol-24",
    sequence: 24,
    fortnight: 18,
    phase: "waxing",
    series: "Series Two",
    title: "Womb Crystallizing to Bone",
    signs: "Cancer → Capricorn",
    type: "Waxing (Ascent)",
    shift: "Emotional wisdom building toward long-term structure",
    somatic: "Breast/Stomach/Home → Knees/Bones/Structure",
    seasonal: "Summer nurturing building into winter foundation",
    description: "Channeling deep emotional care into the enduring architecture of purposeful life structure.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-11",
    nextId: "vol-01",
  },

  // ── Fortnight 19 ────────────────────────────────────────────────────────────
  {
    id: "vol-01",
    sequence: 1,
    fortnight: 19,
    phase: "waning",
    series: "Series One",
    title: "From Bone to Heart",
    signs: "Capricorn → Leo",
    type: "Waning (Descent)",
    shift: "Structure shifting into expressive heart-based creativity",
    somatic: "Knees/Bones → Heart/Solar Plexus",
    seasonal: "Winter structure flowing into summer expression",
    description: "Releasing the rigid skeletal structures of the collective to find the pulse of individual creative fire.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-24",
    nextId: "vol-13",
  },

  // ── Fortnight 20 ────────────────────────────────────────────────────────────
  {
    id: "vol-13",
    sequence: 13,
    fortnight: 20,
    phase: "waxing",
    series: "Series Two",
    title: "Heart Expanding to Mind",
    signs: "Leo → Aquarius",
    type: "Waxing (Ascent)",
    shift: "Creativity building toward visionary leadership",
    somatic: "Heart/Solar Plexus → Nervous System/Higher Mind",
    seasonal: "Summer creativity expanding into winter innovation",
    description: "Building from the individual pulse toward a collective vision of the future.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-01",
    nextId: "vol-03",
  },

  // ── Fortnight 21 ────────────────────────────────────────────────────────────
  {
    id: "vol-03",
    sequence: 3,
    fortnight: 21,
    phase: "waning",
    series: "Series One",
    title: "From Mind to Gut",
    signs: "Aquarius → Virgo",
    type: "Waning (Descent)",
    shift: "Visionary concepts grounding through service and analysis",
    somatic: "Nervous System/Higher Mind → Digestive System",
    seasonal: "Winter visions grounding into late summer harvest",
    description: "Moving from the abstract heights of the mind into the practical, analytical processing of the gut.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-13",
    nextId: "vol-15",
  },

  // ── Fortnight 22 ────────────────────────────────────────────────────────────
  {
    id: "vol-15",
    sequence: 15,
    fortnight: 22,
    phase: "waxing",
    series: "Series Two",
    title: "Gut Flowing to Soul",
    signs: "Virgo → Pisces",
    type: "Waxing (Ascent)",
    shift: "Practical wisdom flowing into spiritual unity",
    somatic: "Digestive System/Gut Instinct → Feet/Etheric Body",
    seasonal: "Late summer practicality flowing into spring transcendence",
    description: "Moving from the detail of the part to the unity of the whole.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-03",
    nextId: "vol-05",
  },

  // ── Fortnight 23 ────────────────────────────────────────────────────────────
  {
    id: "vol-05",
    sequence: 5,
    fortnight: 23,
    phase: "waning",
    series: "Series One",
    title: "From Soul to Balance",
    signs: "Pisces → Libra",
    type: "Waning (Descent)",
    shift: "Mystical awareness forming relational harmony",
    somatic: "Feet/Etheric Body → Kidneys/Balance",
    seasonal: "Spring transcendence balancing into autumn harmony",
    description: "Bringing the insights of the void into the delicate equilibrium of human relationship.",
    mechanics: { start: "Full Moon", end: "New Moon" },
    prevId: "vol-15",
    nextId: "vol-17",
  },

  // ── Fortnight 24 ────────────────────────────────────────────────────────────
  {
    id: "vol-17",
    sequence: 17,
    fortnight: 24,
    phase: "waxing",
    series: "Series Two",
    title: "Balance Igniting to Fire",
    signs: "Libra → Aries",
    type: "Waxing (Ascent)",
    shift: "Diplomatic groundwork sparking courageous initiation",
    somatic: "Kidneys/Balance → Head/Brain",
    seasonal: "Autumn balance igniting into spring courage",
    description: "Taking the strength of agreement and launching into independent action.",
    mechanics: { start: "New Moon", end: "Full Moon" },
    prevId: "vol-05",
    nextId: "vol-25",
  },

  // ── Fortnight 25 — Eclipse Portal ───────────────────────────────────────────
  {
    id: "vol-25",
    sequence: 25,
    fortnight: 25,
    phase: "eclipse",
    series: "Advanced",
    title: "Virgo–Aries Eclipse Portal",
    signs: "Virgo → Aries",
    type: "Eclipse Portal",
    shift: "Eclipse transformation: releasing perfectionism for bold initiation",
    somatic: "Digestive System/Analysis → Head/Initiative",
    seasonal: "Analysis transforming into action",
    description: "A high-intensity threshold crossing where the need for order is eclipsed by the need for birth.",
    mechanics: { start: "Eclipse", end: "Eclipse" },
    prevId: "vol-17",
    nextId: "vol-26",
  },

  // ── Fortnight 26 — Eclipse Portal ───────────────────────────────────────────
  {
    id: "vol-26",
    sequence: 26,
    fortnight: 26,
    phase: "eclipse",
    series: "Advanced",
    title: "Pisces–Virgo Eclipse Portal",
    signs: "Pisces → Virgo",
    type: "Eclipse Portal",
    shift: "Eclipse completion: spiritual insight grounding into service",
    somatic: "Feet/Etheric Body → Digestive System",
    seasonal: "Transcendence grounding into practical wisdom",
    description: "The final completion of the 26-volume cycle, grounding the infinite into the sacred ordinary.",
    mechanics: { start: "Eclipse", end: "Eclipse" },
    prevId: "vol-25",
    nextId: null,
  },
];

// ── Lookup helpers ────────────────────────────────────────────────────────────

/** Look up a volume by its vol-XX id */
export const getVolumeById = (id) => volumes.find(v => v.id === id) ?? null;

/** Look up a volume by its 1-based fortnight number */
export const getVolumeByFortnight = (n) =>
  volumes.find(v => v.fortnight === Number(n)) ?? null;

/** Return { prev, next } volume objects for a given vol-XX id */
export const getNeighbors = (id) => {
  const vol = getVolumeById(id);
  if (!vol) return { prev: null, next: null };
  return {
    prev: vol.prevId ? getVolumeById(vol.prevId) : null,
    next: vol.nextId ? getVolumeById(vol.nextId) : null,
  };
};

// Lunar cycle groupings for Library: pairs of consecutive fortnights
// Fortnights 25-26 (eclipse portals) are treated as a standalone group
export const LUNAR_CYCLES = [
  ...Array.from({ length: 12 }, (_, i) => ({
    cycle: i + 1,
    label: `Lunar Cycle ${i + 1}`,
    fortnights: volumes.filter(v => v.fortnight === i * 2 + 1 || v.fortnight === i * 2 + 2),
  })),
  {
    cycle: 13,
    label: "Eclipse Portals",
    fortnights: volumes.filter(v => v.phase === "eclipse"),
  },
];
