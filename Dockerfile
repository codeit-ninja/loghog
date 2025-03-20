FROM oven/bun:latest AS builder

ARG NODE_ENV
ARG PUBLIC_SOCKET_URL
ARG DATABASE_URL

ENV NODE_ENV=${NODE_ENV}
ENV PUBLIC_SOCKET_URL=${PUBLIC_SOCKET_URL}
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN bun install --verbose

COPY . .

RUN bun run build
RUN bun prisma generate

FROM node:22-slim

COPY --from=builder /app/ ./
RUN apt-get update -y && apt-get install -y openssl

EXPOSE 3000

CMD ["node", "./build/index.js"]
