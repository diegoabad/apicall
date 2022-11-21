const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fields-validators");

const validateLogin = [
  check("email", "El email es obligatorio").not().isEmpty().trim(),
  check("email", "Debe ser un email valido").isEmail().trim(),
  check("password", "El password es obligatorio").not().isEmpty().trim(),
  check("password", "El password debe ser mayor a 6 letras")
    .isLength({
      min: 6,
    })
    .trim(),
  (req, res, next) => {
    fieldsValidator(req, res, next);
  },
];

const validateRegister = [
  check("name", "El nombre es obligatorio").not().isEmpty().trim(),
  check("lastName", "El apellido es obligatorio").not().isEmpty().trim(),
  check("email", "El email es obligatorio").not().isEmpty().trim(),
  check("email", "Debe ser un email valido").isEmail().trim(),
  check("password", "El password es obligatorio").not().isEmpty().trim(),
  check("password", "El password debe ser mayor a 6 letras")
    .isLength({
      min: 6,
    })
    .trim(),
  (req, res, next) => {
    fieldsValidator(req, res, next);
  },
];

module.exports = { validateLogin, validateRegister };
