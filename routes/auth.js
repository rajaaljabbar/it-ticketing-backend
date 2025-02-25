const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Login User/Admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const userResult = await pool.query(userQuery, [email, password]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Email atau Password salah" });
    }

    const user = userResult.rows[0];

    // Kirim role dan nama untuk redirect ke dashboard yang sesuai
    res.status(200).json({
      message: "Login berhasil",
      email: user.email,
      role: user.role,
      nama: user.nama, // Tambahkan nama ke response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
