const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./src/routes");
const { dbConnection } = require("./src/database/config");

const { PORT } = process.env;

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
