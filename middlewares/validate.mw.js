const yup = require("yup");

const USER_SCHEMA = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  gender: yup.string().required(),
});

module.exports.validateUser = (request, response, next) => {
  USER_SCHEMA.validate(request.body)
    .then(() => {
      next();
    })
    .catch((error) => response.status(400).send(error.message));
};
