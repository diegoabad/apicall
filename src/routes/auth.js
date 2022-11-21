const { Router } = require("express");
const { validateLogin, validateRegister } = require("../validators/user");
const router = Router();

const {
  loginUser,
  registerUser,
  revalidateToken,
} = require("../controllers/auth");

router.post("/login/v1", validateLogin, loginUser);

router.post("/register/v1", validateRegister, registerUser);

router.get("/renewToken/v1", revalidateToken);

module.exports = router;
