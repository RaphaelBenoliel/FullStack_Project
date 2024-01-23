const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("post get");
});

router.post("/", (req, res) => {
  res.send("post post");
});

router.put("/", (req, res) => {
  res.send("post put");
});

router.delete("/", (req, res) => {
  res.send("post delete");
});

module.exports = router;