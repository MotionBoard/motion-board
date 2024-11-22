FROM node:20-alpine AS base
WORKDIR /usr/src/app

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm

FROM base AS install

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .

RUN pnpm run generate
ENV NODE_ENV=production
RUN pnpm run build

# copy production dependencies and source code into final image
FROM base AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app ./

EXPOSE 3000/tcp
ENV PORT=3000

USER nextjs

CMD ["pnpm", "start"]