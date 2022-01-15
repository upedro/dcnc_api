import bodyParser from "body-parser";
import express from "express"
var cors = require('cors')

import connectDB from "../config/database";

import auth from "./routes/api/auth";
import user from "./routes/api/user";
import profile from "./routes/api/profile";
import laudo_benner from "./routes/api/laudo_benner";

const app = express();
app.use(cors()) 
var corsOptions = {
  origin: ['http://localhost:3000','https://dcnc-dashboard.netlify.app'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/laudo_benner", laudo_benner);
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/profile", profile);


// busca index - com varios parametros
//com erros
// concluidos
//por robo



const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
