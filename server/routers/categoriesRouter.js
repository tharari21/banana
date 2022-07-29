const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
  // return all categories
});
router.post("/", (req, res) => {
  // create new categories
});
router.patch("/:id", (req, res) => {
  // update category
});
router.delete("/:id", (req, res) => {
  // delete
});
module.exports = router
