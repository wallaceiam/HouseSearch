# Install dependencies only when needed
FROM node:16.18-alpine3.16 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /src

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
COPY apps/client/package.json ./apps/client/package.json
COPY apps/public/package.json ./apps/public/package.json
COPY apps/server/package.json ./apps/server/package.json
COPY packages/schema/package.json ./packages/schema/package.json
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.18-alpine3.16 AS build
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY --from=deps /src/apps/public/node_modules ./apps/public/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_BUILD_STATIC_GENERATION 1
RUN yarn schema:compile
RUN yarn public:build

# Production image, copy all the files and run next
FROM node:16.18-alpine3.16 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /src/apps/public/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /src/apps/public/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /src/apps/public/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /src/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /src/apps/public/node_modules/next ./node_modules/next

USER nextjs

EXPOSE 3020

ENV PORT 3020

CMD ["node", "server.js"]