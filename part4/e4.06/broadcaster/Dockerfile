FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

ENV NATS_URL=nats://host.docker.internal:4222 CHAT_ID=placeholder TOKEN=placeholder

CMD ["npm", "start"]