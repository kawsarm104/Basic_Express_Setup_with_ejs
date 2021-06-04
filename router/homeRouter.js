// external imports
const express = require("express");

// internal imports
const { getHome } = require("../controller/homeController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Home"), getHome);

module.exports = router;
