const jwt = require("jsonwebtoken");
const { SECRET_JWT_SEED } = process.env;

const generateJWT = (uid, name, lastName) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, lastName };
    jwt.sign(
      payload,
      SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      },
    );
  });
};

module.exports = { generateJWT };
