
import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState(0); 

  useEffect(() => {
    axios.get("https://astra-trade-lyly.onrender.com/allHoldings").then((res) => {
      setHoldings(res.data);
    });

    axios.get("https://astra-trade-lyly.onrender.com/userFunds").then((res) => {
      setFunds(res.data.margin || 0); 
    });
  }, []);

  let totalInvestment = 0;
  let currentWorth = 0;

  holdings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentWorth += stock.price * stock.qty;
  });

  const pnl = currentWorth - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : 0;
  const isProfit = pnl >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, Ali!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>₹{funds.toLocaleString()}</h3> 
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>₹{funds.toLocaleString()}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Holdings ({holdings.length})</p></span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {Math.abs(pnl).toLocaleString()} <small>{isProfit ? "+" : ""}{pnlPercent}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>{currentWorth.toLocaleString()}</span></p>
            <p>Investment <span>{totalInvestment.toLocaleString()}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;