const { Router } = require("express");
const { validateLogin, validateRegister } = require("../validators/user");
const { JWTValidator } = require("../middlewares/jwt-validators");
const router = Router();

const {
  loginUser,
  registerUser,
  revalidateToken,
  updateUser,
} = require("../controllers/user");

router.post("/login/v1", validateLogin, loginUser);

router.get("/renewToken/v1", JWTValidator, revalidateToken);

router.post("/v1", validateRegister, registerUser);

router.put("/v1/:id", updateUser);

module.exports = router;
