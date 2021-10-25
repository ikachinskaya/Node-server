let users = [];

module.exports.createUser = (request, response, next) => {
  const { body: validatedUser } = request;
  validatedUser.id = users.length;
  validatedUser.passwordHash = "HASHfgdfgfdgdf65";

  delete validatedUser.password; //убираем пароль

  users.push(validatedUser);

  delete validatedUser.passwordHash;

  response.status(201).send(validatedUser);
};

module.exports.getUsers = (request, response, next) => {
  response.status(200).send(users);
};

module.exports.getUser = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const foundUser = users.find((user) => {
    return Number(user.id) === Number(id);
  });
  if (foundUser) {
    response.send(foundUser);
  } else {
    response.status(404).send("USER NOT FOUND");
  }
};

module.exports.updateUser = (request, response, next) => {
  const {
    params: { id },
    body,
  } = request;

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex !== -1) {
    const updatedUser = {
      ...users[userIndex],
      ...body,
    };
    delete updatedUser.password; // убираем пароль опять

    users[userIndex] = updatedUser;

    response.status(200).send(updatedUser);
  } else {
    response.status(404).send("USER NOT FOUND");
  }
};

/*
  Для удаления достаточно id
  Фильтруем массив, оставив все значения которые не совпадают с id, переданным в URL
  Массив users должен быть let
  Если не нашли, то отправляем 404
*/
module.exports.deleteUser = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex !== -1) {
    users = users.filter((user) => user.id !== Number(id));

    // на клиент отправляем id удаленного юзера, чтобы он там сам его у себя удалил
    response.status(200).send(id);
  } else {
    response.status(404).send("USER NOT FOUND");
  }
};
