FROM node:latest 

COPY . .

WORKDIR /src

RUN npm install

CMD npm start

EXPOSE 8080