const Role = require("../models/Role");
const User = require("../models/User");

const isValidRole = async (role) => {
  const existRole = await Role.findOne({ name: role });
  if (!existRole) throw new Error(`El rol: ${role} no es valido`);
};

const emailExistRegister = async (email) => {
  const user = await User.findOne({ email });
  if (user) throw new Error(`El email ya se encuentra registrado`);
};

const emailExistLogin = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error(`El email no es correcto`);
};

const userExistById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error(`El id: ${id} no existe`);
};

module.exports = { isValidRole, emailExistRegister, emailExistLogin, userExistById };
