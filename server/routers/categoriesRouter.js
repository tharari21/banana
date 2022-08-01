
const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  // return product req.params.id's images
  const categoriesQuery = await pool.query(
    "SELECT * FROM catagories",
  );
  res.json({ categories: categoriesQuery.rows });
});
router.post("/", async (req, res) => {
  // Create image for product req.params.id
  const { name } = req.body;
  try {
    const postCategoriesQuery = await pool.query(
      "INSERT INTO catagories (name) VALUES($1) RETURNING id, name",
      [name]
    );
    if (postCategoriesQuery.rowCount === 1) {
      res.json({ categories: postCategoriesQuery.rows[0] });
    } else {
      res.json({ message: "failed to post category" });
    }
  } catch {
    res.json({ message: "failed to post category" });
  }
});
router.patch("/:categoryId", async (req, res) => {
  // update image req.params.id's images
  const { name } = req.body;
  try {
    const patchCategoriesQuery = await pool.query(
      "UPDATE catagories SET name=$1 WHERE id=$2  RETURNING id, name",
      [name, req.params.categoryId]
    );
    if (patchCategoriesQuery.rowCount === 1) {
      res.json({ image: patchCategoriesQuery.rows[0] });
    } else {
      res.json({ message: "failed to find category to patch" });
    }
  } catch {
    res.json({ message: "failed to patch category" });
  }
});
router.delete("/:categoryId", async (req, res) => {
  // delete image req.params.id's images
  try {
    const deleteCategoryQuery = await pool.query(
      "DELETE FROM catagories WHERE id=$1",
      [req.params.categoryId]
    );
    if (deleteCategoryQuery.rowCount === 1) {
      res.json({ message: "successfully deleted category" });
    } else {
      res.json({ message: "failed find category to delete" });
    }
  } catch {
    res.json({ message: "failed to delete category" });
  }
});

module.exports = router
