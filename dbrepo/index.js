// DATABASE CONFIG

const mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI =
  "mongodb+srv://chaters:1111@zar.r0ctt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

//https://mongoosejs.com/docs/connections.html#connection-events
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

// https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // tweets: [{ tweet: String }],
  createdOn: { type: Date, default: Date.now },
});



// https://mongoosejs.com/docs/models.html
var userModel = mongoose.model("users", userSchema);


module.exports = {
  userModel: userModel,
 
  // otherModels: OtherModels
};