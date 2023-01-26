const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const counsellingApplicationFormRoutes = require("./routes/counsellingApplicationFormRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use("/api", counsellingApplicationFormRoutes)

app.listen(config.port, () => {
  console.log("Service endpoint= %s", config.url);
});
