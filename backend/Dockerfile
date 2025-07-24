FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# For development
CMD ["npm", "run", "dev"]

# For production, use:
# CMD ["node", "server.js"]