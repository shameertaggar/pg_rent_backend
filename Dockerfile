# Use the official Node.js 20 image
FROM registry.access.redhat.com/ubi8/nodejs-16:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port (Firebase & Cloud Run automatically use PORT env variable)
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
