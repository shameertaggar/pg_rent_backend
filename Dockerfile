# Use Node 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose port 8080 for Back4App / Cloud Run
EXPOSE 8080

# Start app
CMD ["npm", "start"]
