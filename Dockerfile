FROM node:9
WORKDIR /app
ADD package.json /app
RUN npm i
ADD . /app
CMD ["bash","-c","npm start"]
