import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 3000;

// gzip everything
app.use(compression());

// health endpoint (useful for Docker / load balancers)
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// serve static build artifacts
app.use(express.static(dist, { maxAge: '1y', etag: true }));

// SPA fallback — all unmatched routes return index.html so deep links work
app.get('*', (_req, res) => {
  res.sendFile(join(dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Lunar Chaperone running → http://localhost:${PORT}`);
});
