const { User } = require("../models");

module.exports.createUser = async (request, response, next) => {
  const { body: validatedUser } = request;
  const newUser = await User.create(validatedUser);
  response.status(201).send(newUser);
};

module.exports.getUsers = async (request, response, next) => {
  const users = await User.findAll();
  response.status(200).send(users);
};

module.exports.getUser = async (request, response, next) => {
  try {
    const {
      params: { id },
    } = request;
    const foundUser = await User.findById(id);
    response.status(200).send(foundUser);
  } catch (error) {
    response.status(404).send("USER NOT FOUND");
  }
};

module.exports.updateUser = async (request, response, next) => {
  try {
    const {
      params: { id },
      body,
    } = request;
    const foundUser = await User.findById(id);
    const updatedUser = await foundUser.update(body);
    response.status(200).send(updatedUser);
  } catch (error) {
    response.status(404).send("USER NOT FOUND");
  }
};

/*
  Для удаления достаточно id
  Фильтруем массив, оставив все значения которые не совпадают с id, переданным в URL
  Массив users должен быть let
  Если не нашли, то отправляем 404
*/
module.exports.deleteUser = async (request, response, next) => {
  const {
    params: { id },
  } = request;

  const deletedUserId = await User.deleteById(id);
  response.status(200).send(deletedUserId);
};
