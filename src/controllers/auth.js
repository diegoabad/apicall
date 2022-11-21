const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ ok: false, msj: "El email o password no son correctos" });
    }

    const token = await generateJWT(user.id, user.name, user.lastName);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      lastName: user.lastName,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msj: "Problema intentando guardar el registro" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ ok: false, msj: "El email ya se encuentra registrado" });
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id, user.name, user.lastName);
    res.json({ ok: true, msj: "Guardado exitoso", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msj: "Problema intentando guardar el registro" });
  }
};

const revalidateToken = (req, res) => {
  res.send("token");
};

module.exports = {
  loginUser,
  registerUser,
  revalidateToken,
};
