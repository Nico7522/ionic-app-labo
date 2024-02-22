FROM node:hydrogen-alpine3.19

WORKDIR /app
COPY package.json /app/
# RUN npm i @ionic/cli
RUN npm install
COPY . /app/
EXPOSE 8100
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8100"]



