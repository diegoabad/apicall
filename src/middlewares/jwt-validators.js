const jwt = require("jsonwebtoken");

const JWTValidator = (req, res, next) => {
  const token = req.header("x-token");
  const { SECRET_JWT_SEED } = process.env;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid, name, lastName } = jwt.verify(token, SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
    req.lastName = lastName;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }

  next();
};

module.exports = { JWTValidator };
