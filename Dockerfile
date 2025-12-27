# Dockerfile for Railway deployment
FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Force reinstall and rebuild native modules
RUN npm uninstall @swc/core || true
RUN npm install @swc/core --force
RUN npm rebuild @swc/core better-sqlite3

# Copy source code
COPY . .

# Build Strapi with memory limit
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build || (npm rebuild @swc/core && npm run build)

# Expose port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]

