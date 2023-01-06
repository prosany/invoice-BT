const express = require("express");
const { createKalpas } = require("../Controller");

const router = express.Router();

router.post("/create", createKalpas);

module.exports = router;
