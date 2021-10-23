//импорт из math.js
//const data = require("./math.js");
//console.log(data);

const http = require("http");
//console.log(http);
const fs = require("fs");

let requestCounter = 0;

const users = [];

//слушатель (запрос, ответ) возвращает undefined
const requestListener = (request, response) => {
  const { method, url } = request;
  console.log(method);
  console.log(url);

  if (method === "GET") {
    if (url === "/") {
      fs.readFile("./views/index.html", { encoding: "utf-8" }, (err, data) => {
        if (err) {
          console.log(err);
        }
        response.end(data);
      });
      return;
    }
    if (url === "/about") {
      fs.readFile("./views/about.html", { encoding: "utf-8" }, (err, data) => {
        if (err) {
          console.log(err);
        }
        response.end(data);
      });
      return;
    }
  }

  if (method === "POST") {
    if (url === "/signup") {
      let userString;
      request.on("data", (chunk) => {
        userString += chunk;
      });
      request.on("end", () => {
        users.push(JSON.stringify(userString));
        console.log(users);
      });

      return;
    }
  }
  fs.readFile("./views/404.html", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
    }
    response.end(data);
  });

  //response.end(`Hello! ${requestCounter++}`);
  //console.log(requestCounter);
};

//создаем сервер
const server = http.createServer(requestListener);

//создаем порт
const PORT = 3000;

//запускаем сервер
server.listen(PORT);
