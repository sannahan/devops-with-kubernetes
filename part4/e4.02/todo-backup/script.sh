#!/usr/bin/env bash
set -e

if [ $URL ]
then
  pg_dump -v $URL > /usr/src/app/backup.sql

  echo "Dump file created"

  gcloud auth activate-service-account --key-file=/etc/secret-volume/.secret-file

  gcloud storage cp /usr/src/app/backup.sql gs://sannahan-project-backup

  echo "Dump file uploaded"
fi