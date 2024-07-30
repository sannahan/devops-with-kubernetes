# Local setup

`docker compose up -d`

Initialize table with `CREATE TABLE requests (id SERIAL PRIMARY KEY, counter INT DEFAULT 0);` and `INSERT INTO requests (counter) VALUES (0);`

## Docker

## Kubernetes

The database can be accessed with

`kubectl run -it --rm --restart=Never --image postgres psql-for-debugging sh`

and running `psql postgres://admin:<insert password here>@postgres-svc.log-output:5432/pingpong`

Initialize table with `CREATE TABLE requests (id SERIAL PRIMARY KEY, counter INT DEFAULT 0);` and `INSERT INTO requests (counter) VALUES (0);`

The counter is persisted even when the Postgres StatefulSet is deleted
