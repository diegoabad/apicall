const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const { from, limit } = req.query;

  const users = await User.find().skip(Number(from)).limit(Number(limit));
  res.json(users);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ ok: false, msj: "El password no son correctos" });
    }

    if (!user.enabled) {
      return res
        .status(400)
        .json({ ok: false, msj: "El usuario se encuentra inhabilitado" });
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
    res.status(500).json({
      ok: false,
      msj: "Problema intentando loguearse con este usuario-saq",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, name, lastName, role } = req.body;
    const salt = bcrypt.genSaltSync();
    const passwordHashed = bcrypt.hashSync(password.trim(), salt);
    const user = new User({
      email: email.toLowerCase().trim(),
      password: passwordHashed,
      name: name.toLowerCase().trim(),
      lastName: lastName.toLowerCase().trim(),
      role,
    });
    await user.save();
    const token = await generateJWT(user.id, user.name, user.lastName);
    res.json({ ok: true, msj: "Usuario creado con exito", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msj: "Problema al intentar crear un usuario" });
  }
};

const revalidateToken = async (req, res) => {
  try {
    const { uid, name, lastName } = req;
    const token = await generateJWT(uid, name, lastName);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msj: "Problema intentando revalidar el token" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, role, ...rest } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.json({ ok: true, msj: "Usuario actualizado con exito" });
};

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  revalidateToken,
};
