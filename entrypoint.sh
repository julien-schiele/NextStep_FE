#!/bin/bash
set -e  # stop if a command fails

# Wait for Django API to be ready before generating types
wait_for_django() {
    echo "Waiting for Django API..."
    while ! nc -z "${DJANGO_HOST:-django}" "${DJANGO_PORT:-8000}"; do
        sleep 1
    done
    echo "Django API ready!"
}

# Run the command passed to the container
if [ "$1" = "dev" ]; then
    echo "Starting Next.js frontend in dev mode..."
    exec yarn dev
elif [ "$1" = "start" ]; then
    wait_for_django
    echo "Generating TypeScript types..."
    yarn generate:types
    echo "Building Next.js frontend..."
    yarn build
    echo "Starting Next.js frontend..."
    exec yarn start
else
    # Allow running arbitrary commands
    exec "$@"
fi