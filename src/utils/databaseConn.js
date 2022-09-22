 const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  // console.log(mongoose.connection.readyState); //logs 0
  mongoose.connection.on("connecting", () => {
    console.log("Connecting to Database..");
  });
  // check database connection
  mongoose.connection.on("connected", async () => {
    console.log("Database Connection Established");
  });
  mongoose.connection.on("disconnecting", () => {
    console.log("Disconnecting Database.."); // logs 3
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from Database.."); //logs 0
  });

  try {
    /** Database connection */
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });
  } catch (error) {
    console.error(error, "Database Connection Failed, Server Shutting Down");
    process.exit(1);
  }
};
