const express = require("express");
const cors = require("cors");

const app = express();
import authRoutes from "./routes/authRoutes.js";

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "Server running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

