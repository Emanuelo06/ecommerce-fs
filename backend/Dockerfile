FROM node:18-alpine

# 1. Set the working directory to keep things organized
WORKDIR /app

# 2. Copy dependency definitions first (caching layer)
COPY package*.json package-lock.json ./

# 3. Install dependencies
RUN npm install

# 4. Copy the rest of the application code
COPY . . 

EXPOSE 5000

# 5. Start the app
CMD ["npm", "run", "dev"]

