FROM node
    
WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "npx prisma generate && npm run dockerdev"]