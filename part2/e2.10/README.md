# README

## Use curl to test that too long todos are blocked by the backend

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"content":"Todo that is way over the defined character limit that is one hundred fourty characters long, so that the api returns an error 400 upon the post request"}' \
http://localhost:8084/todos
```

## Deploy to Kubernetes

```
kubectl apply -f manifests/
```

The database can be accessed with

`kubectl run -it --rm --restart=Never --image postgres psql-for-debugging sh`

and running `psql postgres://admin:<insert password here>@postgres-svc.project:5432/project`

Initialize table with `CREATE TABLE todos (id SERIAL PRIMARY KEY, todo TEXT);`

The counter is persisted even when the Postgres StatefulSet is deleted

