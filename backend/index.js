require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModels");


const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});


app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    let newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    const transactionAmount = qty * price;

    if (mode === "SELL") {
      const holdings = await HoldingsModel.find({ name: name });
      const totalAvailableQty = holdings.reduce((sum, stock) => sum + stock.qty, 0);

      if (totalAvailableQty < qty) {
        return res.status(400).send("Not enough quantity available to sell!");
      }

      let remainingQtyToSell = qty;
      for (let stock of holdings) {
        if (remainingQtyToSell <= 0) break;
        if (stock.qty <= remainingQtyToSell) {
          remainingQtyToSell -= stock.qty;
          await HoldingsModel.findByIdAndDelete(stock._id);
        } else {
          stock.qty -= remainingQtyToSell;
          remainingQtyToSell = 0;
          await stock.save();
        }
      }
      await FundsModel.updateOne({}, { $inc: { margin: transactionAmount } });
    }

 
    if (mode === "BUY") {
      const userFunds = await FundsModel.findOne({});
      if (!userFunds || userFunds.margin < transactionAmount) {
        return res.status(400).send("Insufficient funds to buy!");
      }

      let newHolding = new HoldingsModel({
        name,
        qty,
        avg: price, 
        price, 
        net: "+0.00%",
        day: "+0.00%",
      });
      await newHolding.save();

      await FundsModel.updateOne({}, { $inc: { margin: -transactionAmount } });
    }

    res.status(200).send("Order history saved, holdings updated, and funds adjusted!");
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send("Internal Server Error");
  }
});



  app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({}); 
  res.json(allOrders);
});


app.get("/userFunds", async (req, res) => {
  let funds = await FundsModel.findOne({}); 
  res.json(funds);
});

app.post("/addFunds", async (req, res) => {
  const { amount } = req.body;
  await FundsModel.updateOne({}, { $inc: { margin: amount } },
   { upsert: true }
  ); 
  res.send("Funds Updated!");
});

app.put("/updateOrder/:id", async (req, res) => {
  const { id } = req.params;
  const { qty, price } = req.body;
  await OrdersModel.findByIdAndUpdate(id, { qty, price });
  res.send("Order Updated!");
});

app.delete("/deleteOrder/:id", async (req, res) => {
  await OrdersModel.findByIdAndDelete(req.params.id);
  res.send("Order Deleted!");
});



const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
});
const UserModel = mongoose.model("user", UserSchema);

app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered!");
    }

    const newUser = new UserModel({ 
      username: fullName, 
      email: email, 
      password: password 
    });

    await newUser.save();
    res.status(200).json({ user: fullName }); 

  } catch (err) {
    console.log("Backend Error:", err); 
    res.status(500).send("Server error occurred!");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    if (user) {
      res.status(200).json({ user: user.username });
    } else {
      res.status(401).send("Invalid email or password!");
    }
  } catch (err) {
    res.status(500).send("Login failed!");
  }
});



app.listen(PORT, () => {
    console.log("App started");
     mongoose.connect(uri);
  console.log("DB started!");
})