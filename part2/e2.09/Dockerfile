FROM alpine:3.20

WORKDIR /usr/src/app

COPY script.sh .

RUN apk add --update curl && rm -rf /var/cache/apk/*

ENV HOST=host.docker.internal:8081

CMD ./script.sh