FROM node:16.18.0-alpine as build

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .

RUN yarn install --pure-lockfile && \
  yarn compile && \
  yarn install --production --ignore-scripts --prefer-offline


FROM build

COPY --from=build /usr/src/app .

USER node
EXPOSE 3000

CMD ["node"m "./dist/index.js"]
