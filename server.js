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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
