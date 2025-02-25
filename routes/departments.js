const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Mendapatkan daftar Dept.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error mendapatkan data Dept:", err);
    res.status(500).json({ error: "Gagal mendapatkan data Dept." });
  }
});

module.exports = router;
