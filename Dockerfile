FROM node:4

ENV APP_NAME Translator

RUN npm install -g jasmine-node 

WORKDIR /usr/app

# cache packages in the layer
COPY package.json .
RUN npm install

# copy all app code
COPY . .

#run the tests
RUN jasmine-node spec/

#fire up the server
CMD ["node", "index.js"]; 