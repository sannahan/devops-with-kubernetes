Tested in Docker with

`docker volume create log-volume`

Build log-generate and log-read Docker images and run containers with

`docker run -v log-volume:/usr/src/app/files log-generate:e1.10`

`docker run -v log-volume:/usr/src/app/files -p 3000:3000 log-read:e1.10`

In Kubernetes, run

`kubectl apply -f manifests/`

When you refresh localhost:8081, it shows a new timestamp every 5 seconds
