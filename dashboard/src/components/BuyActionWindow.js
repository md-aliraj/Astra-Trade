
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";


const BuyActionWindow = ({ uid, mode = "BUY", price }) => { 
  const [stockQuantity, setStockQuantity] = useState(1);
  
  const [stockPrice, setStockPrice] = useState(price || 0.0);

  const { closeBuyWindow } = useContext(GeneralContext);


  useEffect(() => {
    if (price) {
      setStockPrice(price);
    }
  }, [price]);

  const handleOrderClick = (e) => {
    e.preventDefault();

    axios.post("https://astra-trade-lyly.onrender.com/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: mode,
    })
    .then((res) => {
      alert(res.data); 
      closeBuyWindow();
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        console.error("Axios Error:", err);
      }
    });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  return (
    <div className={`container ${mode === "SELL" ? "sell-window" : ""}`} id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button 
            type="button" 
            className={mode === "BUY" ? "btn btn-blue" : "btn btn-orange"} 
            onClick={handleOrderClick}
          >
            {mode === "BUY" ? "Buy" : "Sell"}
          </button>
          
          <button type="button" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
