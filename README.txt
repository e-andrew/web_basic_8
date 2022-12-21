===== Installation =====
Client:
npx create-react-app .
npm install --save react-router-dom

Server:
npm init --yes
npm install --save express
npm install --save mongodb@4.11
npm install --save jsonwebtoken

===== Starting =====
Database:
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --bind_ip="127.0.0.1" --port="10002" --dbpath="C:\Users\EpicAndrew\Desktop\Lab8\database"

Server:
node app.js

Client:
npm start