const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error("Koneksi ke database PostgreSQL gagal:", err);
  } else {
    console.log("Terhubung ke database PostgreSQL");
  }
});

module.exports = pool;
