const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
const pushRoute = require("./routes/pushRoutes");

// DB Connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("DB Connected!!!")
);

app.use(cors({ origin: process.env.FRONTEND_URI }));
app.use(express.json());

// Routes
app.use("/api", pushRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
