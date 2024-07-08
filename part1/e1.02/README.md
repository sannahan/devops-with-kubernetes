Project has a default port 8080 if you run `npm start` instead of `PORT=<insert port> npm start`

Project has a default port 8081 if you run `docker run <imagename>` instead of `docker run -e PORT=<insert port> <imagename>`

Added to Kubernetes with

```kubectl create deployment project --image=sannahan/project```

(runs on 8081)

Changed environment variable with

```kubectl set env deployment/project PORT=8082```

(runs on 8082)