const express = require("express");
const app = express();
const { validateUser } = require("./middlewares/validate.mw");
const UserController = require("./controllers/user.controller");
const PORT = 3000;
const bodyParser = express.json();

app.post("/user", bodyParser, validateUser, UserController.createUser);

app.get("/users", UserController.getUsers);

app.get("/user/:id", UserController.getUser);

/*
    Обновление юзера также связано с получением данных из JSON.
    Их также нужно парсить и проверить на валидность, как и на POST маршруте.
    Надо при этом не забыть, что все поля, которые указаны как обязательные, должны быть отправлены в запросе,
    иначе валидатор выкинет ошибку.
*/
app.put("/user/:id", bodyParser, validateUser, UserController.updateUser);

/* Для удаления юзера ничего, кроме id знать не нужно */
app.delete("/user/:id", UserController.deleteUser);

app.listen(PORT, () => {
  console.log("Server is running");
});

/*
npm init -y
npm i express

node .app.js (package.json -> scripts -> start)

npm install -D nodemon -> "start": "nodemon ./app.js"  -> rs

npm install yup 
*/

/*
Создание юзера
==============
1. Pаспарсить данные
2. Проверить данные
3. Подготовить данные
4. Записать данные
5. Вернуть данные
*/
