require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobRoutes = require("./src/routes/jobRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jobRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "BullMQ monitoring backend is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});