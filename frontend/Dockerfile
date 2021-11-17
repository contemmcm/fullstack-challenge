FROM node:14-alpine

ENV BACKEND_API_URL=http://172.17.0.1:3000

RUN apk update && apk add nginx gettext

WORKDIR /var/www/localhost/

COPY . .
RUN npm install
RUN npm run-script webapp:build:prod

COPY nginx-default.conf.template /etc/nginx/http.d/default.conf.template

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s /usr/local/bin/entrypoint.sh / # backwards compat

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
