FROM node:latest
WORKDIR /app
ADD package.json /app
RUN npm i
ADD . /app
CMD ["bash","-c","npm start"]
