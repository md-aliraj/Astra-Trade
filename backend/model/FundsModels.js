const { model } = require("mongoose");
const { FundsSchema } = require("../schemas/FundsSchema");

const FundsModel = new model("fund", FundsSchema); // 'fund' naam ki table ban jayegi

module.exports = { FundsModel };