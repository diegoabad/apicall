const { Router } = require("express");
const router = Router();

const authRoutes = require("./user");

router.use("/user", authRoutes);

module.exports = router;
