const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    title: "Recipedia",
    description: "A personalized recipe discovery application.",
  });
});

module.exports = router;
