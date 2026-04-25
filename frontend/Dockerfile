FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build React app
RUN npm run build

# Use lightweight server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
