FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

ENV PORT=8084

EXPOSE 8084

CMD ["npm", "start"]