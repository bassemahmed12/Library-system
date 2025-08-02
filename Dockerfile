# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files & install deps
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "app.js"]
