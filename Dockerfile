FROM node:lts

# Install utils si besoin
RUN apt-get update -yq

# Set working dir
WORKDIR /app

# Copy package files first for cache Docker
COPY package.json package-lock.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Install plop globally
RUN yarn global add plop

# Copy project
COPY . .

# Ports
EXPOSE 3000

# Dev-friendly volumes
VOLUME [ "/app/node_modules" ]

# Default command
CMD ["sleep", "infinity"]
