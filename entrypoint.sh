#!/bin/bash
set -e  # stop if a command fails

# Run the command passed to the container
if [ "$1" = "dev" ]; then
    echo "Starting Next.js frontend in dev mode..."
    exec yarn dev
elif [ "$1" = "start" ]; then
    echo "Building Next.js frontend..."
    yarn build
    echo "Starting Next.js frontend..."
    exec yarn start
else
    # Allow running arbitrary commands
    exec "$@"
fi