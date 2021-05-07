const express = require("express");
const router = express.Router();

// Load each controller
const usersController = require("./users.js");
const recipesController = require("./recipes.js");
const appConfigController = require("./appConfig.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/users", usersController);
router.use("/recipes", recipesController);
router.use("/application-configuration", appConfigController);

module.exports = router;
