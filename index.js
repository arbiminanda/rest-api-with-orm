require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/users/users");
const middlewareLogRequest = require("./middleware/logs");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const sequelize = require("./middleware/db");

app.use(cors());

app.use(express.json());

app.use(middlewareLogRequest);

app.use("/user", userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berhasil berjalan pada port ${PORT}`);
  });
});
