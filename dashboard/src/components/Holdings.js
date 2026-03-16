import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("https://astra-trade-lyly.onrender.com/allHoldings").then((res) => {
      const sortedData = res.data.sort((a, b) => a.name.localeCompare(b.name));
      setAllHoldings(sortedData);
    });
  }, []);

  const totalInvestment = allHoldings.reduce((sum, stock) => sum + (stock.avg * stock.qty), 0);
  const totalCurrentValue = allHoldings.reduce((sum, stock) => sum + (stock.price * stock.qty), 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercentage = totalInvestment !== 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const profitStyle = { color: "#4caf50" }; 
  const lossStyle = { color: "#f44336" };  

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const isProfit = pnl >= 0.0;
              const currentStyle = isProfit ? profitStyle : lossStyle;

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td style={currentStyle}>
                    {pnl.toFixed(2)}
                  </td>
                  <td style={currentStyle}>{stock.net}</td>
                  <td style={stock.day.startsWith("+") ? profitStyle : lossStyle}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div className="col">
          <h5>{totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{totalCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={totalPnL >= 0 ? profitStyle : lossStyle}>
            {totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2 })} ({pnlPercentage}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;