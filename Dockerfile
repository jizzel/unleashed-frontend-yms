# Use the official Node.js image as the base image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /unleashed-frontend-yms

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use the official Nginx image as the base image for the production environment
FROM nginx:alpine

# Copy the built Angular application from the build stage
COPY --from=build /unleashed-frontend-yms/dist/unleashed-frontend-yms/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
