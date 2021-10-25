const fs = require("fs").promises;

function readFilePromise(path) {
  fs.readFile(path, { encoding: "utf-8" })
    .then((fileData) => {
      //console.log(fileData);
      return fileData;
    })
    .catch((error) => {
      //console.log(error);
      return error;
    });
}

const resultPromise = readFilePromise("./lection.txt");
//console.log(resultPromise);
//=================================================

async function readFileAsync(path) {
  try {
    const data = await fs.readFile(path, { encoding: "utf-8" });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const test = async () => {};

const resultAsync = readFileAsync("./lection.txt");
console.log(resultAsync);

//Если есть .then, перед ним можно поставить await
