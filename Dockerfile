FROM node:lts

# Install utils si besoin
RUN apt-get update -yq

# Set working dir
WORKDIR /app

# Copy package files first for cache Docker
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Install plop globally, not used in this project
# RUN yarn global add plop

# Copy project
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Ports
EXPOSE 3000

# Dev-friendly volumes
VOLUME [ "/app/node_modules" ]

# Default command → use entrypoint
ENTRYPOINT ["/entrypoint.sh"]
CMD ["sleep", "infinity"]
