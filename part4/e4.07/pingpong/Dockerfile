FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

ENV PGHOST=postgres PGDATABASE=pingpong PGUSER=admin PGPASSWORD=mydockerpassword

EXPOSE 3001

CMD ["npm", "start"]