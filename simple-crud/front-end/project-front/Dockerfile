FROM node:alpine

WORKDIR  /user/front-end

COPY package.json ./

RUN npm install 

COPY  . .

CMD ["npm","run","dev"]