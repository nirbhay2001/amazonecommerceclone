# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the React app runs on
EXPOSE 3000

# Set the environment variable to point to the backend running on the host machine
# ENV REACT_APP_BACKEND_URL=http://host.docker.internal:5000

# Start the React development server
CMD ["npm", "start"]

