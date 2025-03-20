FROM node:22-slim AS builder

ENV PUBLIC_SOCKET_URL=
ENV DATABASE_URL=

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

FROM node:22-slim

COPY --from=builder /app/ ./

EXPOSE 3000

CMD ["node", "./build/index.js"]
