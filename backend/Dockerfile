FROM node:14-alpine

ENV DB_HOST=172.17.0.1
ENV DB_PORT=5432
ENV DB_NAME=maxxidata
ENV DB_USER=maxxidata
ENV DB_PASS=maxxidata

WORKDIR /app

COPY . .

RUN npm i -g @nestjs/cli && npm install
RUN nest build

CMD ["node", "dist/main"]
