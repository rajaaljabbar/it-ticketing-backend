const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

const departmentsRoutes = require("./routes/departments");
const ticketsRoutes = require("./routes/tickets");
const authRoutes = require("./routes/auth");

app.use("/api/departments", departmentsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tickets", require("./routes/tickets"));

// Middleware untuk mengakses frontend
app.use(express.static(path.resolve(__dirname, "../it-ticketing-frontend")));

// Route ke index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../it-ticketing-frontend/index.html"));
});

app.listen(7000, "0.0.0.0", () => {
  console.log("Server berjalan di http://172.17.20.5:7000");
});
