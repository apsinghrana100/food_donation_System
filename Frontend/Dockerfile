# Step 1: Build React app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine AS production

# # Remove default nginx static assets
# RUN rm -rf /usr/share/nginx/html/*

# Copy build files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

CMD ["nginx", "-g", "daemon off;"]
