import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, access, writeFile } from 'fs/promises';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const audioCacheDir = join(__dirname, '..', '.audio-cache');

const app = express();
const PORT = process.env.PORT || 3000;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const ELEVENLABS_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/audio-cache', express.static(audioCacheDir, { maxAge: '7d', etag: true }));
app.use(express.static(dist, { maxAge: '1y', etag: true }));

function ensureElevenLabsConfigured() {
  return Boolean(ELEVENLABS_API_KEY && ELEVENLABS_VOICE_ID);
}

function cleanText(text = '') {
  return String(text).replace(/\s+/g, ' ').trim();
}

async function synthesizeSpeech(text, cacheKey, voiceSettings) {
  await mkdir(audioCacheDir, { recursive: true });
  const filename = `${cacheKey}.mp3`;
  const filepath = join(audioCacheDir, filename);

  try {
    await access(filepath);
    return { url: `/audio-cache/${filename}`, cached: true };
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY,
    },
    body: JSON.stringify({
      text,
      model_id: ELEVENLABS_MODEL_ID,
      voice_settings: voiceSettings,
    }),
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs request failed with status ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(filepath, Buffer.from(arrayBuffer));
  return { url: `/audio-cache/${filename}`, cached: false };
}

app.post('/api/audio/workbook-standard', async (req, res) => {
  try {
    if (!ensureElevenLabsConfigured()) {
      return res.status(503).json({ error: 'Audio generation is not configured yet.' });
    }

    const { vol, fromSign, toSign, sourceBody, destinationBody, fromElement, toElement } = req.body || {};
    const text = cleanText(`Welcome to Lunar Chaperone workbook ${vol.fortnight}. ${vol.title}. This cycle moves from ${fromSign} into ${toSign}, through the body from ${sourceBody} toward ${destinationBody}. The elemental shift is ${fromElement} into ${toElement}. ${vol.description} ${vol.shift}. Move slowly. Let the pattern become visible.`);
    const cacheKey = crypto.createHash('sha1').update(`standard:${vol.id}:${text}`).digest('hex');

    const audio = await synthesizeSpeech(text, cacheKey, {
      stability: 0.55,
      similarity_boost: 0.82,
      style: 0.22,
      speed: 0.96,
      use_speaker_boost: true,
    });

    res.json({ ...audio, mode: 'standard' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/audio/workbook-personalized', async (req, res) => {
  try {
    if (!ensureElevenLabsConfigured()) {
      return res.status(503).json({ error: 'Audio generation is not configured yet.' });
    }

    const { vol, fromSign, toSign, sourceBody, destinationBody, entries } = req.body || {};
    const reflectionText = Object.values(entries || {}).filter(Boolean).join(' ');
    const text = cleanText(`This is your personalized Lunar Chaperone synthesis for workbook ${vol.fortnight}. You have been moving from ${fromSign} into ${toSign}, and through the body from ${sourceBody} toward ${destinationBody}. ${reflectionText}. Based on your reflections, notice what changed, what still needs articulation, and what next step is specific, embodied, and sustainable.`);
    const cacheKey = crypto.createHash('sha1').update(`personalized:${vol.id}:${text}`).digest('hex');

    const audio = await synthesizeSpeech(text, cacheKey, {
      stability: 0.48,
      similarity_boost: 0.86,
      style: 0.28,
      speed: 0.94,
      use_speaker_boost: true,
    });

    res.json({ ...audio, mode: 'personalized' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(join(dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Lunar Chaperone running → http://localhost:${PORT}`);
});
