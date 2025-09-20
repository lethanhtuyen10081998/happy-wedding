FROM node:20.13.1  as dependencies

WORKDIR /nextjs-app

COPY package.json package-lock.json ./

RUN npm i install -f

FROM node:20.13.1 as builder

WORKDIR /nextjs-app

COPY . .

COPY --from=dependencies /nextjs-app/node_modules ./node_modules

RUN npm run build:prod

EXPOSE 3000
CMD ["yarn", "start"]