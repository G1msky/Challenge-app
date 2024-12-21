#!/bin/sh
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  echo "Waiting for postgres..."
  sleep 1
done

echo "PostgreSQL started"
exec $cmd 