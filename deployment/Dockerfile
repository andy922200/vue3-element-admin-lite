# build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install

# Copy all files, but remove .env
COPY . .
RUN find . -name ".env*" -exec rm -f {} \;

RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./deployment/entrypoint.sh /usr/share/nginx/entrypoint.sh
RUN chmod +x /usr/share/nginx/entrypoint.sh
ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]