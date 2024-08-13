const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const ConnectDb = require("./config/db");
const cookeparser = require("cookie-parser");
const cors = require("cors");
const PORT = 400;

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookeparser());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello, BAckend is Working Fine!");
});

const userRouter = require("./routes/allRoute");
app.use("/api/v1", userRouter);

ConnectDb();
app.listen(PORT, () => {
  console.log(`backend is available at http://localhost:${PORT}`);
});
