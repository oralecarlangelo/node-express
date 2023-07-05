# Dockerfile

# Use Node.js LTS (Long Term Support) version
FROM node:lts-alpine

# Create a directory in the container where the app will be placed
WORKDIR /app

# Copy package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app's source code to the app directory
COPY . .

# Your app binds to port 5000, so use the EXPOSE instruction to have it mapped by Docker
EXPOSE 5000

# Define the command to run your app (npm start script)
CMD [ "npm", "start" ]
