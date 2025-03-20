FROM oven/bun:latest AS builder

ARG NODE_ENV
ARG PUBLIC_SOCKET_URL
ARG DATABASE_URL

ENV NODE_ENV=${NODE_ENV}
ENV PUBLIC_SOCKET_URL=${PUBLIC_SOCKET_URL}
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package*.json ./
RUN bun install --frozen-lockfile

COPY . . 
RUN bun run build
RUN bun prisma generate

# Gebruik dezelfde base image om overhead te vermijden
FROM oven/bun:latest AS runtime

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["bun", "run", "build/index.js"]
