const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Mendapatkan tiket milik user yang sedang login
router.get("/", async (req, res) => {
  const email = req.query.email; // Ambil email dari query parameter

  if (!email) {
    return res.status(400).json({ message: "Email tidak ditemukan." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM tickets WHERE email = $1 ORDER BY tanggal DESC",
      [email]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// Mengajukan tiket baru
router.post("/", async (req, res) => {
  const { nama, email, dept, no_hp, deskripsi, prioritas } = req.body;

  try {
    const sql = `INSERT INTO tickets (nama, email, dept, no_hp, deskripsi, prioritas) 
                     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [nama, email, dept, no_hp, deskripsi, prioritas];
    const result = await pool.query(sql, values);
    res
      .status(201)
      .json({ message: "Tiket berhasil diajukan.", tiket: result.rows[0] });
  } catch (error) {
    console.error("Gagal mengajukan tiket:", error);
    res.status(500).json({ message: "Gagal mengajukan tiket." });
  }
});

// ADMIN PAGE

// Mendapatkan semua tiket untuk Admin
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets ORDER BY tanggal DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Gagal mendapatkan semua tiket:", error);
    res.status(500).json({ message: "Gagal mendapatkan semua tiket." });
  }
});

// Mengupdate status tiket
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.status(200).json({
      message: "Status tiket berhasil diperbarui.",
      tiket: result.rows[0],
    });
  } catch (error) {
    console.error("Gagal memperbarui status tiket:", error);
    res.status(500).json({ message: "Gagal memperbarui status tiket." });
  }
});

// Hapus tiket berdasarkan ID
router.delete("/:id", (req, res) => {
  const tiketId = req.params.id;
  const query = "DELETE FROM tickets WHERE id = $1";

  pool.query(query, [tiketId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Gagal menghapus tiket" });
    } else {
      res.status(200).json({ message: "Tiket berhasil dihapus" });
    }
  });
});

module.exports = router;
