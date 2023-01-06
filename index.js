const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 4000;
const kalpasRoute = require("./Routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.get("/", async (req, res) => {
  res.status(200).send({ status: 1, message: "Server Live" });
});

app.use("/kalpas", kalpasRoute);

app.listen(port, () => console.log(`Server Running On ${port}`));
