FROM node:18.15.0

RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

ENV TZ="Asia/Seoul"

WORKDIR /nestjs

COPY package.json /nestjs
COPY package-lock.json /nestjs

RUN npm install

COPY . /nestjs

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
