require("dotenv").config()
const mongoose = require("mongoose");
var db

mongoose.connect("mongodb+srv://root123:root123@cluster0.u4yql.mongodb.net/fitness-tracker?retryWrites=true&w=majority" , {
  useNewUrlParser: true,
  useFindAndModify: false
})
db = mongoose.connection
module.exports = db