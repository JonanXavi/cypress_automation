# Use Cypress base image
FROM cypress/browsers:node-22.21.0-chrome-141.0.7390.107-1-ff-144.0-edge-141.0.3537.92-1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci && npm install -g allure-commandline

# Copy other project files
COPY . .

# Default command to run Cypress UI tests
CMD ["npm", "run", "test:ui-dev"]