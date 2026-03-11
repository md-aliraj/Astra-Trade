const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  margin: Number,
});

module.exports = { FundsSchema };