# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port 5173 for Vite's development server (optional)
EXPOSE 5173

# Expose port 4173 for Vite's production preview server
EXPOSE 4173

# Serve the Vite build output
CMD ["serve", "-s", "dist", "-l", "5000"]
