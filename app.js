const express = require("express");
//console.log(typeof express);

const app = express();

const PORT = 3000;

app.get(
  "/",
  (request, response, next) => {
    console.log("first callback");
    request.secret = 42;
    next();
  },
  (request, response, next) => {
    console.log("second callback");
    if (Math.random() > 0.5) {
      response.send("ERROR");
    } else {
      next();
    }
  },
  (request, response, next) => {
    console.log(`third callback, ${request.secret}`);
    next();
  },
  (request, response, next) => {
    const { method, path } = request;
    response.end(`HELLO METHOD IS: ${method} PATH IS ${path}`);
  }
);

app.get("/about", (request, response) => {
  console.log("about page");
  response.send("<h2>ABOUT PAGE<h2>");
});

app.get("*", (request, response) => {
  response.end("NOT FOUND USER");
});

app.listen(PORT, () => {
  console.log("Server is running");
});

/*
npm init -y
npm i express

node .app.js (package.json -> scripts -> start)

npm install -D nodemon -> "start": "nodemon ./app.js"  -> rs
*/
