const express = require('express');
const pool = require("../db");
const router = express.Router({ mergeParams: true });


router.get("/images", async (req, res) => {
  // return product req.params.id's images
  console.log(req.params.productId)
  const imagesQuery = await pool.query('SELECT * FROM images WHERE product_id=$1', [req.params.productId])
  res.json({images: imagesQuery.rows})

});
router.post("/images", async (req, res) => {
  // Create image for product req.params.id
  const {url} = req.body
  try{
  const postImageQuery = await pool.query('INSERT INTO images (product_id, url) VALUES($1,$2) RETURNING id, product_id, url', [req.params.productId, url]) 
  if (postImageQuery.rowCount === 1){
      res.json({image: postImageQuery.rows[0]})
  }else {
        res.json({ message: "failed to post image" });
  }
  }catch{
    res.json({message: 'failed to post image'})
  }
});
router.patch("/images/:imageId", (req, res) => {
  // update image req.params.id's images
});
router.delete("/images/:imageId", (req, res) => {
  // delete image req.params.id's images
});

module.exports = router;