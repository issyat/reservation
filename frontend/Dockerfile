FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the application
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]