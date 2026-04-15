# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# install deps first (layer-cache friendly)
COPY package*.json ./
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

# ── Stage 2: serve ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# copy built frontend + server
COPY --from=builder /app/dist ./dist
COPY server/ ./server/

# non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server/index.js"]
