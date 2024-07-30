```
kubectl apply -f manifests/
```

The database can be accessed with

`kubectl run -it --rm --restart=Never --image postgres psql-for-debugging sh`

and running `psql postgres://admin:<insert password here>@postgres-svc.project:5432/project`

Initialize table with `CREATE TABLE todos (id SERIAL PRIMARY KEY, todo TEXT);`

The counter is persisted even when the Postgres StatefulSet is deleted

