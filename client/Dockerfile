FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . /app/

# Build the React app
RUN npm run build

RUN npm install -g serve

# Expose the port that your Vite app will run on
EXPOSE 3000

# Command to run your application
CMD ["serve", "-s", "dist", "-l", "3000"]