const express = require("express");
const router = express.Router();

const { addBook } = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, admin, addBook);

module.exports = router;