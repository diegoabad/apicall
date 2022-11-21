const express = require("express");
require("dotenv").config();
const routes = require("./src/routes");
const { dbConnection } = require("./src/database/config");

const { PORT } = process.env;

const app = express();

dbConnection();

app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
