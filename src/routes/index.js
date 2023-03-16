const { Router } = require("express");
const router = Router();

const authRoutes = require("./users");

router.use("/users", authRoutes);

module.exports = router;
