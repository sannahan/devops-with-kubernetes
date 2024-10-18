# README

## Use curl to test that too long todos are blocked by the backend

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"content":"Todo that is way over the defined character limit that is one hundred fourty characters long, so that the api returns an error 400 upon the post request"}' \
http://localhost:8084/todos
```

## Deploy to Kubernetes

Github Actions:
- if you add a branch, Github Actions creates an environment (namespace and resources) for it
- if you delete a remote branch (not main), Github Actions removes the environment (resources and namespace) in Kubernetes

Initialize table with `CREATE TABLE todos (id SERIAL PRIMARY KEY, todo TEXT);`

The counter is persisted even when the Postgres StatefulSet is deleted

With canary releases, if Analysis Template successCondition is result <= 0.5, release is successful. If successCondition is <= 0.05, release is unsuccessful after 10 minutes.

## Database as a Service (DBaaS) vs PersistentVolumeClaims with our own Postgres images (DIY)

|               | Google Cloud SQL                                                                                                                                                    | Postgres with PVC in Google Cloud                                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Required work | One command for setting up a Postgres instance and another command for setting up a password. Additional gcloud commands available for managing databases and users | Deploying a Postgres StatefulSet with Persistent Volume Claim (possibly ConfigMap and Secret, too) resources to GKE                                       |
| Cost          | Example: €349.20/month for 3 Postgres servers with 2 vCPUs and 7.5 GB memory each + 100 GB of storage on Enterprise level                                           | Example: €305.84/month for 3 servers with 2 vCPUs and 7.5 GB memory each + 375 GB of storage                                                              |
| Maintenance   | Automated OS and db patches and encryption at rest. Configurable quotas for usage. One command for replication. Supported client-side encryption                    | Automated OS but manual db patches. Encryption at rest. Configurable quotas for usage. Manual replication with eg. Pgpool. Manual client-side encryption. |
| Backup        | Automated backup every 4 hours (up to 7 backups are stored with Enterprise). On-demand backups available                                                            | Manual backups                                                                                                                                            |

## Database backup

Created a service account with Storage Admin role to Google Cloud

Created a private key with `gcloud iam service-accounts keys create KEY_FILE --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com`



