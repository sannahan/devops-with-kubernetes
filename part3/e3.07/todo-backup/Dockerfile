FROM google/cloud-sdk:alpine

WORKDIR /usr/src/app

COPY script.sh .

RUN apk add --no-cache postgresql-client
RUN apk add --update curl && rm -rf /var/cache/apk/*

ENV URL=placeholder

CMD ./script.sh