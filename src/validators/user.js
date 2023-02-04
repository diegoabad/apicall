const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fields-validators");
const {
  isValidRole,
  emailExistRegister,
  emailExistLogin,
} = require("../helpers/db-validators");

const validateLogin = [
  check("email", "El email es obligatorio").not().isEmpty().trim(),
  check("email", "Debe ser un email valido").isEmail().trim(),
  check("email").custom(emailExistLogin),
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
  check("email").custom(emailExistRegister),
  check("password", "El password es obligatorio").not().isEmpty().trim(),
  check("password", "El password debe ser mayor a 6 letras")
    .isLength({
      min: 6,
    })
    .trim(),
  check("role", "El rol es obligatorio").not().isEmpty(),
  check("role").custom(isValidRole),
  (req, res, next) => {
    fieldsValidator(req, res, next);
  },
];

module.exports = { validateLogin, validateRegister };
