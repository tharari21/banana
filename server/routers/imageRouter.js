const express = require('express');
const pool = require("../db");
const router = express.Router({ mergeParams: true });
const format = require('pg-format')

router.get("/", async (req, res) => {
  // return product req.params.id's images
  const imagesQuery = await pool.query('SELECT * FROM images WHERE product_id=$1', [req.params.productId])
  res.json( imagesQuery.rows )

});
router.post("/", async (req, res) => {
  // Create image for product req.params.id
  const urls = req.body.map(url => [parseInt(req.params.productId) , url])
  try{
    console.log('q')
    const postImageQuery = await pool.query(
      format(
        "INSERT INTO images (product_id, url) VALUES %L RETURNING id, product_id, url",
        urls
      )
    ); 
    console.log(postImageQuery.rows);
  if (postImageQuery.rowCount > 0){
      res.json(postImageQuery.rows)
  }else {
        res.json({ message: "failed to post image" });
  }
  }catch (err){
    console.log(err)
    res.json({message: 'failed to post image'})
  }
});
router.patch("/:imageId", async (req, res) => {
  // update image req.params.id's images
  const {url} = req.body
  try{
  const patchImageQuery = await pool.query('UPDATE images SET url=$1 WHERE id=$2  RETURNING id, url', [url, req.params.imageId]) 
  if (patchImageQuery.rowCount === 1){
      res.json({image: patchImageQuery.rows[0]})
  }else {
        res.json({ message: "failed to find image to patch" });
  }
  }catch{
    res.json({message: 'failed to patch image'})
  }
});
router.delete("/:imageId", async (req, res) => {
  // delete image req.params.id's images
  try{
  const deleteImageQuery = await pool.query('DELETE FROM images WHERE id=$1', [req.params.imageId]) 
  if (deleteImageQuery.rowCount === 1){
    res.json({message:'successfully deleted image'})
  }else {
        res.json({ message: "failed find image to delete" });
  }
  }catch{
    res.json({message: 'failed to delete image'})
  }
});

module.exports = router;