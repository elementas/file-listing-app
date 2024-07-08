# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


# Stage 2: Runtime image
FROM node:20-alpine

ENV NODE_ENV=production
ENV APP_PORT=3000
ENV APP_PATH=/home/node/app/input

WORKDIR /home/node/app

RUN mkdir /home/node/app/input

COPY --chown=node:node --from=builder /app/package*.json /home/node/app/
COPY --chown=node:node --from=builder /app/dist /home/node/app

RUN npm install
RUN chown -R node:node /home/node/app/input

USER node

EXPOSE 3000

CMD ["node", "index.js"]
