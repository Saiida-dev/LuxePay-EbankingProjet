# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/my-ebank /usr/share/nginx/html 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
