const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const app = express();

const databaseConn = require("./utils/databaseConn");
const authentication = require("./routes/authentication");

/* Routes */
const user = require("./routes/user");
const post = require("./routes/post");

/* Middlewares */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Request and Response Logs */
app.use((req, res, next) => {
  console.log(
    `Incoming Method->: [${req.method} - Url:[${req.originalUrl}] - IP:[${req.socket.remoteAddress}] `
  );
  res.on("finish", () => {
    console.log(
      `Outgoing Method->: [${req.method} - Url:[${req.originalUrl}] - IP:[${req.socket.remoteAddress}] - Status: [${res.statusCode}] `
    );
    console.log(" ");
  });
  next();
});

/* Routes */
app.use("/auth", authentication);
app.use("/user", user);
app.use("/post", post);

/* Ping Route */
app.get("/ping", (req, res, next) => {
  res.status(200).json({ message: "Server is running Properly!" });
});

/* Error Handling */
app.use((req, res, next) => {
  const error = new Error("No Route Found");
  return res.status(400).json({ message: error.message });
});

/* Starting Server */
try {
  const startServer = async () => {
    await databaseConn();
    app.listen(process.env.SERVER_PORT || 5050, () => {
      console.log(
        `Server Listening on Port ${process.env.SERVER_PORT || 5050}`
      );
      console.log(" ");
    });
  };
  startServer();
} catch (error) {
  console.log(error.message, "Server Connection Failed, Server shutting down");
  process.exit(1);
}
