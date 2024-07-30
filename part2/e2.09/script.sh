#!/bin/sh

url=$(curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -Fi Location | cut -d' ' -f2 | tr -d '\r')

echo "Random Wikipedia page URL: $url"

curl --header "Content-Type: application/json" --request POST --data "{\"content\":\"Read ${url}\"}" http://${HOST}/todos
