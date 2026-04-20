# Build stage
FROM node:24-slim AS build

WORKDIR /src

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Nuxt application
RUN pnpm build

# Runtime stage
FROM node:24-slim AS runner

WORKDIR /app

# Install system dependencies for acme.sh and engine.sh
RUN apt-get update && apt-get install -y \
    bash \
    curl \
    openssl \
    jq \
    socat \
    && rm -rf /var/lib/apt/lists/*

# Copy the built application from the build stage
COPY --from=build /src/.output ./.output
COPY --from=build /src/package.json ./package.json

# Copy scripts and necessary folders
COPY --from=build /src/bin ./bin
COPY --from=build /src/storage ./storage

# Ensure scripts are executable
RUN chmod +x bin/engine.sh && \
    chmod +x bin/acme.sh/acme.sh

# Environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", ".output/server/index.mjs"]
