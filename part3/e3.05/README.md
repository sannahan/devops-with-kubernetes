# README

## Use curl to test that too long todos are blocked by the backend

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"content":"Todo that is way over the defined character limit that is one hundred fourty characters long, so that the api returns an error 400 upon the post request"}' \
http://localhost:8084/todos
```

## Deploy to Kubernetes

Github Actions - if you delete a remote branch (not main), Github Actions removes the environment (resources and namespace) in Kubernetes

Initialize table with `CREATE TABLE todos (id SERIAL PRIMARY KEY, todo TEXT);`

The counter is persisted even when the Postgres StatefulSet is deleted

