FROM node:16.13.2

# Create app directory
WORKDIR /usr/src/app

# Copying dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code to /usr/src/app
COPY . .

# Create enviromental variable port
ENV PORT=80

# Port fowarding
EXPOSE 80

# Build .ts and .d.ts files
RUN npm run build

# Run server
CMD [ "npm", "start" ]

