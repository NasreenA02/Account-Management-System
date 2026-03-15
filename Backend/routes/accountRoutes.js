const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware.js");

const {
  getBalance,
  getStatement,
  transfer
} = require("../controllers/accountController.js");

router.get("/balance", auth, getBalance);
router.get("/statement", auth, getStatement);
router.post("/transfer", auth, transfer);

module.exports = router;