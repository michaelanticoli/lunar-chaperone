# Lunar Chaperone

Lunar Chaperone is a Vite + React single-page workbook experience — animated, reactive, and richly interactive.

## Project layout

```
.
├── src/               # React application source
├── server/            # Minimal Express server (SPA fallback + compression + /health)
├── Dockerfile         # Multi-stage production image
├── docker-compose.yml # One-command local / hosted run
├── .dockerignore
└── vite.config.js     # Vite build configuration
```

---

## Prerequisites

| Tool | Min version |
|------|-------------|
| Node.js | 20 |
| npm | 10 |
| Docker | 24 |
| Docker Compose | v2 (bundled with Docker Desktop) |

---

## Local development (no Docker)

```bash
npm install
npm run dev          # Vite dev server → http://localhost:5173
```

---

## Production build (no Docker)

```bash
npm run build        # outputs to dist/
npm start            # Express serves dist/ → http://localhost:3000
```

---

## Docker — quick start

### Build & run with Docker Compose (recommended)

```bash
docker compose up --build
```

App is available at **http://localhost:3000**.

To run in the background:

```bash
docker compose up -d --build
docker compose logs -f        # tail logs
docker compose down           # stop
```

### Build & run with plain Docker

```bash
docker build -t lunar-chaperone .
docker run -p 3000:3000 lunar-chaperone
```

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the Express server listens on |
| `NODE_ENV` | `production` | Node environment |

Pass them at run time — never hard-code secrets in the image:

```bash
# docker run
docker run -e PORT=8080 -p 8080:8080 lunar-chaperone

# docker compose (create a .env file — it is git-ignored)
echo "PORT=8080" > .env
docker compose up
```

---

## Health check

The server exposes `GET /health` which returns:

```json
{ "status": "ok" }
```

Docker (and any load balancer / orchestrator) uses this automatically.

---

## Deploying to a generic Docker host

Any platform that runs Docker containers works:

1. Build the image (or let CI build it):
   ```bash
   docker build -t your-registry/lunar-chaperone:latest .
   docker push your-registry/lunar-chaperone:latest
   ```
2. Run it on your host:
   ```bash
   docker run -d -p 80:3000 --restart unless-stopped your-registry/lunar-chaperone:latest
   ```

Platform-specific shortcuts:
- **Fly.io**: `fly launch` (auto-detects Dockerfile)
- **Render**: connect repo, choose "Docker" as runtime
- **Railway**: connect repo — Railway detects the Dockerfile automatically
- **DigitalOcean App Platform**: choose "Docker" source

