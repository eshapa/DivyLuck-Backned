const express = require("express");
const router = express.Router();
const {
  registerTailor,
  getAllTailors,
} = require("../controller/tailorController");
const validateTailor = require("../Middleware/validateTailor");

router.post("/register", validateTailor, registerTailor);
router.get("/", getAllTailors);

module.exports = router;
