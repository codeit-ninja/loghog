FROM oven/bun:latest AS builder

ENV PUBLIC_SOCKET_URL=http://localhost:3000/ws
ENV DATABASE_URL=postgresql://username:password@localhost:5432/loghog?schema=public

WORKDIR /app

COPY package*.json ./

RUN bun install --verbose

COPY . .

RUN bun run build --verbose-error-trace
RUN bun prisma generate

FROM node:22-slim

COPY --from=builder /app/ ./

EXPOSE 3000

CMD ["node", "./build/index.js"]
