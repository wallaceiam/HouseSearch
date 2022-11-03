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
COPY --from=deps /src/apps/server/node_modules ./apps/server/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn schema:compile
RUN yarn server:build

FROM node:16.18-alpine3.16 AS runner
WORKDIR /app
COPY --from=deps /src/node_modules ./node_modules
COPY --from=build /src/packages/schema ./node_modules/@rightlocation/schema
COPY --from=build /src/apps/server/dist ./dist

USER node
EXPOSE 3010

ENV PORT 3010

ENV NODE_ENV production
ENV JWT_SECRET thisisasamplesecret
ENV JWT_ACCESS_EXPIRATION_MINUTES 30
ENV JWT_REFRESH_EXPIRATION_DAYS 30
ENV JWT_RESET_PASSWORD_EXPIRATION_MINUTES 10
ENV JWT_VERIFY_EMAIL_EXPIRATION_MINUTES 10

ENV SMTP_HOST email-server
ENV SMTP_PORT 587
ENV SMTP_USERNAME email-server-username
ENV SMTP_PASSWORD email-server-password
ENV EMAIL_FROM support@yourapp.com

ENV COOKIE_SECRET thisisasamplesecret

ENTRYPOINT ["node", "./dist/index.js"]
