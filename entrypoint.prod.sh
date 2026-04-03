#!/bin/bash
set -e

wait_for_django() {
    echo "Waiting for Django API..."
    while ! nc -z "${DJANGO_HOST:-django}" "${DJANGO_PORT:-8000}"; do
        sleep 1
    done
    echo "Django API ready!"
}

if [ "$1" = "start" ]; then
    wait_for_django
    echo "Generating TypeScript types..."
    yarn generate:types
    echo "Starting Next.js frontend..."
    exec node server.js
else
    exec "$@"
fi