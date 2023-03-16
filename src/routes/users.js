const { Router } = require("express");
const {
  validateLogin,
  validateRegister,
  validateUpdate,
} = require("../validators/users");
const { JWTValidator } = require("../middlewares/jwt-validators");
const router = Router();

const {
  getUsers,
  loginUser,
  registerUser,
  revalidateToken,
  updateUser,
} = require("../controllers/users");

router.get("/v1", getUsers);

router.post("/login/v1", validateLogin, loginUser);

router.get("/renewToken/v1", JWTValidator, revalidateToken);

router.post("/v1", validateRegister, registerUser);

router.put("/v1/:id", validateUpdate, updateUser);

module.exports = router;
