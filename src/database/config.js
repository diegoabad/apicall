const mongoose = require("mongoose");
const { DB_CNN } = process.env;

const dbConnection = async () => {
  try {
    mongoose.connect(DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexion exitosa a la DB");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse a la DB");
  }
};

module.exports = { dbConnection };
